import { useEffect } from "react"
import { Link } from "react-router-dom"

export const Business = ({ displayName, email, uid, businessData }) => {

    const style = {
        margin: "auto",
        textAlign: "center",
        margin: "2em",
        background: "white",
        boxShadow: "0px 2px 3px gray",
        padding: "10px",
        color: "black"
    }

    return (
        <Link style={{ textDecoration: "none", textAlign:"left !important" }} to={`/u/${uid}`}>
            <div style={style}>
                <h1>{displayName}</h1>
                <h2>{businessData.description}</h2>
                <h3>{businessData.address}</h3>
            </div >
        </Link>
    )
}