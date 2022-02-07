const { createSlot } = require("../model/Slot");

const createSlots = async (req, res) => {
    const { date, time, isAvailable } = req.body;
    const slot = await createSlot(date, time, isAvailable)
    res.status(201).send(`Created a new slot: ${slot.id}`);
}

module.exports = { createSlots }