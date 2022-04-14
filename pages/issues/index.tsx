import { GetStaticProps } from "next";
import React from "react";
import client from "../../apollo-client";
import { Issue } from "../../src/generated/graphql";
import ALL_ISSUES from "../../queries/allIssues.graphql";

type Props = {
  issues: Issue[];
};

const IssuesPage: React.FC<Props> = ({ issues }) => {
  console.log(issues);
  return (
    <div>
      {issues.map((issue) => (
        <div key={issue.publicationDate}>
          <h1>Date: {issue.publicationDate}</h1>
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
  );
};

export default IssuesPage;

export const getStaticProps: GetStaticProps = async () => {
  const { data }: { data: { issues: Issue[] } } = await client.query({
    query: ALL_ISSUES,
  });

  return {
    props: {
      issues: data.issues,
    },
  };
};
