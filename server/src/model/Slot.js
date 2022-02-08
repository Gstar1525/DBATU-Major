const { db } = require("../model/db");
const admin = require("../firebase-service")

class Slot {
    constructor(date, time, isAvailable) {
        this.date = date;
        this.time = time;
        this.isAvailable = isAvailable;
    }
}

const createSlot = async (date, time, isAvailable) => {
    const slot = await db.collection("slots").add({ date, time, isAvailable });
    const data = await readSlot(slot.id);
    return data
}

const readSlot = async (slotID) => {
    const response = await db.collection("slots").doc(slotID).get();
    return response.data()
}

const readAllSlots = async () => {
    const response = await db.collection("slots").get();
    const slots = []
    response.docs.map(doc => {
        slots.push(doc.data())
    })
    return slots
}

module.exports = {
    createSlot,
    readAllSlots
}