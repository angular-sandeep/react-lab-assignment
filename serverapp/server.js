const express = require("express");
const app = express();
const bodyPasrer = require("body-parser");
const cors = require("cors");

// mongodb connection
const mongoose = require("mongoose");

// set global promise to manage all async calls made by application using mongoose driver.
mongoose.Promise = global.Promise;

// model-schema-mapping with collections on mongo db and establoshing collection with it.
mongoose.connect(
  "mongodb://localhost/ProdutsAppDb",
  { useNewUrlParser: true }
);

// get the connection object
var dbConnect = mongoose.connect;
if (!dbConnect) {
  console.log("sorry db connection is not established");
  return;
}

// define schema ( recommended to have same attribute as per the collection)
var productSchema = mongoose.Schema({
  ProductId: String,
  ProductName: String,
  CategoryName: String,
  Manufacturer: String,
  Price: Number
},{versionKey : false});

// map the schema with the collection
//                              name    schema      collection
var productModel = mongoose.model("Products", productSchema, "Products");

// configure "CORS"
app.use(cors());

app.use(bodyPasrer.urlencoded({ extended: false }));
app.use(bodyPasrer.json());

// getting all users
app.get("/api/product", (req, res) => {
  productModel.find().exec((err, data) => {
    if (err) {
      res.send({
        status: 500,
        error: err
      });
    }else{
    res.send({ status: 200, data: data });
	}
  });
});

// getting user by id
app.get("/api/product/:id", (req, res) => {
  let id = req.params.id;
  // *** findById ---> only works for _id field
  productModel.findOne({ ProductId: id }).exec((err, data) => {
    if (!err) {
      res.send({ status: 200, user: data });
    }
	else
		res.send({ status: 200, error: "no prodcu data found" });
  });
});

// adding new user
app.post("/api/product", (req, res) => {
  let product = {
    ProductId: req.body.ProductId,
    ProductName: req.body.ProductName,
    CategoryName: req.body.CategoryName,
    Manufacturer: req.body.Manufacturer,
    Price: req.body.Price
  };
  console.log(product);

  productModel.create(product, (err,data) => {
    if (err) {
      res.statusCode = 500;
      res.send({ status: res.statusCode, error: err });
    } else {
      res.send({ status: 200, data: data });
    }
  });
});

// // editing user by id
app.put("/api/product/:id", (req, res) => {
  let id = req.params.id;

  let product = {
    ProductId: req.body.ProductId,
    ProductName: req.body.ProductName,
    CategoryName: req.body.CategoryName,
    Manufacturer: req.body.Manufacturer,
    Price: req.body.Price
  };

  console.log(product);

  productModel.updateOne({ ProductId: id }, product, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.send({ status: res.statusCode, error: err });
    }
	console.log(data);
    res.send({ status: 200, data: data });
  });
});

// deleteing user by id
app.delete("/api/product/:id", (req, res) => {
  let id = req.params.id;
  productModel.deleteOne({ ProductId: id }, err => {
    if (err) {
      res.statusCode = 500;
      res.send({ status: res.statusCode, error: err });
    }
  });
  res.send({ status: 200, message: "delete successfully" });
});

app.listen(3000, () => {
  console.log("server started at port 3000");
});
