const dotenv = require("dotenv");
const express = require("express");
const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

app.get("/", (req, res) => {
  res.writeHead(200, "success");
  return res.end("Successful");
});

async function sendEmailToAdmin(senderName, senderEmail, subject, message) {
  try {
    const transport = Nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.HOST_PORT,
      auth: {
        user: process.env.USER,
        pass: process.env.TOKEN,
      },
    });

    let info = await transport.sendMail({
      from: `"${senderName}" <${process.env.SENDER_ADDRESS}>`, // fixed domain
      replyTo: senderEmail,
      to: process.env.RECIPIENT,
      subject,
      text: message,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

app.post("/message", async (req, res) => {
  console.log(req.body);
  const { uname, email, subject, message } = req.body;
  await sendEmailToAdmin(uname, email, subject, message);

  return res.status(200).json({ message: "email sent" });
});

app.listen(process.env.PORT, "127.0.0.1", () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
