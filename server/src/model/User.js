const { db } = require("../model/db");
const { admin } = require("../firebase-service.js")

const createUser = async (uid, isCustomer) => {
    const docRef = await db.collection("users-slots").add({ uid, isCustomer });
    const get = await docRef.get()
    const data = get.data();
    return data;
}

const updateUserRole = async (uid, isCustomer) => {
    const users = await db.collection("users-slots").where("uid", "==", `${uid}`).get();
    users.forEach(doc => {
        doc.ref.update({ "isCustomer": isCustomer })
    })
}

const readUsersDoc = async (docRefID) => {
    const response = await db.collection("users-slots").doc(docRefID).get();
    return response.data()
}

const readUserRole = async (uid) => {
    const users = await db.collection("users-slots").where("uid", "==", `${uid}`).get();
    let docRef = "";
    users.forEach(doc => {
        docRef = doc.ref
    })
    const doc = await readUsersDoc(docRef.id);
    return doc.isCustomer;
}

module.exports = {
    createUser,
    updateUserRole,
    readUserRole
}