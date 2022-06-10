import dbConnect from "../../../lib/mongodb";
import Company from "../../../models/Company";

const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      const items = await Company.find({
        $or: [
          { _id: 453873 },
          { _id: 163935 },
          { _id: 318781 },
          { _id: 190408 },
          { _id: 312501 },
          { _id: 294789 },
          { _id: 50195 },
        ],
      }).sort({ yearSalary: -1 });
      res.status(200).json(items);
      break;
  }
};

export default dbConnect(handler);
