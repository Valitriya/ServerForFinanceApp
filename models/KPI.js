import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const KPISchema = new Schema({
	totalProfit: {
		type: mongoose.Types.Currency,
		currency: "USD",
		get: (v) => v / 100,
	},
	totalRevenue: {
		type: mongoose.Types.Currency,
		currency: "USD",
		get: (v) => v / 100,
	},
	totaExpenses: {
		type: mongoose.Types.Currency,
		currency: "USD",
		get: (v) => v / 100,
	},
	expenseByCategory: {
		type: Map,
		of: {
			type: mongoose.Types.Currency,
			currency: "USD",
			get: (v) => v / 100,
		},
	},
});

const KPI = mongoose.model("KPI", KPISchema);

export default KPI;
