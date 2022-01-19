const home = (req, res) => {
    res.json({ success: true, message: "dashboard 🏠" })
}

const setting = (req, res) => {
    res.json({ success: true, message: "setting 🧰" })
}

module.exports = { home, setting }