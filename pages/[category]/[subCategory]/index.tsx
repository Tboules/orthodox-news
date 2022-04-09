import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import client from "../../../apollo-client";
import { SubCategory } from "../../../src/generated/graphql";
import SUB_CAT_NAV_QUERY from "../../../queries/subCategoriesNavQuery.graphql";
import SUB_CAT_ARTICLE from "../../../queries/subCategoryArticle.graphql";

const SubCategory = (props: any) => {
  console.log(props);
  return <div>SubCategory</div>;
};

export default SubCategory;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await client.query({
    query: SUB_CAT_ARTICLE,
    variables: {
      slug: params?.subCategory,
    },
  });

  console.log(data);

  return {
    props: {
      subCategory: data.subCategory,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data }: { data: { subCategories: SubCategory[] } } =
    await client.query({
      query: SUB_CAT_NAV_QUERY,
    });

  return {
    paths: data.subCategories.map((sc) => ({
      params: {
        category: sc.parent_category?.slug,
        subCategory: sc.slug,
      },
    })),
    fallback: true,
  };
};
