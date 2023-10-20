import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT || 9000;
async function startServer() {
	try {
	  await mongoose.connect(process.env.MONGO_URL, {
		useNewUrlParser: true
	  });
	  console.log('Connected to MongoDB');
	  
	  app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
	} catch (error) {
	  console.error(`${error} did not connect`);
	}
  }
  
  startServer();