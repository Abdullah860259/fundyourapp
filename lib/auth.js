import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import { redirect } from "next/dist/server/api-utils";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url, baseUrl);

      // ✅ Logout case
      if (parsedUrl.searchParams.get("isLogged") === "false") {
        return `${baseUrl}/?isLogged=false`;
      }

      // ✅ Allow relative callback URLs (default NextAuth behavior)
      if (url.startsWith("/")) return `${baseUrl}${url}`;

      // ✅ Allow same-origin absolute URLs
      if (url.startsWith(baseUrl)) return url;

      // ❌ Otherwise fallback to home
      return baseUrl;
    },
    async jwt({ token, user }) {
      if (user) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/Routes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            image: user.image,
          }),
        });

        const data = await res.json();
        token.id = data.id; // ✅ Save MongoDB ID in token
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id; // ✅ Attach it to session
      return session;
    },
  },
};

export default authOptions;
