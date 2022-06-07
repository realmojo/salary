import dbConnect from "../../../lib/mongodb";
import Company from "../../../models/Company";

const handler = async (req, res) => {
  const { method } = req;
  const { title } = req.query;

  switch (method) {
    case "GET":
      const items = await Company.find({ title: { $regex: title } });
      res.status(200).json(items);
      break;
  }
};

export default dbConnect(handler);
