import edjsHTML from 'editorjs-html';
import { randomBytes } from 'crypto';
import { encrypt } from '~/utils/encryption';
import { db } from '~/database';
import { complaints, activityLogs, COMPLAINT_STATUS, ACTIVITY_ACTIONS, ACTOR_TYPES } from '~/database/schema';
import { serverEnv } from '~/env/server';

export const complaintsPOST = async ({ request }: { request: Request }) => {
  let body;

  try {
    const contentType = request.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      body = await request.json();
    } else if (contentType?.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData();
      body = Object.fromEntries(formData.entries());
    } else {
      body = await request.text();
    }
  } catch (error) {
    console.error('Erreur lors du parsing du body:', error);
    return Response.json({ error: 'Erreur lors du parsing' }, { status: 400 });
  }

  if (!body?.content) {
    return Response.json({ error: 'Aucun texte saisi' }, { status: 400 });
  }


  const edjsParser = edjsHTML();
  const html = edjsParser.parse(body.content);
  const complaintId = randomBytes(16).toString('hex');
  const accessCode = randomBytes(8).toString('hex'); // Code d'accès pour le plaignant

  const encryptedContent = await encrypt(html);

  try {
    const [newComplaint] = await db.insert(complaints).values({
      id: complaintId,
      accessCode,
      encryptedContent,
      status: COMPLAINT_STATUS.SUBMITTED
    }).$returningId();

    const activityContent = `<p>Nouvelle plainte créée par le plaignant</p>`;

    await db.insert(activityLogs).values({
      complaintId: newComplaint.id,
      action: ACTIVITY_ACTIONS.SUBMITTED,
      actorType: ACTOR_TYPES.COMPLAINANT,
      actorName: 'Plaignant',
      encryptedContent: await encrypt(activityContent)
    });

    // Send to Discord
    const origin = new URL(request.url).origin;
    const link = `${origin}/admin/${complaintId}`;

    await fetch(serverEnv.DISCORD_WEBHOOK_COMPLAINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: 'Nouvelle plainte créée :\n',
        embeds: [{
          title: 'Nouvelle plainte',
          description: `Lien admin: ${link}`,
          url: link
        }]
      })
    });

    return Response.json({
      message: 'Plainte enregistrée avec succès',
      accessCode,
      complaintId
    });

  } catch (error) {
    console.error('Erreur lors de l\'enregistrement:', error);
    return Response.json({
      error: 'Erreur lors de l\'enregistrement de la plainte'
    }, { status: 500 });
  }
};