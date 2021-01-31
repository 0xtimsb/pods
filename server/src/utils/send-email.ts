import nodemailer from "nodemailer";

export async function sendEmail(to: string, html: string) {
  // Create reusable transporter object using the default SMTP transport.
  let transporter = nodemailer.createTransport({
    service: "Outlook365", // no need to set host or port etc.
    auth: {
      user: process.env.NODEMAILER_EMAIL, // Generated ethereal user.
      pass: process.env.NODEMAILER_PASSWORD, // Generated ethereal password.
    },
  });

  // Send mail with defined transport object.
  let info = await transporter.sendMail({
    from: `"Pods" <${process.env.NODEMAILER_EMAIL}>`, // sender address
    to: to, // List of receivers
    subject: "Change Password for Pods", // Subject line
    html,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
