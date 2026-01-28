import { NextResponse } from 'next/server';
import { supabase, dbToolToApp, isSupabaseConfigured } from '@/lib/supabase';

export async function GET() {
  if (!isSupabaseConfigured() || !supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }

  try {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const tools = data?.map(dbToolToApp) || [];
    return NextResponse.json(tools);
  } catch (error) {
    console.error('Error fetching tools:', error);
    return NextResponse.json({ error: 'Failed to fetch tools' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured() || !supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }

  try {
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('tools')
      .insert({
        name: body.name,
        description: body.description,
        logo: body.logo || '/images/tools/default.png',
        category: body.category,
        url: body.url,
        is_featured: body.isFeatured || false,
        tags: body.tags || [],
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(dbToolToApp(data));
  } catch (error) {
    console.error('Error creating tool:', error);
    return NextResponse.json({ error: 'Failed to create tool' }, { status: 500 });
  }
}
