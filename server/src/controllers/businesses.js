const { readBusinesses, readBusinessesByUid, insertBookingData, readAllBookingData, createBusiness } = require("../model/Business")

const postBusinessData = async (req, res) => {
    await createBusiness(req.body);
    res.status(201).json({ "res": true });
}

const getbusinesses = async (req, res) => {
    const data = await readBusinesses();
    console.log(data);
    res.status(201).json(data);
}

const getbusinessesByUid = async (req, res) => {
    const { uid } = req.body;
    const data = await readBusinessesByUid(uid);
    res.status(201).json(data);
}

const getAllBookingData = async (req, res) => {
    const data = await readAllBookingData(req.body);
    res.status(201).json(data);
}

const postBookingData = async (req, res) => {
    const data = await insertBookingData(
        req.body.business,
        req.body.customer,
        req.body.data
    );
    res.status(201).json(data);
}

module.exports = { getbusinesses, getbusinessesByUid, postBookingData, getAllBookingData, postBusinessData }