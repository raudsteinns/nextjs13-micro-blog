import { Article } from "@/app/type/types";
import { supabase } from "@/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";

type ApiResponse = Article[] | { error: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
    const {data, error} = await supabase.from("posts").select("*")

    if (error) {
        return res.status(500).json({error: error.message})
    }

    if (!data) {
        return res.status(404).json({ error: "データが見つかりません" });
    }

    return res.status(200).json(data);
}