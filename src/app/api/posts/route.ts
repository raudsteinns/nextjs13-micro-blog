import { NextRequest, NextResponse } from 'next/server';
import { supabase } from "@/utils/supabaseClient";

// 記事一覧を取得
export async function GET() {
    const { data, error } = await supabase.from("posts").select("*");

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
        return NextResponse.json({ error: "データが見つかりません" }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
}

// 記事の投稿
export async function POST(req: NextRequest) {
    const { id, title, content } = await req.json();

    const { data, error } = await supabase
        .from("posts")
        .insert([{ id, title, content, createdAt: new Date().toISOString() }]);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
}