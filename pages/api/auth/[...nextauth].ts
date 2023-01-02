import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            authorize(credentials, req) {
                const { email, password } = credentials as { email: string, password: string }
                if (email !== "admin@gmail.com" && password !== "admin@1234") {
                    return null
                }
                return { id: "1", email: "admin@gmail.com", user: "admin", url: "/admin/dashboard", role: "admin" }
            },
        })
    ],
    pages: { signIn: "/admin" },

}

export default NextAuth(authOptions);