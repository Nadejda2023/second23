import { Code } from "mongodb";
import nodemailer from "nodemailer";


export const emailAdapter = {
    async sendEmail(email: string,subject: string, message: string) {
    let transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "fsklever@gmail.com",
          pass: "zbgkmjdyvmvgxxpo",
        },
    });
    let info = await transport.sendMail({
        from: 'Nadych <fsklever@gmail.com>',
        to: email,
        subject: subject,
        html: `<h1>Thank for your registration</h1>
        <p>To finish registration please follow the link below:
            <a href='https://somesite.com/confirm-email?code=your_confirmation_code=${Code}'>complete registration</a>
        </p>`
       ,

    });
   return info
}
}