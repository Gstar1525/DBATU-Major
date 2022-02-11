const { db } = require("../model/db");

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
    const users = await db.collection("users-slots").where("uid", "==", uid).get();
    const dc = {
        data: ""
    }
    users.forEach(doc => {
        dc.data = doc.data();
    })
    return dc.data.isCustomer;
}

module.exports = {
    createUser,
    updateUserRole,
    readUserRole
}