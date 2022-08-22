
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const dotenv = require('dotenv');
const { getTemplate } = require("./utils");
dotenv.config();

const { OAuth2 } = google.auth;
const oauthLink = "https://developers.google.com/oauthplayground";

const {EMAIL, MAILING_CLIENT_ID, MAILING_CLIENT_SECRET, MAILING_REFRESH} = process.env;

const auth = new OAuth2(
  MAILING_CLIENT_ID,
  MAILING_CLIENT_SECRET,
  MAILING_REFRESH,
  oauthLink
);

const mail = {};

mail.sendVerificationEmail = async function(email, name, url) {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH
  });
  const accessToken = auth.getAccessToken();
  const smtp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_CLIENT_ID,
      clientSecret: MAILING_CLIENT_SECRET,
      accessToken: accessToken,
      refreshToken: MAILING_REFRESH
    }
  });
  const mailOptions = {
    from: `"KosamTech" <${EMAIL}>`, // sender address
    to: email, // list of receivers
    subject: "Action Required Account Verification", // Subject line
    html: await getTemplate("activate-mail", { "{{username}}": name, "{{url}}": url }), // html body
  }
  try {
    const res = await smtp.sendMail(mailOptions);
    return res;
  } catch (err) {
    return err
  }
}

module.exports = mail;