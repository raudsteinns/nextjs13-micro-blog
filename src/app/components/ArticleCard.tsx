import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Article } from "../type/types";

type ArticleCardProps = {
  article: Article;
};

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <article
      key={article.id}
      className="text-slate-900 flex flex-col shadow my-4"
    >
      <Link href={`/articles/${article.id}`} className="hover:opacity-75">
        <Image
          src={`https://picsum.photos/id/${article.id}/1200/600`}
          alt="image"
          width={1280}
          height={300}
        />
      </Link>
      <div className="bg-white flex flex-col justify-start p-6">
        <Link
          href="#"
          className="text-blue-700 text-sm font-bold uppercase pb-4"
        >
          Technology
        </Link>
        <Link
          href={`/articles/${article.id}`}
          className="text-3xl font-bold hover:text-gray-700 pb-4"
        >
          {article.title}
        </Link>
        <p className="text-sm pb-3">
          By{" "}
          <Link
            href={`/articles/${article.id}`}
            className="font-semibold hover:text-gray-800"
          >
            By Shincode
          </Link>
          , Published on {new Date(article.createdAt).toLocaleString()}
        </p>
        <Link href="#" className="pb-6">
          {article.content.length > 70
            ? article.content.substring(0, 70) + "..."
            : article.content}
        </Link>
        <Link
          href={`/articles/${article.id}`}
          className="text-pink-800 uppercase hover:text-black"
        >
          続きを読む <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;
