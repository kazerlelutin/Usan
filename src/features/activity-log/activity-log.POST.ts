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


  if (!action || !complaintId) {
    return Response.json({
      message: 'Bad Request',
    }, { status: 400 });
  }

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

    const [newActivityLog] = await db.insert(activityLogs).values({
      complaintId: complaintId || '',
      encryptedContent: await encrypt(htmlContent || ''),
      action,
      actorType: session.user?.roles?.find(role => role.name.match(/inspector|judge/i))?.name || '',
      actorId: session.user?.providerId,
      actorName: session.user?.name,
    }).$returningId();
    activityLogId = newActivityLog.id;

    const actionValue = action.includes(':') ? action.split(':')[1] : action;

    if (shouldAutoChangeStatus(actionValue)) {
      const newStatus = getNewStatusForAction(actionValue);

      if (newStatus) {
        await db.update(complaints)
          .set({
            status: newStatus,
            updatedAt: new Date()
          })
          .where(eq(complaints.id, complaintId));
      }
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