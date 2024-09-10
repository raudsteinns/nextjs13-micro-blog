import { NextRequest, NextResponse } from 'next/server';
import { supabase } from "@/utils/supabaseClient";

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
        return NextResponse.json({ error: "データが見つかりません" }, { status: 404 });
    }

    return NextResponse.json(data);
}