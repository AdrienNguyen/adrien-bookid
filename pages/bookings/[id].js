import { getSession } from "next-auth/react"
import React from "react"
import BookingDetails from "../../components/booking/BookingDetails"
import Layout from "../../components/layout/Layout"
import { getBookingDetails } from "../../redux/actions/bookingActions"
import { wrapper } from "../../redux/store"

export default function MyBookingsPage() {
    return (
        <Layout title="Booking details">
            <BookingDetails />
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ req, params }) => {
            const session = await getSession({ req })

            if (!session) {
                return {
                    redirect: {
                        destination: "/login",
                        permanent: false,
                    },
                }
            }

            await store.dispatch(
                getBookingDetails(req.headers.cookie, req, params.id)
            )
        }
)
