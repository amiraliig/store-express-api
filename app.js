require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const productsRoute = require("./routes/products")
const authRoute = require("./routes/auth")
const categoryRoute = require("./routes/category")
const orderRoute = require("./routes/order")
const app = express();
const errorHandler = require("./middleware/errorHandler")
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoute)
app.use("/products", productsRoute)
app.use("/categories", categoryRoute)
app.use("/orders", orderRoute)
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("✅ MongoDB Connected");

		app.listen(process.env.PORT, () => {
			console.log(`Server listening on port ${process.env.PORT}`);
		});
	})
	.catch((err) => {
		console.error("❌ MongoDB Connection Error");
		console.error(err.message);
	});