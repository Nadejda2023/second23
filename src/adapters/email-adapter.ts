import { Request, Response, Router } from "express";
import nodemailer from "nodemailer";


export const emailAdapter = {
    async sendEmail(email: string,subject: string,message: string) {
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
        html: message,

    });
   return info
}
}