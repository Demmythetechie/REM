import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // or 587
    secure: true, // true for 465, false for 587
    auth: {
        user: "naim.okunade@gmail.com",
        pass: "qrkqntoirakuiqrp",
    },
});

export default transporter;