import NextAuth, { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { DynamoDBAdapter } from "@next-auth/dynamodb-adapter";

import { env } from '~/instances/env';
import { dynamoDbClient } from '~/instances/aws';

export default NextAuth({
  providers: [EmailProvider(env.emailProvider)],
  adapter: DynamoDBAdapter(dynamoDbClient, { tableName: 'admin-next-auth-demo-NextAuthTable' }),
  secret: env.aws.secretAccessKey,
  session: {
    strategy: 'database',
    maxAge: 12 * 30 * 60 * 60 * 24, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("CALLBACK | SIGN IN");
      console.log("User: ", user);
      console.log("Account: ", account);
      console.log("Profile: ", profile);
      console.log("Email: ", email); // { verificationRequest: true }
      console.log("Credentials: ", credentials);
      const verificationRequest = email?.verificationRequest;
      if (verificationRequest) {
        const EMAIL_WHITELIST = ["whitelistedEmail@gmail.com"];
        const { email: emailAddress } = user;
        if (!EMAIL_WHITELIST.includes(emailAddress)) {
          console.log("Invalid email address - not allowed to sign in");
          return false;
        }
      } else {
        return true;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log("***** Redirect - Start ********");
      console.log("URL: ", url);
      console.log("Base URL: ", baseUrl);
      if (url === 'http://localhost:3000/login') {
        return Promise.resolve('http://localhost:3000/dashboardNew')
      }
      return url.startsWith(baseUrl)
        ? Promise.resolve(`${url}`)
        : Promise.resolve(`${baseUrl}`);
    },
    async session({ session, token, user }) {
      console.log("CALLBACK | SESSION");
      console.log("Session: ", session);
      console.log("Token: ", token);
      console.log("User: ", user);
      if (session) {
        console.log(`Session found: `, session)
        session.id = user.id;
        session.email = user.email;
      }
      return session
    },
  },
  debug: true, 
});
