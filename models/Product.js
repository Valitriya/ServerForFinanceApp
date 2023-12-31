import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const currencyConfig = {
	type: mongoose.Types.Currency,
	currency: "USD",
	get: (v) => v / 100,
};
const ProductSchema = new Schema({
	price: { ...currencyConfig },
	expense: { ...currencyConfig },
	transactions: [
	  {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Transaction",
	  },
	],
  }, { timestamps: true, toJSON: { getters: true } });


export default mongoose.model("Product", ProductSchema);
