import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  // Your protected API logic here
  res.status(200).json({ message: "This is a protected route", user: session.user });
};
