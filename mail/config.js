const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");
const dotenv = require("dotenv");


dotenv.config();
const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: process.env.TOKEN,
    testInboxId: 3630499,
  })
);

const sender = {
  address: process.env.SENDER_ADDRESS ,
  name: process.env.SENDER_ADDRESS_NAME,
};
const recipients = [process.env.RECIPIENT];

transport
  .sendMail({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
    sandbox: true,
  })
  .then(console.log, console.error);
// TOKEN : dad1d83b7554246065e884fdc151e0aa
