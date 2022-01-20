const profile = (req, res) => {
    res.json({ success: true, message: "profile 👥" })
}

const setting = (req, res) => {
    res.json({ success: true, message: "settings 🧰" })
}

const dashboard = (req, res) => {
    res.json({ success: true, message: "dashboard 🤖" })
}

module.exports = { profile, setting, dashboard }