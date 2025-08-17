const Nodemailer = require("nodemailer");

if(process.env.NODE_ENV !== "production") {   
  const dotenv = require("dotenv");
  dotenv.config({ path: "../.env" });

}

module.exports = async function sendEmailToAdmin(
  senderName,
  senderEmail,
  subject,
  message
) {
  try {
    const transport = Nodemailer.createTransport({
      host: process.env.HOST,
      port: Number(process.env.HOST_PORT),
      secure: false,
      auth: {
        user: "api",
        pass: process.env.TOKEN,
      },
    });

    await transport
      .verify()
      .then(() => console.log("✅ SMTP server is ready to take messages"))
      .catch((err) => console.error("❌ SMTP connection failed:", err));

    let info = await transport.sendMail({
      from: `"${senderName}" <hello@demomailtrap.co>`,
      replyTo: senderEmail,
      to: process.env.RECIPIENT,
      subject,
      text: message,
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
