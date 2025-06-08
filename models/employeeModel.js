import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the employee's name"],
  },
  type: {
    type: String,
    required: [true, "Please provide the employee type"],
    // values should come from constants
  },
  phoneNumber: {
    type: String,
    required: [true, "Please provide the phone number"],
  },
  employeeNumber: {
    type: String,
  },
  address: {
    type: String,
    required: [true, "Please provide the address"],
  },
  notes: {
    type: String,
  },
  userId: {
    type: String,
    required: [true, "Please provide the user ID"],
    // Will be linked as a foreign key later
  },
});

const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default /** @type {import("mongoose").Model<import("mongoose").Document>} */ (
  Employee
);
