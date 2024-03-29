import dbConnect from "../../../lib/mongodb";
import Company from "../../../models/Company";

const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      const items = await Company.find({ totalEmployer: { $gt: 300 } })
        .sort({ yearSalary: -1 })
        .limit(100);
      res.status(200).json(items);
      break;
  }
};

export default dbConnect(handler);
