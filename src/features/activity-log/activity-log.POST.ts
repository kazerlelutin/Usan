import { db } from "~/database";
import { authOptions } from "../auth/auth.api";
import { getSession } from "@solid-mediakit/auth";
import { activityLogs, complaints } from "~/database/schema";
import { encrypt } from "~/utils/encryption";
import edjsHTML from "editorjs-html";
import { eq } from "drizzle-orm";
import { shouldAutoChangeStatus, getNewStatusForAction } from "./status-transitions";
import { serverEnv } from "~/env/server";

export const activityLogPOST = async ({ request }: { request: Request }) => {

  const session = await getSession(request, authOptions);

  if (!session) {
    return Response.json({
      message: 'Unauthorized',
    }, { status: 401 });
  }

  if (!session.user?.roles?.some(role => role.name.match(/inspector|judge/i))) {
    return Response.json({
      message: 'Unauthorized',
    }, { status: 401 });
  }

  const body = await request.json();
  const { content, action, complaintId } = body;

  console.log('Activity log POST - Action reçue:', action);
  console.log('Activity log POST - Complaint ID:', complaintId);

  if (!action || !complaintId) {
    return Response.json({
      message: 'Bad Request',
    }, { status: 400 });
  }

  // Vérifier si la plainte existe
  const complaint = await db.query.complaints.findFirst({
    where: eq(complaints.id, complaintId),
  });

  if (!complaint) {
    return Response.json({
      message: 'Complaint not found',
    }, { status: 404 });
  }

  const html = edjsHTML();
  const htmlContent = html.parse(content || '');

  let activityLogId = '';
  try {
    // Insérer l'activité
    const [newActivityLog] = await db.insert(activityLogs).values({
      complaintId: complaintId || '',
      encryptedContent: await encrypt(htmlContent || ''),
      action,
      actorType: session.user?.roles?.find(role => role.name.match(/inspector|judge/i))?.name || '',
      actorId: session.user?.providerId,
      actorName: session.user?.name,
    }).$returningId();
    activityLogId = newActivityLog.id;
    // Mettre à jour le statut de la plainte si nécessaire
    // Extraire la valeur de l'action (format: "type:value" -> "value")
    const actionValue = action.includes(':') ? action.split(':')[1] : action;
    console.log('Vérification changement de statut pour action:', action, '-> valeur:', actionValue);
    console.log('shouldAutoChangeStatus:', shouldAutoChangeStatus(actionValue));

    if (shouldAutoChangeStatus(actionValue)) {
      const newStatus = getNewStatusForAction(actionValue);
      console.log('Nouveau statut à appliquer:', newStatus);

      if (newStatus) {
        await db.update(complaints)
          .set({
            status: newStatus,
            updatedAt: new Date()
          })
          .where(eq(complaints.id, complaintId));
        console.log('Statut mis à jour vers:', newStatus);
      }
    } else {
      console.log('Aucun changement de statut automatique pour cette action');
    }
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'activité:', error);
    return Response.json({
      message: 'Erreur lors de l\'enregistrement de l\'activité',
    }, { status: 500 });
  }

  // Send to Discord
  const origin = new URL(request.url).origin;
  const link = `${origin}/admin/${complaintId}#${activityLogId}`;
  await fetch(serverEnv.DISCORD_WEBHOOK_COMPLAINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: 'Nouvelle activité enregistrée :\n',
      embeds: [{ title: 'Nouvelle activité', description: `Lien admin: ${link}`, url: link }]
    })
  });

  return Response.json({
    message: 'Activity log saved successfully',
  });
};