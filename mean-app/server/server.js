// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const employeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  department: String,
  salary: Number,
});

const Employee = mongoose.model("Employee", employeeSchema);

// CREATE
app.post("/api/employees", async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});

// READ (all)
app.get("/api/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.send(employees);
  } catch (error) {
    res.status(500).send(error);
  }
});

// READ (single)
app.get("/api/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).send();
    }
    res.send(employee);
  } catch (error) {
    res.status(500).send(error);
  }
});

// UPDATE
app.put("/api/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!employee) {
      return res.status(404).send();
    }
    res.send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE
app.delete("/api/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).send();
    }
    res.send(employee);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
