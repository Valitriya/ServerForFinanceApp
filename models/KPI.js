import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const currencyCongig = {
	type: mongoose.Types.Currency,
	currency: "USD",
	get: (v) => v / 100,
};

const daySchema = new Schema(
	{
		date: String,
		revenue: { ...currencyCongig },
		expenses: { ...currencyCongig },
	},
	{ toJSON: { getters: true } }
);

const monthSchema = new Schema(
	{
		month: String,
		revenue: { ...currencyCongig },
		expenses: { ...currencyCongig },
		operationalExpenses: { ...currencyCongig },
		nonOperationalExpenses: { ...currencyCongig },
		monthlyData: [monthSchema],
		dailyData: [daySchema],
	},
	{ toJSON: { getters: true } }
);

const KPISchema = new Schema(
	{
		totalProfit: { ...currencyCongig },
		totalRevenue: { ...currencyCongig },
		totaExpenses: { ...currencyCongig },
		expenseByCategory: {
			type: Map,
			of: { ...currencyCongig },
		},
		monthlyData: [],
	},
	{ timestamps: true, toJSON: { getters: true } }
);

const KPI = mongoose.model("KPI", KPISchema);

export default KPI;
