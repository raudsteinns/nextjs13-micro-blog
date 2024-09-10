"use client";

import React from "react";
import { deleteArticle } from "../blogAPI";
import { useRouter } from "next/navigation";

type DeleteButtonProps = {
  id: string;
};

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteArticle(id);
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
