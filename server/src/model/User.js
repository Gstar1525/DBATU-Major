const { db } = require("../model/db");
const admin = require("firebase-admin");

const createUser = async (uid, isCustomer) => {
    const users = await db.collection("users-slots").where("uid", "==", `${uid}`).get();
    if (users.empty) {
        console.log("user created", isCustomer);
        const docRef = await db.collection("users-slots").add({ uid, isCustomer });
        const get = await docRef.get()
        const data = get.data();
        return data;
    } else {
        return {};
    }
}

const updateUserRole = async (uid, isCustomer) => {
    const users = await db.collection("users-slots").where("uid", "==", `${uid}`).get();
    users.forEach(doc => {
        doc.ref.update({ "isCustomer": isCustomer })
    })
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

const readUserData = async (uid) => {
    const auth = admin.auth();
    const user = await auth.getUser(uid);
    const userSlot = await db.collection("users-slots").where("uid", "==", uid).get();
    const userData = userSlot.docs[0].data()
    const data = { uid: uid, ...userData }
    data["displayName"] = user.displayName;
    data["email"] = user.email;
    return data;
}

module.exports = {
    createUser,
    updateUserRole,
    readUserRole,
    readUserData
}