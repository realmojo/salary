import dbConnect from "../../../lib/mongodb";
// import Company from "../../../models/Company";

const handler = async (req, res) => {
  const { method } = req;
  console.log(method);
  switch (method) {
    case "GET":
      // const item = await Phone.findOne({ number });
      res.status(200).json("hi");
      break;
  }
};

export default dbConnect(handler);
