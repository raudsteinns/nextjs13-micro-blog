import { NextRequest, NextResponse } from 'next/server';
import { supabase } from "@/utils/supabaseClient";

// 記事一覧を取得
export async function GET() {
    try {
        const { data, error } = await supabase.from("posts").select("*");

        if (error) {
            console.error("データベースに接続できません:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (!data || data.length === 0) {
            console.log("データが見つかりません");
            return NextResponse.json({ error: "データが見つかりません" }, { status: 404 });
        }

        console.log("取得に成功しました:", data);
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("予期せぬエラーが発生しました:", error);
        return NextResponse.json({ error: "予期せぬエラーが発生しました" }, { status: 500 });
    }
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