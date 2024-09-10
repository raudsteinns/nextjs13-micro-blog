import { getDetailArtcle } from "@/app/blogAPI";
import DeleteButton from "@/app/components/DeleteButton";
import Image from "next/image";
import React from "react";

const Article = async ({ params }: { params: { id: string } }) => {
  // const detailArticle = await getDetailArtcle(params.id);

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/posts/${params.id}`;

  let detailArticle;
  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    detailArticle = await res.json();
  } catch (error) {
    detailArticle = null;
  }

  if (!detailArticle) {
    return <div>記事が見つかりません</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-5">
      {" "}
      <Image
        src={`https://picsum.photos/id/${detailArticle.id}/1200/600`}
        alt="image"
        width={1280}
        height={300}
      />
      <h1 className="text-4xl text-center mb-10 mt-10 font-bold">
        {detailArticle.title}
      </h1>
      <div className="text-lg leading-relaxed text-justify">
        {detailArticle.content}
      </div>
      <div className="text-right mt-3">
        <DeleteButton id={params.id} />
      </div>
    </div>
  );
};

export default Article;
