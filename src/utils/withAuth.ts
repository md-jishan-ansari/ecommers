import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { catchAsync } from "./catchAsync";
import { authOptions } from "../app/api/auth/[...nextauth]/authOptions";

export function withAuth(handler: (req: Request, ...args: any[]) => Promise<Response>) {
  return catchAsync(async function (req: Request, ...args: any[]) {
    const session = await getServerSession(authOptions);

    if (!session || !session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    return handler(req, ...args);
  });
}