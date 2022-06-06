import dbConnect from "../../../lib/mongodb";
import Company from "../../../models/Company";

const handler = async (req, res) => {
  const { method } = req;
  let { _id } = req.query;

  _id = Number(_id);

  switch (method) {
    case "GET":
      const item = await Company.findOne({ _id });
      res.status(200).json(item);
      break;
  }
};

export default dbConnect(handler);
