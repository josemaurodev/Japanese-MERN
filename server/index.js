const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/login-mern");

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password == password) {
          res.json({ status: "success", message: "Login successful", user: {id:user._id, name: user.name, email: user.email } });
        } else {
          res.json({ status: "error", message: "The password is incorrect" });
        }
      } else {
        res.json({ status: "error", message: "There is no account for this email" });
      }
    })
    .catch(err => res.json({ status: "error", message: "An error occurred" }));
});


app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then(user => res.json({ status: "success", user }))
    .catch(err => res.json({ status: "error", message: err.message }));
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.get("/user", (req, res) => {
  const { userID } = req.query;
  UserModel.findById({ _id: userID })
    .then(user => {
      if (user) {
        res.json({ status: "success", user: { name: user.name, email: user.email } });
      } else {
        res.json({ status: "error", message: "User not found" });
      }
    })
    .catch(err => res.json({ status: "error", message: "An error occurred" }));
});

app.put("/user", (req, res) => {
  const { userID, email, name, password } = req.body;
  UserModel.findOneAndUpdate({ _id: userID }, { name: name, password: password, email: email }, { new: true })
    .then(user => {
      if (user) {
        res.json({ status: "success", user: { name: user.name, email: user.email } });
      } else {
        res.json({ status: "error", message: "User not found" });
      }
    })
    .catch(err => res.json({ status: "error", message: "An error occurred" }));
});
