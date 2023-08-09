import nodemailer from "nodemailer";
import config from "../config/config.js";
import { logger } from "./logger.js";

const { mailConfig } = config;

export const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: mailConfig.mailService,
    port: mailConfig.mailPort,
    secure: false,
    auth: {
      user: mailConfig.mailName,
      pass: mailConfig.mailPass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: mailConfig.mailName,
    to: to,
    subject: subject,
    html: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.messageId}`);
  } catch (error) {
    logger.error("Email not sent.", error);
  }
};
