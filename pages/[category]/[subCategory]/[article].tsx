import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import client from "../../../apollo-client";
import { Article } from "../../../src/generated/graphql";
import ALL_ARTICLES_QUERY from "../../../queries/allArticles.graphql";
import SINGLE_ARTICLE from "../../../queries/singleArticle.graphql";

type Props = {
  article: Article;
};

const HighLevelArticle: React.FC<Props> = ({ article }) => {
  console.log(article);
  return <div>HighLevelArticle</div>;
};

export default HighLevelArticle;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data }: { data: { article: Article } } = await client.query({
    query: SINGLE_ARTICLE,
    variables: {
      slug: params?.article,
    },
  });

  return {
    props: {
      article: data.article,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data }: { data: { articles: Article[] } } = await client.query({
    query: ALL_ARTICLES_QUERY,
  });

  return {
    paths: data.articles.map((article) => {
      const isSub = article.category?.__typename == "SubCategory";

      if (isSub) {
        const cat = article.category;

        return {
          params: {
            //@ts-expect-error
            category: cat?.parent_category?.slug,
            subCategory: cat?.slug,
            article: article.slug,
          },
        };
      }

      return {
        params: {
          category: article.category?.slug,
          subCategory: "general",
          article: article.slug,
        },
      };
    }),
    fallback: false,
  };
};
