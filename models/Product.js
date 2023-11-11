import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const currencyCongig = {
	type: mongoose.Types.Currency,
	currency: "USD",
	get: (v) => v / 100,
};



export default mongoose.model("Product");
