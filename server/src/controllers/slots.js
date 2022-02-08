const { createSlot, readAllSlots } = require("../model/Slot");

const createSlots = async (req, res) => {
    console.log(req.body);
    const { date, time, isAvailable } = req.body;
    const slot = await createSlot(date, time, isAvailable)
    res.status(201).json({ slotID: slot });
}

const readSlots = async (req, res) => {
    const allSlots = await readAllSlots();
    res.status(201).json({ allSlots });
}
module.exports = { createSlots, readSlots }