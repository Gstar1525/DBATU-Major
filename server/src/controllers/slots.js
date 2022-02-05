const data = [
    {
        date: "05-02-2022",
        time: "10:00",
        isAvailable: true
    },
    {
        date: "05-02-2022",
        time: "11:00",
        isAvailable: false
    },
    {
        date: "05-02-2022",
        time: "12:00",
        isAvailable: true
    },
    {
        date: "05-02-2022",
        time: "13:00",
        isAvailable: false
    },
    {
        date: "05-02-2022",
        time: "14:00",
        isAvailable: false
    },
    {
        date: "05-02-2022",
        time: "14:30",
        isAvailable: false
    },
    {
        date: "05-02-2022",
        time: "15:00",
        isAvailable: false
    },
    {
        date: "05-02-2022",
        time: "16:00",
        isAvailable: false
    }
]

const addslots = (req, res) => {
    console.log(req.body);
    res.json({ success: true, solts: data })
}

module.exports = { addslots }