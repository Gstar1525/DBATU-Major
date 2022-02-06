const { Slot } = require("../model/slot");
const { db } = require("../model/db");

const addslots = (req, res) => {
    res.json({ success: true, slots: data })
}

const insertSlots = async (req, res) => {
    const data = req.body;
    const slot = {
        date : data.date,
        time : data.time,
        isAvailable : data.isAvailable
    }
    const newDoc = await db.collection("slots").add(slot);
    res.status(201).send(`Created a new slot: ${newDoc.id}`);    
}
module.exports = { addslots, insertSlots }