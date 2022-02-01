import React from "react";
import { auth } from "../api/firebase-service";

const Dashboard = () => {
    const style = {
        divStyle: {
            position: "absolute",
            left: "0",
            right: "0",
            width: "50%",
            textAlign: "center",
            margin: "auto",
            marginTop: "6em",
        },
        welcomeTitleDashboardStyle: {
            padding: "1em"
        }
    }

    return (
        <div style={style.divStyle}>
            <h1 style={style.welcomeTitleDashboardStyle}> {`Welcome ${auth.currentUser.email || " "}`}  </h1>
            <button onClick={async () => {
                await auth.signOut();
            }}>Sign out</button>
        </div>
    );
}
export default Dashboard;