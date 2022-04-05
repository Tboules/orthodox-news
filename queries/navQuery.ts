import { gql } from "@apollo/client";

export const navQuery = gql`
  query NavQuery {
    categories {
      slug
      name
      arabicDisplay
      subCategories {
        name
        slug
        arabicDisplay
      }
    }
  }
`;
