import { neon } from "@neondatabase/serverless";
import { NextRequest } from "next/server";
import { decryptData } from "../../../utils/decryptData";

export async function POST(req: NextRequest) {
  try {
    const { payload } = await req.json();
    const { userId } = decryptData(payload);
    const sql = neon(`${process.env.DATABASE_URL}`);
    const data = await sql(
      `SELECT * FROM user_cart WHERE user_id = '${userId}'`
    );
    return Response.json(data);
  } catch (error) {
    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
}
