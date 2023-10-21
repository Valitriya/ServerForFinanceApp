import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);


const KPI = mongoose.model("KPI", KPISchema);

export default KPI;
