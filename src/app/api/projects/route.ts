import { NextResponse } from "next/server";
import { withAuth } from "@/lib/auth/withAuth";
import { z } from "zod";
import { Project } from "../../../lib/db/model/project.model";

const projectSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  settings: z.object({
    forecastingMethod: z.enum(['ARIMA', 'SARIMA', 'Prophet', 'HoltWinters']),
    confidenceInterval: z.number().min(1).max(99),
    seasonality: z.enum(['none', 'daily', 'weekly', 'monthly', 'quarterly', 'yearly'])
  }).optional()
});

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

export const GET = withAuth(async (req: AuthenticatedRequest) => {
  const projects = await Project.find({
    'members.user': req.user.id
  })
  .populate('owner', 'name email')
  .sort('-createdAt');
  
  return NextResponse.json(projects);
});

export const POST = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const body = await req.json();
    const validated = projectSchema.parse(body);
    
    const project = await Project.create({
      ...validated,
      owner: req.user.id,
      members: [{ user: req.user.id, role: 'owner' }]
    });
    
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid request" },
      { status: 400 }
    );
  }
});