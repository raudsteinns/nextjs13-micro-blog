"use client";

import React from "react";
// import { deleteArticle } from "../blogAPI";
import { useRouter } from "next/navigation";

type DeleteButtonProps = {
  id: string;
};

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    // await deleteArticle(id);

    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`;

    try {
      const res = await fetch(API_URL, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "削除に失敗しました");
      }

      const data = await res.json();
      console.log("削除成功:", data);

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("削除APIエラー:", error);
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="inline-block bg-red-500 hover:bg-red-600 rounded-md py-2 px-4 cursor-pointer">
      <button onClick={handleDelete}>削除</button>
    </div>
  );
};

export default DeleteButton;
