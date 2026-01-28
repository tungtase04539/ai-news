import { NextResponse } from 'next/server';
import { supabase, dbCourseToApp, isSupabaseConfigured } from '@/lib/supabase';

export async function GET() {
  if (!isSupabaseConfigured() || !supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }

  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const courses = data?.map(dbCourseToApp) || [];
    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured() || !supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }

  try {
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('courses')
      .insert({
        title: body.title,
        instructor: body.instructor,
        thumbnail: body.thumbnail || '/images/courses/default.jpg',
        duration: body.duration,
        lesson_count: body.lessonCount,
        category: body.category,
        description: body.description,
        is_vip: body.isVip,
        price: body.price || 0,
        students: body.students || 0,
        rating: body.rating || 4.5,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(dbCourseToApp(data));
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}
