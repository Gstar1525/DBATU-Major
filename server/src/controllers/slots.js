const {
    createSlot,
    readAllSlots,
    updateSlot,
    deleteSlot
} = require("../model/Slot");

const postSlots = async (req, res) => {
    const { date, time, isAvailable, uid } = req.body;
    const slot = await createSlot(date, time, isAvailable, uid)
    res.status(201).json(slot);
}

const getSlots = async (req, res) => {
    const allSlots = await readAllSlots(req.body.uid);
    res.status(201).json(allSlots);
}

const putSlot = async (req, res) => {
    const slots = await updateSlot(req.body.uid, req.body.slotId, req.body.data);
    res.status(201).json(slots);
}

const deleteSlt = async (req, res) => {
    const slot = await deleteSlot(req.body.uid, req.body.slotId);
    res.status(201).json(slot);
}

module.exports = { postSlots, getSlots, putSlot, deleteSlt }