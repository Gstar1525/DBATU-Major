import React from "react";
import { auth } from "../api/firebase-service";

const Dashboard = () => {
    const style = {
        position: "absolute",
        marginTop: "6em",
        display: "flex",
        border: "solid 2px magenta"
    }

    return (
        <div style={style}>
            <h1> Dashboard </h1>
            <button onClick={async () => {
                await auth.signOut();
            }}>Sign out</button>
        </div>
    );
}
export default Dashboard;