import { getSession } from "next-auth/react"
import React from "react"
import MyBookings from "../../components/booking/MyBookings"
import Layout from "../../components/layout/Layout"
import { myBookings } from "../../redux/actions/bookingActions"
import { wrapper } from "../../redux/store"

export default function MyBookingsPage() {
    return (
        <Layout title="Booking details">
            <MyBookings />
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ req }) => {
            const session = await getSession({ req })

            if (!session) {
                return {
                    redirect: {
                        destination: "/login",
                        permanent: false,
                    },
                }
            }

            await store.dispatch(myBookings(req.headers.cookie, req))
        }
)
