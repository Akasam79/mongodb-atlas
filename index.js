const express = require("express");
const app = express();

// const MongoClient = require("mongodb").MongoClient;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const connectionString = process.env.MONGODB_URI;
// const connectionString = "mongodb://localhost:27017/users";

mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log("failed");
    } else {
      console.log("database connected successfully");
    }
  }
);

const ClientSchema = new Schema({
  name: String,
  email: String,
  country: String,
});

const Client = mongoose.model("Client", ClientSchema);

app.use(express.json());

app.get("/client", (req, res) => {
  Client.find({}, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server error" });
    } else {
      return res.status(200).json({ message: result });
    }
  });
});

app.post("/", (req, res) => {
  Client.insertMany(
    {
      name: req.body.name,
      email: req.body.email,
      country: req.body.country,
    },
    (err, result) => {
      if (err)
        return res.status(500).json({ message: "Internal Server error" });
      return res
        .status(200)
        .json({ message: "New client added successfully", data: result[0] });
    }
  );
});

var path = "/client/:id";
app.put(path, (req, res) => {
  var clientUpdates = {
    name: req.body.name,
    email: req.body.email,
    country: req.body.country,
  };

  var id = req.params.id;
  Client.findByIdAndUpdate(id, clientUpdates, (err, result) => {
    if (err) return res.status(500).json({ message: "Internal Server error" });
    return res.status(200).json({ message: "Data updated sucessfully" });
  });
});

app.delete(path, (req, res) => {
  var id = req.params.id;
  Client.findByIdAndDelete(id, (err, result) => {
    if (err) return res.status(500).json({ message: "Internal server error" });
    return res.status(200).json({ message: "Client deleted sucessfully" });
  });
});

app.listen(process.env.PORT || 5600);
console.log("server is running");
