import React, { useEffect, useState } from "react";
import { createRef } from "react";
import { auth } from "../api/firebase-service";
import { createSlot, readAllSlot } from "../api/slots";
import "../styles/Dashboard-style.css"
const Dashboard = ({ isCustomer, setIsCustomer }) => {
    const [showInputRow, setShowInputRow] = useState(false);
    const [btnText, setBtnText] = useState(false);
    const [data, setData] = useState([]);
    const dateRef = createRef();
    const timeRef = createRef();
    const availableRef = createRef();

    useEffect(() => {
        getAllSlots();
    }, [])

    const getAllSlots = async () => {
        const allSlots = await readAllSlot()
        setData([...data, ...allSlots.allSlots])
    }

    const addSlot = async () => {
        if (btnText) {
            const date = dateRef.current.value
            const time = timeRef.current.value
            const isAvailable = availableRef.current.checked
            const slot = await createSlot(date, time, isAvailable);
            setData([...data, slot.slotID])
        }
        setShowInputRow(!showInputRow)
        setBtnText(!btnText)
    }

    const onCancel = () => {
        setShowInputRow(false);
        setBtnText(false);
    }

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
                        data.map((slot, index) => (
                            <tr key={index}>
                                <td>{slot.date}</td>
                                <td>{slot.time}</td>
                                <td>{slot.isAvailable}</td>
                            </tr>
                        ))
                    }
                    <tr style={{ display: (showInputRow && isCustomer === false) ? "" : "none" }}>
                        <td><input required ref={dateRef} placeholder="date" type="date" /></td>
                        <td><input required ref={timeRef} placeholder="time" type="time" /></td>
                        <td><input required ref={availableRef} placeholder="available" type="checkbox" /></td>
                    </tr>
                </tbody>
            </table>
            {(isCustomer === false) ? <div className="btn-add-slot">
                {btnText ? <button onClick={onCancel}>Cancel</button> : ""}
                <button onClick={addSlot}>{btnText ? "Submit" : "Add"}</button>
            </div> : ""}
        </div>
    );
}
export default Dashboard;