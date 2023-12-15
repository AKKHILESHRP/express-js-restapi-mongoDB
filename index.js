const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Setting up the default middleware
app.use(express.json());

// creating the mongoose server
mongoose.connect("mongodb://localhost:27017/Car-Details")
.then(() => console.log("Database connected successfully."))
.catch((err) => console.log(err));

// creating the schema
const carSchema = mongoose.Schema({
    carName: {
        type:String,
        required: [true, "Car name is mandatory"]
    },
    carModel: {
        type: String,
        required: [true, "Model name is required"]
    },
    yearOfMaking: {
        type: Number,
        required: [true, "Making year is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: 1
    }
},{timestamps: true});

// creating the model
const carModel = mongoose.model("car", carSchema);

// creating the post request for the car
app.post("/car", (req, res) => {
    let car = req.body;
    carModel.create(car)
    .then((document) => {
        res.send({data: document, message: "Product created successfully"});
    }).catch((err) => console.log(err));
});

// creating the get request of the cars
app.get("/car", (req, res) => {
    carModel.find()
    .then((car) => res.send(car))
    .catch((err) => res.send(err));
})

// creating the get get request on id's
app.get("/car/:id", (req, res) => {
    carModel.findOne({_id: req.params.id}) 
    .then((car) => res.send(car))
    .catch((err) => res.send(err));
})

// creating the delete request
app.delete("/car/:id", (req, res) => {
    carModel.deleteOne({_id: req.params.id}) 
    .then((info) => res.send({message: "Car Deleted successfully."}))
    .catch((err) => res.send(err));
})

// creating the put request
app.put("/car/:id", (req, res) => {
    let car = req.body;
    carModel.updateOne({_id: req.params.id}, car)
    .then((info) => res.send({message: "Updated successfully."}))
    .catch((err) => res.send(err));
})

// sever port number
app.listen(8000, () => {
    console.log("Server is up and running!");
});