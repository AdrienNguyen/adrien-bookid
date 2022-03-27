import Home from "../components/Home"
import Layout from "../components/layout/Layout"
import NotFound from "../components/layout/NotFound"

export default function Index() {
    return (
        <Layout title="Not found">
            <NotFound />
        </Layout>
    )
}
