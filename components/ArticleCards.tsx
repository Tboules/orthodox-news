import Link from "next/link";
import React from "react";
import { Article } from "../src/generated/graphql";

type Props = {
  articles: Article[];
  parentSlug: string;
};

const ArticleCards: React.FC<Props> = ({ articles, parentSlug }) => {
  return (
    <div>
      <ul>
        {articles.map((article) => (
          <li key={article.slug}>
            <Link href={`/${parentSlug}/${article.slug}`}>
              <a>{article.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleCards;
