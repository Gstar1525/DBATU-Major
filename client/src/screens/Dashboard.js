import React, { useEffect, useState } from "react";
import { createRef } from "react";
import { auth } from "../api/firebase-service";
import { createSlot, deleteSlot, readAllSlot } from "../api/slots";
import { readUserRole } from "../api/users";
import Popup from 'reactjs-popup';
import UpdateForm from "../components/UpdateForm"
import "../styles/Dashboard-style.css"
import { Link, Navigate } from "react-router-dom";


const Dashboard = ({ isCustomer, setIsCustomer }) => {
    const [showInputRow, setShowInputRow] = useState(false);
    const [btnText, setBtnText] = useState(false);
    const [data, setData] = useState({});
    const dateRef = createRef();
    const timeRef = createRef();
    const availableRef = createRef();

    useEffect(() => {
        getAllSlots();
    }, [])

    const getAllSlots = async () => {
        await getUserRole();
        const allSlots = await readAllSlot(auth.currentUser.uid)
        setData(allSlots)
    }

    const getUserRole = async () => {
        const userRole = await readUserRole(auth.currentUser.uid);
        setIsCustomer(userRole.isCustomer);
    }

    const addSlot = async () => {
        if (btnText) {
            const date = dateRef.current.value
            const time = timeRef.current.value
            const isAvailable = availableRef.current.checked
            const slot = await createSlot(date, time, isAvailable);
            setData({ ...data, ...slot })
        }
        setShowInputRow(!showInputRow)
        setBtnText(!btnText)
    }

    const onCancel = () => {
        setShowInputRow(false);
        setBtnText(false);
    }

    const onDelete = async (uid, slotId) => {
        await deleteSlot({ uid, slotId })
        window.location.reload(false);
    }

    const SlotEditor = (date, time, isAvailable) => {
        return (
            <tr style={{ display: (showInputRow && isCustomer === false) ? "" : "none" }}>
                <td><input required ref={date} placeholder="date" type="date" /></td>
                <td><input required ref={time} placeholder="time" type="time" /></td>
                <td><input required ref={isAvailable} placeholder="available" type="checkbox" /></td>
            </tr>
        )
    }
    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">
                {`Welcome ${auth.currentUser.email || " "}`}
            </h1>
            {isCustomer ? "" : <>
                <table><tbody>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Available</th>
                        <th className="action-col">Actions </th>
                    </tr>
                    {
                        Object.entries(data).map(slot => {
                            const slotRef = createRef();
                            const body = {
                                uid: auth.currentUser.uid,
                                slotId: slot[0],
                                data: slot[1]
                            }

                            return (
                                <tr ref={slotRef} key={slot[0]}>
                                    <td>{slot[1].date}</td>
                                    <td>{slot[1].time}</td>
                                    <td>{`${slot[1].isAvailable}`}</td>
                                    <td className="action">
                                        <div className="action-btn">
                                            <Popup trigger={
                                                <button>🖊</button>
                                            } position="left center">
                                                <UpdateForm
                                                    isAvailable={slot[1].isAvailable}
                                                    date={slot[1].date}
                                                    time={slot[1].time}
                                                    body={body}
                                                />
                                            </Popup>
                                            <button onClick={e => onDelete(auth.currentUser.uid, slot[0])} href="">🗑</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {SlotEditor(dateRef, timeRef, availableRef)}
                </tbody></table>
                <div className="btn-add-slot">
                    {btnText ? <button onClick={onCancel}>Cancel</button> : ""}
                    <button onClick={addSlot}>{btnText ? "Submit" : "Add"}</button>
                </div>
            </>}
        </div>
    );
}

export default Dashboard;