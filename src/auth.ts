import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { stripe } from "./lib/stripe";
import { LoginSchema } from "./types/LoginSchema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          firstname: profile.given_name,
          lastname: profile.family_name,
          email: profile.email,
        };
      },
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          });
          if (!user || !user.password) return null;
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) return null;
          return user;
        }
        return null;
      },
    }),
  ],
  events: {
    createUser: async ({ user }) => {
      const userId = user.id;
      const userEmail = user.email;

      if (!userEmail || !userId) {
        return;
      }

      const stripeCustomer = await stripe.customers.create({
        email: userEmail ?? "",
        name: user.name ?? "",
      });

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          stripeCustomerId: stripeCustomer.id,
        },
      });
    },
  },
  callbacks: {
    async session({ token, session, user }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.firstname = token.firstname as string;
        session.user.lastname = token.lastname as string;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.birthday = token.birthday as string;
        session.user.phone = token.phone as string;
      }

      console.log(session);

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
      });

      if (!existingUser) return token;

      const existingAccount = await prisma.account.findFirst({
        where: {
          userId: existingUser.id,
        },
      });

      token.isOAuth = !!existingAccount;
      token.role = existingUser.role;
      token.firstname = existingUser.firstname;
      token.lastname = existingUser.lastname;
      token.birthday = existingUser.birthday;
      token.phone = existingUser.phone;
      token.email = existingUser.email;
      token.password = existingUser.password;

      return token;
    },
  },
  pages: {
    signIn: "/connexion",
  },

  session: {
    strategy: "jwt",
  },
});
