import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import client from "../../apollo-client";

import CATEGORY_ARTICLES from "../../queries/categoryArticles.graphql";
import NAV_QUERY from "../../queries/navQuery.graphql";
import { Category } from "../../src/generated/graphql";
import SubCatPageLinks from "../../components/SubCatPageLinks";
import ArticleCards from "../../components/ArticleCards";

type Props = {
  category: Category;
};

const Category: React.FC<Props> = ({ category }) => {
  const hasSubcategories = category.subCategories.length != 0;

  category.articles;
  return (
    <div style={{ padding: "1rem" }}>
      <h1>{category.name}</h1>
      <h1>{category.arabicDisplay}</h1>
      {hasSubcategories ? (
        <SubCatPageLinks
          subCategories={category.subCategories}
          parentSlug={category.slug ?? ""}
        />
      ) : (
        <ArticleCards
          articles={category.articles}
          parentSlug={category.slug ?? ""}
        />
      )}
    </div>
  );
};

export default Category;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data }: { data: Props } = await client.query({
    query: CATEGORY_ARTICLES,
    variables: {
      slug: params?.category,
    },
  });

  return {
    props: {
      category: data.category,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data }: { data: { categories: Category[] } } = await client.query({
    query: NAV_QUERY,
  });

  return {
    paths: data.categories.map(({ slug }) => ({
      params: { category: slug },
    })),
    fallback: false,
  };
};
