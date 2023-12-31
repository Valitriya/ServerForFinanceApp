import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import kpisRouter from "./routes/kpi.js";
import KPI from "./models/KPI.js";
import Product from "./models/Product.js";
import productsRoutes from "./routes/product.js"
import transactionRoutes from "./routes/transaction.js"
import Transaction from "./models/Transaction.js"
import { kpis, products, transactions } from "./data/data.js"

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/kpi", kpisRouter);
app.use("/product", productsRoutes);
app.use("/transaction", transactionRoutes);
const PORT = process.env.PORT || 9000;
async function startServer() {
	try {
	  await mongoose.connect(process.env.MONGO_URL, {
		useNewUrlParser: true
	  });
	  console.log('Connected to MongoDB');
	  
	  app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
	// //только для теста
	//   await mongoose.connection.db.dropDatabase();
	//   KPI.insertMany(kpis);  
	//   Product.insertMany(products);  
	//   Transaction.insertMany(transactions);
	} catch (error) {
	  console.error(`${error} did not connect`);
	}
}
  
  startServer();