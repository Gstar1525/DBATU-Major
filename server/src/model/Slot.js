const { db } = require("../model/db");

const createSlot = async (date, time, isAvailable, uid) => {

    const usersSlots = await db.collection("users-slots").where("uid", "==", `${uid}`).get();
    const slotsDocRef = usersSlots.docs[0].ref.collection("slots").add({ date, time, isAvailable })
    const get = await (await slotsDocRef).get()
    const data = await get.data();
    return data;


    // const slot = await db.collection("slots").add({ date, time, isAvailable });
    // const data = await readSlot(slot.id);
    // return data
}

const readAllSlots = async (uid) => {
    const userSlotsCollection = await db.collection("users-slots").where("uid", "==", `${uid}`).get();
    const slotsDocRef = await userSlotsCollection.docs[0].ref.collection("slots").get();
    const slots = []
    slotsDocRef.docs.map(doc => {
        slots.push(doc.data())
    })
    return slots
}

module.exports = {
    createSlot,
    readAllSlots
}