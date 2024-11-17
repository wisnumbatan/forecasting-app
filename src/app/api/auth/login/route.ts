// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { AuthService } from "@/lib/services/auth.service";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = loginSchema.parse(body);
    const result = await AuthService.login(validated);
    
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid request" },
      { status: 400 }
    );
  }
}