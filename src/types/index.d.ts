
//index.d.ts
declare global {
   declare namespace Express {
        export interface Request {
            userId: string | null
        }
    }
}