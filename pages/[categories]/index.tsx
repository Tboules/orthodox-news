import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import client from "../../apollo-client";
import { Categories } from "../../types/categoires";

import CATEGORY_ARTICLES from "../../queries/categoryArticles.graphql";
import NAV_QUERY from "../../queries/navQuery.graphql";

const Categories = (props: any) => {
  return <div>Hello Category</div>;
};

export default Categories;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await client.query({
    query: CATEGORY_ARTICLES,
    variables: {
      slug: params?.categories,
    },
  });

  return {
    props: {
      data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data }: { data: Categories } = await client.query({
    query: NAV_QUERY,
  });

  return {
    paths: data.categories.map(({ slug }) => ({
      params: { categories: slug },
    })),
    fallback: true,
  };
};
