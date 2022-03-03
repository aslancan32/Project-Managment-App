import eventEmiter from "./eventEmiter.js";
import nodemailer from "nodemailer"

export default () => {
    eventEmiter.on('send_email', (emailData) => {
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER, // generated ethereal user
                pass: process.env.EMAIL_PASSWORD,
            }
        })

        let info = transporter.sendMail({
            from: process.env.EMAIL_FROM, // sender address
            ...emailData
        });
        console.log("Message sent: %s", info.messageId);
         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        
    })
}
