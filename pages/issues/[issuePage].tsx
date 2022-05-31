import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import client from "../../apollo-client";
import ISSUES_COUNT_QUERY from "../../queries/issues/count.graphql";
import { IssueConnection } from "../../src/generated/graphql";
import { createArrayOfPages } from "../../utils";

interface Props {}

const PaginatedIssues: NextPage<Props> = ({ page }: any) => {
  return (
    <div>
      <h1>hello PaginatedIssues page:{page}</h1>
    </div>
  );
};

export default PaginatedIssues;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      page: params?.issuePage,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data }: { data: { issuesConnection: IssueConnection } } =
    await client.query({
      query: ISSUES_COUNT_QUERY,
    });

  const issuesArray = createArrayOfPages(
    data.issuesConnection.aggregate.count,
    10
  );

  return {
    paths: issuesArray.map((issuePage) => ({
      params: {
        issuePage: issuePage.toString(),
      },
    })),
    fallback: false,
  };
};
