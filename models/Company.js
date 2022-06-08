import { Schema, models, model } from "mongoose";
import moment from "moment";

const CompanySchema = new Schema({
  _id: {
    type: Number,
    require: true,
    index: { unique: true },
  },
  title: { type: String, default: "", index: { unique: true } },
  address: { type: String, default: "" },
  roadAddress: { type: String, default: "" },
  code: { type: Number, default: 0 },
  codeName: { type: String, default: "" },
  totalEmployer: { type: Number, default: 0 },
  monthSalary: { type: Number, default: 0 },
  yearSalary: { type: Number, default: 0 },
  info: {
    type: Array,
    default: [],
  },
  created: { type: String, default: moment().format("YYYY-MM-DD HH:mm:ss") },
  updated: { type: String, default: moment().format("YYYY-MM-DD HH:mm:ss") },
});

const Company = models.Company || model("Company", CompanySchema);
export default Company;
