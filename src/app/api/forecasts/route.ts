import { NextResponse } from "next/server";
import { withAuth } from "@/lib/auth/withAuth";
import { z } from "zod";
import { Forecast } from "../../../lib/db/model/forcast.model";

const forecastSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  projectId: z.string(),
  data: z.array(z.object({
    timestamp: z.string(),
    value: z.number()
  })),
  metadata: z.object({
    method: z.enum(['ARIMA', 'SARIMA', 'Prophet', 'HoltWinters']),
    parameters: z.object({
      p: z.number().optional(),
      d: z.number().optional(),
      q: z.number().optional(),
      seasonal: z.boolean().optional(),
      period: z.number().optional()
    }).optional()
  })
});

export const GET = withAuth(async () => {
  const forecasts = await Forecast.find()
    .populate('project', 'name')
    .populate('createdBy', 'name')
    .sort('-createdAt');
  
  return NextResponse.json(forecasts);
});

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

export const POST = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const body = await req.json();
    const validated = forecastSchema.parse(body);
    
    const forecast = await Forecast.create({
      ...validated,
      createdBy: req.user.id
    });
    
    return NextResponse.json(forecast, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid request" },
      { status: 400 }
    );
  }
});