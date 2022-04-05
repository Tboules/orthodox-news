import { gql, useQuery } from "@apollo/client";
import React from "react";
import { json } from "stream/consumers";

const QUERY = gql`
  query All_Articles {
    articles {
      slug
      title
      articleBody {
        html
      }
      category {
        ... on Category {
          slug
        }
        ... on SubCategory {
          slug
          parent_category {
            slug
          }
        }
      }
    }
  }
`;

const Test = () => {
  const { data } = useQuery(QUERY);

  return <div>{JSON.stringify(data)} hello I am testing</div>;
};

export default Test;
