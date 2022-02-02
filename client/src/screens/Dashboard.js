import React from "react";
import { auth } from "../api/firebase-service";
import "../styles/Dashboard-style.css"
const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">
                {`Welcome ${auth.currentUser.email || " "}`}
            </h1>
            <button onClick={async () => { await auth.signOut(); }}>
                Sign Out
            </button>
        </div>
    );
}
export default Dashboard;