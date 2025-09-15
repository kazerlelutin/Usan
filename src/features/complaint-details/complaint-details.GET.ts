import { db } from "~/database";
import { activityLogs, complaints } from "~/database/schema";
import { asc, eq } from "drizzle-orm";
import { getSession } from "@solid-mediakit/auth";
import { authOptions } from "../auth/auth.api";
import { decrypt } from "~/utils/encryption";

export const complaintDetailsGET = async ({ request, params }: { request: Request, params: { id: string } }) => {
  const session = await getSession(request, authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!session.user?.roles?.some(role => role.name.match(/inspector|judge/i))) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = params;

  const complaint = await db.query.complaints.findFirst({
    where: eq(complaints.id, id),
  });

  if (!complaint) {
    return Response.json({ error: 'Plainte non trouvée' }, { status: 404 });
  }

  const activityLogsForComplaint = await db.query.activityLogs.findMany({
    where: eq(activityLogs.complaintId, complaint.id),
    orderBy: asc(activityLogs.createdAt),
  });


  const activityLogsForResponse = [];

  for (const activityLog of activityLogsForComplaint) {
    const decryptedContent = await decrypt(activityLog.encryptedContent);
    activityLogsForResponse.push({
      id: activityLog.id,
      action: activityLog.action,
      actorType: activityLog.actorType,
      actorId: activityLog.actorId,
      actorName: activityLog.actorName,
      createdAt: activityLog.createdAt,
      decryptedContent,
    });
  }

  return Response.json({
    complaint: {
      id: complaint.id,
      status: complaint.status,
      createdAt: complaint.createdAt,
      updatedAt: complaint.updatedAt,
      decryptedContent: await decrypt(complaint.encryptedContent),
    },
    activityLogs: activityLogsForResponse,
  });
};