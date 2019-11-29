import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = email => {
  const auth = {
    auth: {
      api_key: process.env.API_KEY,
      domain: process.env.DOMAIN
    }
  };
  const client = nodemailer.createTransport(mg(auth));
  return client.sendMail(email);
};

export const sendScretMail = (address, secret) => {
  const email = {
    from: "kozza@kostagram.com",
    to: address,
    subject: "🔒 Login Scret for Kostagram 🔒",
    html: `Hello! Your login secret is ${secret}. <br />Copy paste on the App/Website to log in`
  };
  return sendMail(email);
};
