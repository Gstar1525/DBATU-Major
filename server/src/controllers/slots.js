const { createSlot } = require("../model/Slot");

const createSlots = async (req, res) => {
    console.log(req.body);
    const { date, time, isAvailable } = req.body;
    const slot = await createSlot(date, time, isAvailable)
    res.status(201).json({ message: `Created a new slot: ${slot.id}` });
}

module.exports = { createSlots }