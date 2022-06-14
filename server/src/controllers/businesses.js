const { readBusinesses, readBusinessesByUid } = require("../model/Business")

const getbusinesses = async (req, res) => {
    const data = await readBusinesses();
    console.log(data);
    res.status(201).json(data);
}

const getbusinessesByUid = async (req, res) => {
    const { uid } = req.body;
    console.log(uid);
    const data = await readBusinessesByUid(uid);
    console.log(data);
    res.status(201).json(data);
}

module.exports = { getbusinesses, getbusinessesByUid }