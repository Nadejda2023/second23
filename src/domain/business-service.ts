import { Request, Response, Router } from "express";
import nodemailer from "nodemailer";
import { emailAdapter } from "../adapters/email-adapter";
import { emailManager } from "../managers/email-managers";


export const bussinessService = {
    async doOperation() {
    // save to repo
    // get user from repo
    await emailManager.sendEmailConfirmationMessage({})
},
async doOperation2() {
    // save to repo
    // get user from repo
    await emailAdapter.sendEmail("","", "")
},
}