import React from "react"
import Link from "next/link"

const NotFound = () => {
    return (
        <div className="page-not-found-wrapper">
            <h1 className="title_404">404!</h1>
            <h3 className="description_404">
                Page Not Found. Go to <Link href="/">Homepage</Link>
            </h3>
        </div>
    )
}

export default NotFound
