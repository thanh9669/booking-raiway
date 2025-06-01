import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid profile email https://www.googleapis.com/auth/userinfo.profile", // Ensure you request the necessary scopes
        },
      },
    }),
  ],
  // Các cấu hình khác
  callbacks: {
    async jwt({ token, account }) {
      // Lưu accessToken vào token nếu có
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Gán accessToken vào session
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export default NextAuth(authOptions);