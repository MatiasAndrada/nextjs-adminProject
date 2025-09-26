import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {
  // Temporary placeholder - WebSocket disabled to avoid conflicts
  console.log("Socket endpoint called but temporarily disabled");
  res.status(200).json({ message: "Socket temporarily disabled" });
};

export default SocketHandler;