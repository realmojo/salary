import dbConnect from "../../../lib/mongodb";
import Company from "../../../models/Company";

const handler = async (req, res) => {
  const { method } = req;
  const { code } = req.query;

  switch (method) {
    case "GET":
      if (code) {
        const items = await Company.find({ code: Number(code) });
        res.status(200).json(items);
      } else {
        const items = await Company.aggregate([
          {
            $group: {
              _id: { code: "$code", codeName: "$codeName" },
            },
          },
          {
            $sort: {
              code: 1,
              _id: 1,
            },
          },
        ]);
        res.status(200).json(items);
      }
      break;
  }
};

export default dbConnect(handler);
