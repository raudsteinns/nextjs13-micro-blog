import React from "react";
import { Article } from "../type/types";
import ArticleCard from "./ArticleCard";

type ArticleListProps = {
  articles: Article[];
};

export const ArticleList = ({ articles }: ArticleListProps) => {
  if (!articles || articles.length === 0) {
    return <p>記事がありません。</p>;
  }
  return (
    <div>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}

      {/* {articles.map((article: Article) => (
            <ArticleCard key={article.id} article={article} />
          ))} */}
      {/* <ArticleCard />
          <ArticleCard />
          <ArticleCard /> */}
    </div>
  );
};
