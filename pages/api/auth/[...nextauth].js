import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import dbConnect from "../../../config/dbConnect"
import User from "../../../models/user"

export default NextAuth({
    // session: {
    //     jwt: true,
    // },
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                dbConnect()

                const { email, password } = credentials

                // Check if email and password is entered

                if (!email || !password) {
                    throw new Error("Please enter email or password")
                }

                // Find user in the database
                const user = await User.findOne({ email }).select("+password")

                if (!user) {
                    throw new Error("User not found")
                }

                // Check if password is correct or not
                const isPasswordMatched = await user.comparePassword(
                    password.toString()
                )

                if (!isPasswordMatched) {
                    throw new Error("Invalid Email or Password")
                }
                console.log(user)
                return Promise.resolve(user)
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return Promise.resolve(token)
        },
        session: async ({ session, token: { user } }) => {
            if (user) {
                session.user = user
            }
            return Promise.resolve(session)
        },
    },
})
