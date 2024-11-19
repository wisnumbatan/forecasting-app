import { NextResponse } from "next/server";
import { withAuth } from "@/lib/auth/withAuth";
import { User } from "@/lib/db/model/user.model";

export const GET = withAuth(async (req: Request, { params }: { params: { id: string } }) => {
  const user = await User.findById(params.id).select('preferences');
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user.preferences);
});

export const PUT = withAuth(async (req: Request, { params }: { params: { id: string } }) => {
  const body = await req.json();
  const user = await User.findByIdAndUpdate(
    params.id,
    { $set: { preferences: body } },
    { new: true }
  ).select('preferences');
  
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user.preferences);
});