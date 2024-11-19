// src/app/api/projects/[id]/members/route.ts
import { NextResponse } from "next/server";
import { withAuth } from "@/lib/auth/withAuth";
import { Project } from "../../../../../lib/db/model/project.model";
import { z } from "zod";

const memberSchema = z.object({
  userId: z.string(),
  role: z.enum(['editor', 'viewer'])
});

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

export const POST = withAuth(async (req: AuthenticatedRequest, { params }: { params: { id: string } }) => {
  const project = await Project.findById(params.id);
  
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
  
  if (project.owner.toString() !== req.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  
  const body = await req.json();
  const validated = memberSchema.parse(body);
  
  project.members.push({
    user: validated.userId,
    role: validated.role
  });
await project.save();

return NextResponse.json(project);
});

export const DELETE = withAuth(async (req: AuthenticatedRequest, { params }: { params: { id: string, userId: string } }) => {
  const project = await Project.findById(params.id);
  
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
  
  if (project.owner.toString() !== req.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  
  project.members = project.members.filter((m: { user: string }) => m.user.toString() !== params.userId);
  await project.save();
  
  return NextResponse.json(project);
});