import { db } from "~/database";
import { eq } from "drizzle-orm";
import { complaints } from "~/database/schema";
import { decrypt } from "~/utils/encryption";

export const fileTracingGET = async ({ params }: { request: Request, params: { code: string } }) => {

  const code = params.code;


  if (!code) {
    return Response.json({ error: 'Code manquant' }, { status: 400 });
  }

  const data = await db.query.complaints.findFirst({
    where: eq(complaints.accessCode, code),
  });

  if (!data) {
    return Response.json({ error: 'Donnée non trouvée' }, { status: 404 });
  }

  console.log('Données trouvées:', {
    id: data.id,
    hasEncryptedContent: !!data.encryptedContent,
    contentLength: data.encryptedContent?.length || 0
  });

  if (!data.encryptedContent) {
    return Response.json({ error: 'Contenu chiffré manquant' }, { status: 500 });
  }

  const decryptedContent = await decrypt(data.encryptedContent);

  return Response.json({
    content: decryptedContent,
    id: data.id,
    status: data.status,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  });
};