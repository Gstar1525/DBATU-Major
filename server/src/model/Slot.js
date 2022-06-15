const { db } = require("../model/db");

const createSlot = async (date, time, isAvailable, uid) => {
    const usersSlots = await db.collection("users-slots").where("uid", "==", `${uid}`).get();
    const slotsDocRef = usersSlots.docs[0].ref.collection("slots").add({ date, time, isAvailable })
    const get = await (await slotsDocRef).get()
    const data = await get.data();
    return data;
}

const readAllSlots = async (uid) => {
    const userSlotsCollection = await db.collection("users-slots").where("uid", "==", `${uid}`).get();
    const slotsDocRef = await userSlotsCollection.docs[0].ref.collection("slots").get();
    const slots = {}
    slotsDocRef.docs.map(doc => {
        slots[doc.id] = doc.data()
    })
    return slots
}

const updateSlot = async (uid, slotId, data) => {
    const slots = await readAllSlots(uid);
    const userSlotsCollection = await db.collection("users-slots").where("uid", "==", `${uid}`).get();
    await userSlotsCollection.docs[0].ref.collection("slots").doc(slotId).update(data);
    return slots;
}

module.exports = {
    createSlot,
    readAllSlots,
    updateSlot
}