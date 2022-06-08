import dbConnect from "../../../lib/mongodb";

const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      res.status(200).json("hi");
      break;
  }
};

export default dbConnect(handler);
