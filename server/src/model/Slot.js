const { db } = require("../model/db");

const createSlot = async (date, time, isAvailable, uid) => {
    const usersSlots = await db.collection("users-slots").where("uid", "==", `${uid}`).get();
    const slotsDocRef = usersSlots.docs[0].ref.collection("slots").add({ date, time, isAvailable })
    const get = await (await slotsDocRef).get()
    const data = await get.data();
    const response = {};
    response[get.id] = data;
    return response;
}

const readAllSlots = async (uid) => {
    const userSlotsCollection = await db.collection("users-slots").where("uid", "==", `${uid}`).get();
    const slots = {}
    if (userSlotsCollection.docs.length !== 0) {
        const slotsDocRef = await userSlotsCollection.docs[0].ref.collection("slots").get();
        slotsDocRef.docs.map(doc => {
            slots[doc.id] = doc.data()
        })
    }
    return slots
}

const updateSlot = async (uid, slotId, data) => {
    const slots = await readAllSlots(uid);
    const userSlotsCollection = await db.collection("users-slots").where("uid", "==", `${uid}`).get();
    await userSlotsCollection.docs[0].ref.collection("slots").doc(slotId).update(data);
    return slots;
}

const deleteSlot = async (uid, slotId) => {
    const slots = await readAllSlots(uid);
    const userSlotsCollection = await db.collection("users-slots").where("uid", "==", `${uid}`).get();
    await userSlotsCollection.docs[0].ref.collection("slots").doc(slotId).delete();
    return slots;
}

const deleteBookedSlot = async (uid, slotId, colName) => {
    const userSlotsCollection = await db.collection("users-slots").where("uid", "==", `${uid}`).get();
    await userSlotsCollection.docs[0].ref.collection(colName).doc(slotId).delete();
    return { "success": true };
}

module.exports = {
    createSlot,
    readAllSlots,
    updateSlot,
    deleteSlot,
    deleteBookedSlot
}