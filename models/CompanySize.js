import { Schema, models, model } from "mongoose";

const CompanySizeSchema = new Schema({
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  count: { type: Number, required: true },
});

const CompanySize =
  models.CompanySize || model("CompanySize", CompanySizeSchema);
export default CompanySize;
