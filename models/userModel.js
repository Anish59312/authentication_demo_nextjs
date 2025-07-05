import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username" ],
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date //check spelling
})

const User = mongoose.models.User || mongoose.model("User", userSchema)


export default /** @type {import("mongoose").Model<import("mongoose").Document>} */ (User);
