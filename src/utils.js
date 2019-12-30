import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";
import jwt from "jsonwebtoken";

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
    subject: "🔒 Login Secret for Kostagram 🔒",
    html: `Hello! Your login secret is <b>${secret}</b> <br />Copy paste on the App/Website to log in`
  };
  return sendMail(email);
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
