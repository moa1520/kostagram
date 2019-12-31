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
    subject: "🔒 Kostagram 인증코드 🔒",
    html: `안녕하세요. <br/> Kostagram 인증코드: <b>${secret}</b> <br />앱 또는 사이트에 복사/붙여넣기 하세요`
  };
  return sendMail(email);
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
