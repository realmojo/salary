import dbConnect from "../../../lib/mongodb";
import CompanySize from "../../../models/CompanySize";
import Company from "../../../models/Company";

const handler = async (req, res) => {
  const { method } = req;
  const { page, range } = req.query;

  switch (method) {
    case "GET":
      if (range) {
        const limit = 10;
        const skip = page ? Number(page) - 1 : 0;
        const offset = skip * limit;
        const [min, max] = range.split("-");
        const { count: total } = await CompanySize.findOne({
          min: Number(min),
          max: Number(max),
        });
        const items = await Company.find({
          totalEmployer: { $gte: min, $lt: max },
        })
          .sort({ totalEmployer: 1, monthSalary: 1 })
          .skip(offset)
          .limit(limit);

        res.status(200).json({ total, items });
      } else {
        const items = await CompanySize.find({});
        res.status(200).json(items);
      }
      break;
  }
};

export default dbConnect(handler);
