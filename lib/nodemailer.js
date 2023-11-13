import nodemailer from "nodemailer";

const email = process.env.NEXT_APP_EMAIL;
const pass = process.env.NEXT_APP_EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kinoxapparel@gmail.com",
    pass: "hfktbzxqwvjavhcm",
  },
});

export const mailOptions = {
  from: email,
  to: email,
};
