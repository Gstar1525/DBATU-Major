const { createUser, updateUserRole, readUserRole } = require("../model/User");

const postUser = async (req, res) => {
    const { uid, isCustomer } = req.body;
    const doc = await createUser(uid, isCustomer);
    res.status(201).json({ doc: doc });
}

const putUserRole = async (req, res) => {
    const { uid, isCustomer } = req.body;
    const user = await updateUserRole(uid, isCustomer);
    res.status(201).json({ userID: user })
}

const getUserRole = async (req, res) => {
    const { uid } = req.body;
    const userRole = await readUserRole(uid);
    res.status(201).json({ isCustomer: userRole })
}


module.exports = { postUser, putUserRole, getUserRole }