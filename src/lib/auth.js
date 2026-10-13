
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUrl = process.env.BETTER_AUTH_MONGODB_URL;

if (!mongoUrl) {
  throw new Error("BETTER_AUTH_MONGODB_URL is missing");
}

const client = new MongoClient(mongoUrl);
const db = client.db("bazar-dor");

export const auth = betterAuth({
  baseURL:
    process.env.BETTER_AUTH_URL ||
    "http://localhost:3000",

  secret: process.env.BETTER_AUTH_SECRET,

  // Production ও local development-এর trusted origins
  trustedOrigins: [
    "https://bazardorweb.vercel.app",
    ...(process.env.NODE_ENV !== "production"
      ? ["http://localhost:3000"]
      : []),
  ],

  database: mongodbAdapter(db, { client }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },

  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET,
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },
});
