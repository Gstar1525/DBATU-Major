const { readBusinesses, readBusinessesByUid, insertBookingData, readAllBookingData, createBusiness } = require("../model/Business")
const cron = require("node-cron")
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

const sendEmail = async (to, content) => {
    await transporter.sendMail({
        from: process.env.email,
        to: to,
        subject: "Slot Booked",
        text: "Hello world?",
        html: content,
    });
}

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
    startEmailScheduler(req.body.data, req.body.customer.email, "Your slot is coming")
    res.status(201).json(data);
}

const startEmailScheduler = (slotData, to, content) => {
    const date = slotData["date"].split("-")
    const time = slotData["time"].split(":")

    const values = {
        second: "00", minute: time[1], hour: time[0],
        date: date[2], month: date[1], week_day: "*"
    }

    cron.schedule(`
    ${values["second"]} 
    ${values["minute"]} 
    ${values["hour"]} 
    ${values["date"]} 
    ${values["month"]} 
    ${values["week_day"]}`,
        () => {
            sendEmail(to, content)
        },
        {
            scheduled: true
        }
    );

    console.log("Scheduled------------------########");
}

module.exports = { getbusinesses, getbusinessesByUid, postBookingData, getAllBookingData, postBusinessData }