const dotenv = require("dotenv");
const express = require("express");

const sendEmailToAdmin = require("./mail/config.js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

app.get("/", (req, res) => {
  res.writeHead(200, "success");
  return res.end("Successful");
});

app.post("/message", async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body) {
      return res.status(400).json({ message: "No data provided" });
    }

    const { uname, email, subject, message } = req.body;
    const emailResponse = await sendEmailToAdmin(
      uname,
      email,
      subject,
      message
    );
    if (emailResponse instanceof Error) {
      return res.status(500).json({ message: "Failed to send email" });
    }
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(process.env.PORT, "127.0.0.1", () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
