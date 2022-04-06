import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../apollo-client";
import NAV_QUERY from "../../queries/navQuery.graphql";
import { Category } from "../../src/generated/graphql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ categories: Category[] }>
) {
  const { data }: { data: { categories: Category[] } } = await client.query({
    query: NAV_QUERY,
  });

  res.status(200).send(data);
}
