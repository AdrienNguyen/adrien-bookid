import Layout from "../../components/layout/Layout"
import RoomDetail from "../../components/room/RoomDetail"
import { wrapper } from "../../redux/store"
import { getRoomDetails } from "../../redux/actions/roomActions"

export default function RoomDetailsPage() {
    return (
        <Layout>
            <RoomDetail title="Rooms details" />
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ req, params }) => {
            await store.dispatch(getRoomDetails(req, params.id))
        }
)
