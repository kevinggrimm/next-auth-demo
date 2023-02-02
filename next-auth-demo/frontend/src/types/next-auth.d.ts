import NextAuth from "next-auth"
import { type DefaultSession } from "next-auth"

// https://next-auth.js.org/getting-started/typescript

declare module "next-auth" {
    /**
     * Returned by 'useSession', 'getSession' and received as a prop on the 'SessionProvider'
     */
    interface Session {
        id: string,
        email: string,
        subscriptionId: string,
        worksheetUrl: string,
        customerId: string,
        lastUpdated: string
        & DefaultSession["user"];
    } 
}

