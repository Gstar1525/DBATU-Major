const admin = require("../firebase-service")

const login = (req, res) => {
    res.json({ success: true, message: "login 🔑", })
}

const signup = async (req, res) => {
    console.log(req.body);
    const {
        email,
        phoneNumber,
        password,
        displayName
    } = req.body;

    const user = await admin.auth().createUser({
        email,
        phoneNumber,
        password,
        displayName
    });

    res.json({
        success: true,
        message: "signup 🧾",
        user
    })
}

module.exports = { login, signup }