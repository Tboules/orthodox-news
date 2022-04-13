import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import React from "react";
import client from "../../../apollo-client";
import { Article } from "../../../src/generated/graphql";
import ALL_ARTICLES_QUERY from "../../../queries/allArticles.graphql";
import SINGLE_ARTICLE from "../../../queries/singleArticle.graphql";
import { RichText } from "@graphcms/rich-text-react-renderer";

type Props = {
  article: Article;
};

const HighLevelArticle: React.FC<Props> = ({ article }) => {
  //@ts-expect-error
  const isEnglishArticle = article.category?.parent_category?.slug == "english";

  return (
    <div dir={isEnglishArticle ? "ltr" : "rtl"}>
      <RichText
        content={article.articleBody?.raw.children}
        renderers={{
          img: ({ src, altText, height, width }) => (
            <div
              style={{
                width: "100%",
                margin: "auto",
                padding: "0 2rem",
                maxWidth: "800px",
              }}
            >
              <Image
                src={src ?? ""}
                alt={altText}
                height={height}
                width={width}
                objectFit="cover"
                layout="responsive"
                loader={() => src ?? ""}
              />
            </div>
          ),
        }}
      />
    </div>
  );
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
