import React from "react";
import { Article } from "../type/types";
import ArticleCard from "./ArticleCard";

type ArticleListProps = {
  articles: Article[];
};

export const ArticleList = ({ articles }: ArticleListProps) => {
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
