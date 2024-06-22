// pages/api/auth/signin.ts
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { toast } from 'sonner';

export async function POST(request: Request) {
  const supabase = createClient();
  const { email, password } = await request.json();
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: 'Could not authenticate user' }, { status: 401 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
