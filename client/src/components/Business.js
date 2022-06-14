import { useEffect } from "react"
import { Link } from "react-router-dom"

export const Business = ({ email, uid }) => {

    useEffect(() => {

    }, [])

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
        <Link style={{ textDecoration: "none" }} to={`/u/${uid}`}>
            <div style={style}>
                <h1>{email}</h1>
                <h1>{uid}</h1>
            </div >
        </Link>
    )
}