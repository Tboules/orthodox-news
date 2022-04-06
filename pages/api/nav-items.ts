import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../apollo-client";
import NAV_QUERY from "../../queries/navQuery.graphql";
import { Categories } from "../../types/categoires";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Categories>
) {
  const { data }: { data: Categories } = await client.query({
    query: NAV_QUERY,
  });

  res.status(200).send(data);
}
