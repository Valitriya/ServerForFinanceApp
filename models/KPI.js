import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const currencyCongig = {
	type: mongoose.Types.Currency,
	currency: "USD",
	get: (v) => v / 100,
};

const configureSchema = (config) =>
	new Schema(config, { toJSON: { getters: true } });

const daySchemaConfig = configureSchema({
	date: String,
	revenue: { ...currencyCongig },
	expenses: { ...currencyCongig },
});

const monthSchemaConfig = configureSchema({
	month: String,
	revenue: { ...currencyCongig },
	expenses: { ...currencyCongig },
	operationalExpenses: { ...currencyCongig },
	nonOperationalExpenses: { ...currencyCongig },
});

const KPISchemaConfig = configureSchema(
	{
		totalProfit: { ...currencyCongig },
		totalRevenue: { ...currencyCongig },
		totalExpenses: { ...currencyCongig },
		expensesByCategory: {
			type: Map,
			of: { ...currencyCongig },
		},
		monthlyData: [monthSchemaConfig],
		dailyData: [daySchemaConfig],
	},
	{ timestamps: true }
);

const KPI = mongoose.model("KPI", KPISchemaConfig);

export default KPI;
