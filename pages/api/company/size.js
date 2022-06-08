// import dbConnect from "../../../lib/mongodb";
// import CompanySize from "../../../models/CompanySize";
// import Company from "../../../models/Company";

import { MongoClient } from "mongodb";
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const handler = async (req, res) => {
  await client.connect();
  const db = client.db("salaryinfo");
  const companies = db.collection("companies");

  const { method } = req;
  const { page, range } = req.query;

  switch (method) {
    case "GET":
      if (range) {
        const limit = 10;
        const skip = page ? page : 0;
        const offset = skip * limit;
        const [min, max] = range.split("-");
        console.log(min, max);
        const cursor = companies
          .find({
            totalEmployer: { $gte: Number(min), $lt: Number(max) },
          })
          .sort({ totalEmployer: 1, monthSalary: 1 })
          .skip(offset)
          .limit(limit);

        const count = await cursor.count();
        const items = await cursor.toArray();
        console.log(items);
        console.log(count);

        // const query = Company.find({
        //   totalEmployer: { $gte: min, $lt: max },
        // })
        //   .sort({ totalEmployer: 1, monthSalary: 1 })
        //   .skip(offset)
        //   .limit(limit);

        // // const query2 = query;
        // const total = await query.count();
        // console.log(total);

        // const items = await query2;
        // console.log(items);
        // const items = query.exec((err, data) => {
        //   console.log(err);
        //   console.log(data);
        // });
        // console.log(items);

        // res.status(200).json({ total, items });
        res.status(200).json({ items: [] });
      } else {
        const items = await CompanySize.find({});
        res.status(200).json(items);
      }
      break;
  }
};

export default handler;
