import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../apollo-client";
import { navQuery } from "../../queries/navQuery";
import { Categories } from "../../types/categoires";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Categories>
) {
  const { data }: { data: Categories } = await client.query({
    query: navQuery,
  });

  res.status(200).send(data);
}
