import { WithId } from "mongodb";

export type UserAccountDBType = {
    id: string,
    accountData: UserAccountType,
    emailConfirmation: EmailConfirmationType
}

export type EmailConfirmationType = {
    isConfirmed: boolean,
    confirmationCode: string,
    expirationDate: Date,
    sentEmails: []
}

export type UserAccountType = {
    email: string
    userName: string
    passwordHash: string 
    createdAt: Date
}

export type RegistrationDataType = {
    ip: string
}
export type SentEmailType = {
    sentDate: Date
}


