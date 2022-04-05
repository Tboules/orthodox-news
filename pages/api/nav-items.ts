import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../apollo-client";
import { navQuery } from "../../queries/navQuery";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = await client.query({ query: navQuery });
  console.log(data);

  res.status(200).json(data);
}
