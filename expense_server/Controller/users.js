const usersModel = require("../Model/users")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "USERAPI";


const register = async (req, res) => {

    const { email, password, name } = req.body;
    try {
        const existingUser = await usersModel.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ mesaage: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await usersModel.create({
            email: email,
            password: hashedPassword,
            name: name,
            // mobile: mobile
        })

        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY)
        res.status(201).json({ user: result, token: token })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })

    }

}


const signin = async (req, res) => {

    const { email, password } = req.body

    try {
        const existingUser = await usersModel.findOne({ email: email })
        if (!existingUser) {
            return res.status(400).json({ mesaage: "User NOT found" })
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid password" })
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY)
        res.status(201).json({ user: existingUser, token: token, message: "signed in" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Authentication failed. Try again." })
    }
}




module.exports = { signin, register }