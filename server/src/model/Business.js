const { db } = require("../model/db");
const admin = require("../firebase-service")

const readBusinesses = async () => {
    const users = []
    const uids = await db.collection("users-slots").where("isCustomer", "==", false).get();

    for (const doc of uids.docs) {
        const auth = admin.auth();
        const user = await auth.getUser(doc.data().uid);
        users.push({ ...user.providerData[0], uid: doc.data().uid })
    }

    return users;
}

const readBusinessesByUid = async (uid) => {
    const users = []
    const uids = await db.collection("users-slots").where("isCustomer", "==", false).where("uid", "==", uid).get();

    for (const doc of uids.docs) {
        const auth = admin.auth();
        const user = await auth.getUser(doc.data().uid);
        users.push({ ...user.providerData[0], uid: doc.data().uid })
    }

    return users;
}

module.exports = {
    readBusinesses,
    readBusinessesByUid
}