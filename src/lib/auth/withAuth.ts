import { getSession } from "./session";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function withAuth(handler: Function) {
  return async (req: NextRequest) => {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    return handler(req, session);
  };
}

export function withRole(handler: Function, allowedRoles: string[]) {
  return async (req: NextRequest) => {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!allowedRoles.includes(session.user.role)) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    return handler(req, session);
  };
}