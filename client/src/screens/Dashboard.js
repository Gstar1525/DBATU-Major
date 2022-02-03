import React from "react";
import { auth } from "../api/firebase-service";
import "../styles/Dashboard-style.css"
const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">
                {`Welcome ${auth.currentUser.email || " "}`}
            </h1>


            <table>
                <tbody>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Available</th>
                    </tr>
                    <tr>
                        <td>1-2-2022</td>
                        <td>10:00</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>1-2-2022</td>
                        <td>10:00</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>1-2-2022</td>
                        <td>10:00</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>1-2-2022</td>
                        <td>10:00</td>
                        <td>Yes</td>
                    </tr>
                </tbody>

            </table>


            <button onClick={async () => { await auth.signOut(); }}>
                Sign Out
            </button>
        </div>
    );
}
export default Dashboard;