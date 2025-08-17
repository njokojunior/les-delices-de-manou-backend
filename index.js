if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}
const express = require("express");

const {sendEmailToAdmin} = require("./mail/config.js");
const { sendToNewsLetter } = require("./mail/config.js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  return res.send("Successful");
});

app.post("/message", async (req, res) => {
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

app.post("/newsletter", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "No data provided" });
    }
    const { email } = req.body;
    const emailResponse = await sendToNewsLetter(email);
    if (emailResponse instanceof Error) {
      return res.status(500).json({ message: "Failed to send newsletter email" });
    }
    return res.status(200).json({ message: "Newsletter email sent successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(process.env.PORT || 3000,"0.0.0.0", () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
