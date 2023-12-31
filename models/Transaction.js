import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const currencyConfig = {
	type: mongoose.Types.Currency,
	currency: "USD",
	get: (v) => v / 100,
};
const TransactionSchema = new Schema(
	{
		buyer: {
			type: String,
			required: true
		},
		amount: { ...currencyConfig },
		productIds: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
			},
		],
	},
	{ timestamps: true, toJSON: { getters: true } }
);

export default mongoose.model("Transaction", TransactionSchema);
