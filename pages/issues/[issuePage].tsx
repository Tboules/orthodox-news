import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import client from "../../apollo-client";
import ISSUES_COUNT_QUERY from "../../queries/issues/count.graphql";
import PAGINATED_ISSUES from "../../queries/issues/paginatedIssues.graphql";
import { Issue, IssueConnection } from "../../src/generated/graphql";
import { createArrayOfPages } from "../../utils";

const ISSUES_PER_PAGE = 10;

interface Props {
  issues: Issue[];
  issuesConnection: IssueConnection;
}

const PaginatedIssues: NextPage<Props> = ({ issues, issuesConnection }) => {
  return (
    <div>
      <h1>hello PaginatedIssues page:{issuesConnection.aggregate.count}</h1>
      <div>
        {issues.map((issue) => (
          <div key={issue.publicationDate}>
            <h1>Date: {issue.publicationDate}</h1>
            <h3>Issue Number: {issue.issueNumber}</h3>
            <a
              href={issue.issueFile.url}
              download
              target="_blank"
              rel="noreferrer"
            >
              link to issue
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaginatedIssues;

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const skip: number =
    (parseInt(params?.issuePage as string) - 1) * ISSUES_PER_PAGE;

  const { data }: { data: Props } = await client.query({
    query: PAGINATED_ISSUES,
    variables: {
      skip: skip,
      first: ISSUES_PER_PAGE,
    },
  });

  return {
    props: {
      issues: data.issues,
      issuesConnection: data.issuesConnection,
    },
    revalidate: 5,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data }: { data: { issuesConnection: IssueConnection } } =
    await client.query({
      query: ISSUES_COUNT_QUERY,
    });

  const issuesArray = createArrayOfPages(
    data.issuesConnection.aggregate.count,
    ISSUES_PER_PAGE
  );

  return {
    paths: issuesArray.map((issuePage) => ({
      params: {
        issuePage: issuePage.toString(),
      },
    })),
    fallback: "blocking",
  };
};
