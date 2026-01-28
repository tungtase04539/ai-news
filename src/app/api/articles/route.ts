import { NextResponse } from 'next/server';
import { supabase, dbArticleToApp, isSupabaseConfigured } from '@/lib/supabase';

export async function GET() {
  if (!isSupabaseConfigured() || !supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const articles = data?.map(dbArticleToApp) || [];
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured() || !supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }

  try {
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('articles')
      .insert({
        title: body.title,
        excerpt: body.excerpt,
        thumbnail: body.thumbnail || '/images/articles/default.jpg',
        author: body.author,
        date: body.date || new Date().toISOString().split('T')[0],
        category: body.category,
        views: body.views || 0,
        likes: body.likes || 0,
        comments: body.comments || 0,
        is_vip: body.isVip,
        tags: body.tags || [],
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(dbArticleToApp(data));
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}
