const { db } = require("../model/db");

class Slot {
    constructor(date, time, isAvailable) {
        this.date = date;
        this.time = time;
        this.isAvailable = isAvailable;
    }
}

const createSlot = async (date, time, isAvailable) => {
    const slot = new Slot(date, time, isAvailable)
    return await db.collection("slots").add({ ...slot });
}

module.exports = {
    createSlot
}