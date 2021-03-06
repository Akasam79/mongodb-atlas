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
  email: {
    type: String,
    validate: {
      validator: async function (email) {
        const user = await this.constructor.findOne({ email });
        if (user) {
          if (this.id === Client.id) {
            return true;
          }
          return false;
        }
        return true;
      },
    },
    required: [true, "User email required"],
  },
  country: String,
});

const Client = mongoose.model("Client", ClientSchema);

app.use(express.json());

app.get("/clients", (req, res) => {
  Client.find({}, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server error" });
    } else {
      return res.status(200).json({
        message: "Client's details retrieved without error",
        data: result,
      });
    }
  });
});
app.get("/clients/:id", (req, res) => {
  Client.findById({ _id: req.params.id }, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server error" });
    } else if (!result) {
      return res.status(404).json({ message: "client detail not found" });
    } else {
      return res.status(200).json({
        message: "Client's details retrieved without error",
        data: result,
      });
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
      if (err) {
        return res
          .status(409)
          .json({ message: "the email entered already exists" });
      } else {
        return res
          .status(200)
          .json({ message: "New client added successfully", data: result[0] });
      }
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
    if (err) {
      return res.status(500).json({ message: "Internal Server error" });
    } else if (!result) {
      return res.status(404).json({ message: "client detail not found" });
    } else {
      res.status(200).json({
        message:
          result.name + "'s details has been updated in database successfully",
        data: result,
      });
    }
  });
});

app.delete(path, (req, res) => {
  var id = req.params.id;
  Client.findByIdAndDelete(id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server error" });
    } else if (!result) {
      return res.status(404).json({ message: "client detail not found" });
    } else {
      res.status(200).json({
        message:
          result.name + "'s details has been deleted from database sucessfully",
        data: result,
      });
    }
  });
});

app.listen(process.env.PORT || 5600);
console.log("server is running");
