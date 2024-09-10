import { notFound } from "next/navigation";
import { Article } from "./type/types";

// 記事一覧表示用API
export const getAllArtcles = async (): Promise<Article[]> => {
    const res = await fetch(`http://localhost:4000/posts`, {cache: "no-store"}); //ssr

    if (!res.ok) {
        throw new Error("Failed to fetch articles");
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const articles = await res.json();
    return articles;
}

// 記事詳細表示用API
export const getDetailArtcle = async (id: string): Promise<Article> => {
    try {
        const res = await fetch(`http://localhost:4000/posts/${id}`, { next: { revalidate: 60 }});

        if (!res.ok) {
            if (res.status === 404) {
                notFound();
            }
            throw new Error(`Failed to fetch article: ${res.status} ${res.statusText}`);
        }

        const article = await res.json();
        return article;
    } catch (error) {
        console.error("Error fetching article:", error);
        throw error;
    }
};

// 記事作成用API
export const createArticle = async (id: string, title: string, content: string): Promise<Article> => {
    const currentDate = new Date().toISOString();

    const res = await fetch(`http://localhost:4000/posts`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id, title, content, createdAt: currentDate})
    });

    if (!res.ok) {
        throw new Error("Failed to fetch articles");
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const newArticle = await res.json();
    return newArticle;
}

// 記事削除用API
export const deleteArticle = async (id: string): Promise<Article> => {
    const res = await fetch(`http://localhost:4000/posts/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch articles");
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const deleteArticle = await res.json();
    return deleteArticle;
}