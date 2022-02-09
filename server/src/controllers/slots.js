const { createSlot, readAllSlots } = require("../model/Slot");

const postSlots = async (req, res) => {
    const { date, time, isAvailable } = req.body;
    const slot = await createSlot(date, time, isAvailable)
    res.status(201).json({ slotID: slot });
}

const getSlots = async (req, res) => {
    const allSlots = await readAllSlots();
    res.status(201).json({ allSlots });
}

module.exports = { postSlots, getSlots }