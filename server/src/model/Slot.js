const { db } = require("../model/db");

class Slot {
    constructor(date, time, isAvailable) {
        this.date = date;
        this.time = time;
        this.isAvailable = isAvailable;
    }
}

const createSlot = async (date, time, isAvailable) => {
    return await db.collection("slots").add({ date, time, isAvailable });
}

module.exports = {
    createSlot
}