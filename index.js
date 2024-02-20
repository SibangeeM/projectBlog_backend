const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
const PORT = process.env.PORT || 8080;
//mongodb connection
console.log(process.env.MONGODB_URL);
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect to Databse"))
  .catch((err) => console.log(err));


//product section
const schemaProduct = mongoose.Schema({
  title: String,
  date: String,
  category: String,
  image: String,
  description: String,
  github: String,
  demo: String,
});
const productModel = mongoose.model("projects", schemaProduct);
//save product in data
//api
app.post("/uploadProduct", async (req, res) => {
  // console.log(req.body)
  const data = await productModel(req.body);
  const datasave = await data.save();
  res.send({ message: "Upload successfully" });
});

app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
});

//server is ruuning
app.listen(PORT, () => console.log("server is running at port : " + PORT));
