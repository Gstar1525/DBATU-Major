const {
    createSlot,
    readAllSlots,
    updateSlot,
    deleteSlot,
    deleteBookedSlot
} = require("../model/Slot");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.email,
        pass: process.env.password,
    },
});

const postSlots = async (req, res) => {
    const { date, time, isAvailable, uid } = req.body;
    const slot = await createSlot(date, time, isAvailable, uid)
    res.status(201).json(slot);
}

const getSlots = async (req, res) => {
    const allSlots = await readAllSlots(req.body.uid);
    res.status(201).json(allSlots);
}

const putSlot = async (req, res) => {
    const slots = await updateSlot(req.body.uid, req.body.slotId, req.body.data);
    res.status(201).json(slots);
}

const deleteSlt = async (req, res) => {
    const slot = await deleteSlot(req.body.uid, req.body.slotId);
    res.status(201).json(slot);
}

const deleteCustomerBookedSlt = async (req, res) => {
    await deleteBookedSlot(req.body.uid, req.body.slotId, "booked-at");
    res.status(201).json({success: true});
}

const deleteBookedSlt = async (req, res) => {
    const customerData = req.body.customerData
    const businessData = req.body.businessData
    await deleteBookedSlot(customerData.uid, customerData.slotId, "booked-at");
    await deleteBookedSlot(businessData.uid, businessData.slotId, "booked-by");
    res.status(201).json({ success: true });
}

const sendEmail = async (to, content) => {
    await transporter.sendMail({
        from: process.env.email,
        to: to,
        subject: "Slot Booked",
        text: "Hello world?",
        html: content,
    });
}

const sendConfirmation = async (req, res) => {
    const content = `Slot booked for ${req.body.slotData.date} at ${req.body.slotData.time}`
    await sendEmail(req.body.businessesEmail, content)
    await sendEmail(req.body.customerEmail, content)
    res.status(201).json(content);
}

module.exports = {
    postSlots,
    getSlots,
    putSlot,
    deleteSlt,
    sendConfirmation,
    deleteCustomerBookedSlt,
    deleteBookedSlt
}
