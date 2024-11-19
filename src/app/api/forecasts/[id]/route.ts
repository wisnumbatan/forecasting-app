import { NextResponse } from "next/server";
import { withAuth } from "@/lib/auth/withAuth";
import { Forecast } from "../../../../lib/db/model/forcast.model";

export const GET = withAuth(async (req: Request, { params }: { params: { id: string } }) => {
  const forecast = await Forecast.findById(params.id)
    .populate('project')
    .populate('createdBy', 'name');
    
  if (!forecast) {
    return NextResponse.json({ error: "Forecast not found" }, { status: 404 });
  }
  
  return NextResponse.json(forecast);
});

export const PUT = withAuth(async (req: Request, { params }: { params: { id: string } }) => {
  const body = await req.json();
  
  const forecast = await Forecast.findByIdAndUpdate(
    params.id,
    { $set: body },
    { new: true }
  );
  
  if (!forecast) {
    return NextResponse.json({ error: "Forecast not found" }, { status: 404 });
  }
  
  return NextResponse.json(forecast);
});

export const DELETE = withAuth(async (req: Request, { params }: { params: { id: string } }) => {
  const forecast = await Forecast.findByIdAndDelete(params.id);
  
  if (!forecast) {
    return NextResponse.json({ error: "Forecast not found" }, { status: 404 });
  }
  
  return NextResponse.json({ message: "Forecast deleted successfully" });
});