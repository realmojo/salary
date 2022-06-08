import dbConnect from "../../../lib/mongodb";
import Company from "../../../models/Company";

const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      const items = await Company.find({
        $or: [
          { _id: 186418 },
          { _id: 361729 },
          { _id: 217130 },
          { _id: 511600 },
          { _id: 355281 },
          { _id: 337008 },
          { _id: 57336 },
          { _id: 360680 },
          { _id: 86159 },
          { _id: 213795 },
        ],
      }).sort({ yearSalary: -1 });
      res.status(200).json(items);
      break;
  }
};

export default dbConnect(handler);
