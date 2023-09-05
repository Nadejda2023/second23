import { emailAdapter } from "../adapters/email-adapter"

export const emailManager = {
    async sendEmailConfirmationMessage(user: any) {
    // save to repo
    // get user from repo
    await emailAdapter.sendEmail("user.email", "password recovery","<div>message</div>")
}
//async sendEmailConfirmationMessage() = {

//}
}