const Nodemailer = require("nodemailer");


const sendEmailToAdmin = async (
  senderName,
  senderEmail,
  subject,
  message
) => {
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
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendToNewsLetter = async (email) => {
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
     let info = await transport.sendMail({
       from: `"NewsLetter" <hello@demomailtrap.co>`,
       replyTo: email,
       to: process.env.RECIPIENT,
       subject: 'Newsletter Subscription',
       text: `Thank you for subscribing to our newsletter with the email: ${email}`,
     });
  }
  catch (error) {
    console.error("Error sending newsletter email:", error);
  }
};  
module.exports = {sendEmailToAdmin, sendToNewsLetter};
