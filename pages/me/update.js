import { getSession } from "next-auth/react"
import React from "react"
import Profile from "../../components/user/Profile"
import Layout from "../../components/layout/Layout"

const UpdateProfilePage = () => {
    return (
        <Layout title="Update Profile">
            <Profile />
        </Layout>
    )
}

export default UpdateProfilePage

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req })

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        }
    }

    return {
        props: { session },
    }
}
