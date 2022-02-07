import React, { useEffect, useState } from "react";
import { createRef } from "react";
import { auth } from "../api/firebase-service";
import { createSlot } from "../api/slots";
import "../styles/Dashboard-style.css"
const Dashboard = () => {

    const addSlot = async (date, time, isAvailable) => {
        await createSlot(date, time, isAvailable);
    }
    const [showInputRow, setShowInputRow] = useState(false);
    const [btnText, setBtnText] = useState(false);
    const dateRef = createRef();
    const timeRef = createRef();
    const availableRef = createRef();

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
                    <tr style={{ display: showInputRow ? "" : "none" }}>
                        <td><input ref={dateRef} placeholder="date" type="text" /></td>
                        <td><input ref={timeRef} placeholder="time" type="text" /></td>
                        <td><input ref={availableRef} placeholder="available" type="text" /></td>
                    </tr>
                </tbody>
            </table>
            <div className="btn-add-slot">
                <button onClick={async () => {
                    if (btnText) {
                        const date = dateRef.current.value
                        const time = timeRef.current.value
                        const isAvailable = availableRef.current.value
                        await addSlot(date, time, isAvailable)
                    }
                    setShowInputRow(!showInputRow)
                    setBtnText(!btnText)
                }}>{btnText ? "Submit" : "Add"}</button>
            </div>
            <button onClick={async () => { await auth.signOut(); }}>
                Sign Out
            </button>
        </div>
    );
}
export default Dashboard;