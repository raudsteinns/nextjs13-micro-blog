"use client";

import { createArticle } from "@/app/blogAPI";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateBlogPage = () => {
  const router = useRouter();

  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // await createArticle(id, title, content); // json server用API

    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/posts/`;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, title, content }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "投稿に失敗しました");
      }

      const data = await res.json();
      console.log("投稿成功:", data);

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("投稿APIエラー:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-8 px-4 md:px-12">
      <h2 className="text-2xl font-bold mb-4">ブログ新規作成</h2>
      <form
        className="bg-slate-200 p-6 rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="text-gray-700 text-sm font-bold mb-2">URL</label>
          <input
            type="number"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700 text-sm font-bold mb-2">
            タイトル
          </label>
          <input
            type="text"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700 text-sm font-bold mb-2">本文</label>
          <textarea
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className={`py-2 px-4 border rounded-md  ${
            isLoading
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-orange-400 hover:bg-orange-500"
          }`}
          disabled={isLoading}
        >
          投稿
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
