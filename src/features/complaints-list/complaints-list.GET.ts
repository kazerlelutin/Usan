import { db } from "~/database";
import { complaints, COMPLAINT_STATUS } from "~/database/schema";
import { desc, inArray, sql } from "drizzle-orm";
import { authOptions } from "~/features/auth/auth.api";
import { getSession } from "@solid-mediakit/auth";



export const complaintsListGET = async ({ request }: { request: Request }) => {
  const session = await getSession(request, authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!session.user?.roles?.some(role => role.name.match(/inspector|judge/i))) {
    return new Response("Unauthorized", { status: 401 });
  }

  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");

  const page = Math.max(1, Number.isNaN(Number(pageParam)) || !pageParam ? 1 : Number(pageParam));
  const limitRaw = Number.isNaN(Number(limitParam)) || !limitParam ? 50 : Number(limitParam);
  const limit = Math.min(100, Math.max(1, limitRaw));

  const isJudge = !!session.user?.roles?.some(role => role.name.match(/judge/i));


  const whereClause = isJudge
    ? inArray(complaints.status, [COMPLAINT_STATUS.AWAITING_JUDGMENT, COMPLAINT_STATUS.CLOSED])
    : undefined;

  const offset = (page - 1) * limit;

  const data = await db
    .select({
      id: complaints.id,
      status: complaints.status,
      createdAt: complaints.createdAt,
      updatedAt: complaints.updatedAt,
    })
    .from(complaints)
    .where(whereClause ?? sql`1=1`)
    .orderBy(desc(complaints.createdAt))
    .limit(limit)
    .offset(offset);

  const [countRow] = await db
    .select({ value: sql<number>`count(*)` })
    .from(complaints)
    .where(whereClause ?? sql`1=1`);

  const total = countRow?.value ?? 0;

  return Response.json({
    data,
    total,
    page,
    limit,
  });
};