import { NextResponse } from "next/server";
import { withAuth } from "@/lib/auth/withAuth";
import { Project } from "../../../../lib/db/model/project.model";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

export const GET = withAuth(async (req: AuthenticatedRequest, { params }: { params: { id: string } }) => {
  const project = await Project.findById(params.id)
    .populate('owner', 'name email')
    .populate('members.user', 'name email');
    
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
  
  // Check if user has access
if (!project.members.some((m: { user: { toString: () => string } }) => m.user.toString() === req.user.id)) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
}

return NextResponse.json(project);
});

export const PUT = withAuth(async (req: AuthenticatedRequest, { params }: { params: { id: string } }) => {
  const project = await Project.findById(params.id);
  
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
  
  // Check if user is owner
  if (project.owner.toString() !== req.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  
  const body = await req.json();
  const updated = await Project.findByIdAndUpdate(
    params.id,
    { $set: body }
  );

  return NextResponse.json(updated);
});

export const DELETE = withAuth(async (req: AuthenticatedRequest, { params }: { params: { id: string } }) => {
  const project = await Project.findById(params.id);
  
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
  
  if (project.owner.toString() !== req.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  
  await Project.findByIdAndDelete(params.id);
  
  return NextResponse.json({ message: "Project deleted successfully" });
});