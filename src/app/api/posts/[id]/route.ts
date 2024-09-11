import { NextRequest, NextResponse } from 'next/server';
import { supabase } from "@/utils/supabaseClient";
import { notFound } from 'next/navigation';

// 記事の詳細を取得
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    const { data, error } = await supabase.from("posts").select("*").eq("id", id).single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
        notFound();
    }

    return NextResponse.json(data, { status: 200 });
}

// 記事の更新
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    const { title, content } = await req.json();
    const { error } = await supabase.from("posts").update({ title, content }).eq("id", id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "記事が更新されました" }, { status: 200 });
}

// 記事の削除
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "記事が削除されました" }, { status: 200 });
}