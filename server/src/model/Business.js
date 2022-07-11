const { db } = require("../model/db");
const admin = require("../firebase-service")


const createBusiness = async (data) => {
    const userSlotsCollection = await db.collection("users-slots").where("uid", "==", `${data.uid}`).get();
    console.log("update", data);
    const auth = admin.auth();
    await userSlotsCollection.docs[0].ref.update({ businessData: data.businessData })
    await auth.updateUser(data.uid, { displayName: data.displayName, email: data.email })
}

const readBusinesses = async () => {
    const users = []
    const uids = await db.collection("users-slots").where("isCustomer", "==", false).get();

    for (const doc of uids.docs) {
        const auth = admin.auth();
        const user = await auth.getUser(doc.data().uid);
        const businessData = doc.data().businessData
        users.push({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            businessData: businessData
        })
    }
    return users;
}

const readBusinessesByUid = async (uid) => {
    const users = []
    const auth = admin.auth();
    // TODO
    const businessDoc = await db.collection("users-slots")
        .where("uid", "==", uid).get();


    if (businessDoc.docs.length !== 0) {
        const businessData = businessDoc.docs[0].data().businessData
        const user = await auth.getUser(uid);
        users.push({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            businessData: businessData
        })
    }
    return users;
}

const readAllBookingData = async (data) => {
    const colName = data.isCustomer ? "booked-at" : "booked-by";
    const userSlotsCollection = await db.collection("users-slots").where("uid", "==", `${data.uid}`).get();
    const slots = {}
    if (userSlotsCollection.docs.length !== 0) {
        const slotsDocRef = await userSlotsCollection.docs[0].ref.collection(colName).get()
        slotsDocRef.docs.map(doc => {
            slots[doc.id] = doc.data()
        })
    }
    return slots
}

const insertBookingData = async (business, customer, slotData) => {
    const businessDoc = await addBookingData(business.uid, "booked-by", customer, slotData);
    const customerDoc = await addBookingData(customer.uid, "booked-at", business, slotData);

    business["docId"] = businessDoc.docId
    customer["docId"] = customerDoc.docId

    await updateBookingData(business.uid, "booked-by", customer, slotData);
    await updateBookingData(customer.uid, "booked-at", business, slotData);

    return [businessDoc, customerDoc]
}

const addBookingData = async (uid, collectionName, userData, slotData) => {
    const slots = await db
        .collection("users-slots")
        .where("uid", "==", `${uid}`).get();

    const docRef = await slots.docs[0].ref
        .collection(collectionName)
        .add({ ...userData, data: slotData })

    const get = await docRef.get();
    const res = {
        docId: get.id,
        ...get.data()
    }
    return res
}

const updateBookingData = async (uid, collectionName, userData, slotData) => {
    const slots = await db
        .collection("users-slots")
        .where("uid", "==", `${uid}`).get();

    const dRef = await slots.docs[0].ref
        .collection(collectionName)
        .get()

    await dRef.docs[0].ref.update({ ...userData, data: slotData });

}

module.exports = {
    readBusinesses,
    readBusinessesByUid,
    insertBookingData,
    readAllBookingData,
    createBusiness
}