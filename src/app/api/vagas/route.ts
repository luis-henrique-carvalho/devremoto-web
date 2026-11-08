import { NextRequest, NextResponse } from "next/server";
import { getPaginatedJobs } from "@/lib/vagas";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "12", 10);
  const stack = searchParams.get("stack") || "Todas";
  const seniority = searchParams.get("seniority") || "Todas";
  const search = searchParams.get("q") || "";

  const result = await getPaginatedJobs({
    page: isNaN(page) || page < 1 ? 1 : page,
    limit: isNaN(limit) || limit < 1 ? 12 : limit,
    stack,
    seniority,
    search,
  });

  return NextResponse.json(result);
}
