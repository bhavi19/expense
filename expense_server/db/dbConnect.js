
const mongoose = require("mongoose");
require('dotenv').config()

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        if (conn) {
            console.log("Successfully connected to MongoDB Atlas!");
        }
    } catch (error) {
        console.log("Error occured", error)
    }
}

module.exports = dbConnect;