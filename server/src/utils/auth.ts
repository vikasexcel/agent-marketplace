import dotenv from "dotenv"
dotenv.config()
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6
    },
    user: {
        additionalFields: {
            role: { type: "string", required: false, input: true },
            country: { type: "string", required: false, input: true },
            currency: { type: "string", required: false, defaultValue: "$", input: false },
            language: { type: "string", required: false, defaultValue: "en", input: false },
        },
    },
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
    trustedOrigins: ["http://localhost:5091"],
});
