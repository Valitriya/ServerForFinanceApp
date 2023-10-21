import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const daySchema = new Schema(
	{
		date: String,
		revenue: {
			type: mongoose.Types.Currency,
			currency: "USD",
			get: (v) => v / 100,
		},
		expenses: {
			type: mongoose.Types.Currency,
			currency: "USD",
			get: (v) => v / 100,
		},
	},
	{ toJSON: { getters: true } }
);

const KPISchema = new Schema(
	{
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
		monthlyData: [],
	},
	{ timestamps: true, toJSON: { getters: true } }
);

const KPI = mongoose.model("KPI", KPISchema);

export default KPI;
