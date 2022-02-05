import React, { useEffect, useState } from "react";
import { auth } from "../api/firebase-service";
import { getSlots } from "../api/solts";
import "../styles/Dashboard-style.css"
const Dashboard = () => {

    const [data, setData] = useState([]);

    const fetchSlots = async () => {
        const json = await getSlots();
        setData(json.solts);
        }

    useEffect(() => {
        fetchSlots();
    },[]);

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
                    {
                        data.map((row) => (
                            <tr key={row.time}>
                                <td>{row.date}</td>
                                <td>{row.time}</td>
                                <td>{row.isAvailable ? "Yes" : "No"}</td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>


            <button onClick={async () => { await auth.signOut(); }}>
                Sign Out
            </button>
        </div>
    );
}
export default Dashboard;