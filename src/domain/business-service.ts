import { Request, Response, Router } from "express";
import nodemailer from "nodemailer";
import { emailAdapter } from "../adapters/email-adapter";
import { emailManager } from "../managers/email-managers";


export const bussinessService = {
    async doOperation() {
    // 
    await emailManager.sendEmailConfirmationMessage({})
},
async doOperation2() {
    // 
    await emailAdapter.sendEmail("","", "")
},
}