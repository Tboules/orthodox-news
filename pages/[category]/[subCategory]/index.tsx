import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import client from "../../../apollo-client";
import { Category, SubCategory } from "../../../src/generated/graphql";
import SUB_CAT_NAV_QUERY from "../../../queries/subCategoriesNavQuery.graphql";
import SUB_CAT_ARTICLE from "../../../queries/subCategoryArticle.graphql";
import Link from "next/link";

type Props = {
  subCategory: SubCategory;
};

const SubCategory: React.FC<Props> = ({ subCategory }) => {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>SubCategory: {subCategory.name}</h1>
      <p>Article Count {subCategory.articles.length}</p>
      <ul>
        {subCategory.articles.map((article) => (
          <li key={article.slug}>
            <Link
              href="/[category]/[subCategory]/[article]"
              as={`/${subCategory.parent_category?.slug}/${subCategory.slug}/${article.slug}`}
            >
              <a>{article.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubCategory;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await client.query({
    query: SUB_CAT_ARTICLE,
    variables: {
      slug: params?.subCategory,
    },
  });

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
