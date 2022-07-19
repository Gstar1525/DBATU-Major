import React, { useEffect, useState } from "react";
import { createRef } from "react";
import { auth } from "../api/firebase-service";
import { createSlot, deleteSlot, readAllSlot } from "../api/slots";
import { readUserRole } from "../api/users";
import Popup from 'reactjs-popup';
import UpdateForm from "../components/UpdateForm"
import "../styles/Dashboard-style.css"
import LoadingOverlay from 'react-loading-overlay';
import { CustomerDashboard } from "../components";
import BookingDataReceipt from "../components/BookingDataReceipt";


const Dashboard = ({ isCustomer, setIsCustomer }) => {
    const [showInputRow, setShowInputRow] = useState(false);
    const [btnText, setBtnText] = useState(false);
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({});
    const dateRef = createRef();
    const timeRef = createRef();
    const availableRef = createRef();
    LoadingOverlay.propTypes = undefined


    useEffect(() => {
        console.log(isCustomer);
        getAllSlots();
    }, [])

    const getAllSlots = async () => {
        setLoading(true)
        await getUserRole();
        const allSlots = await readAllSlot(auth.currentUser.uid)
        setData(allSlots)
        setLoading(false)
    }

    const getUserRole = async () => {
        const userRole = await readUserRole(auth.currentUser.uid);
        console.log(userRole.isCustomer);
        if (userRole === undefined) {
            setIsCustomer(true);
        } else {
            setIsCustomer(userRole.isCustomer);
        }
    }

    const addSlot = async () => {
        setLoading(true)
        if (btnText) {
            const date = dateRef.current.value
            const time = timeRef.current.value
            const isAvailable = availableRef.current.checked
            const slot = await createSlot(date, time, isAvailable);
            setData({ ...data, ...slot })
        }
        setShowInputRow(!showInputRow)
        setBtnText(!btnText)
        setLoading(false)
    }

    const onCancel = () => {
        setShowInputRow(false);
        setBtnText(false);
    }

    const onDelete = async (uid, slotId) => {
        setLoading(true)
        await deleteSlot({ uid, slotId })
        window.location.reload(false);
    }

    const SlotEditor = (date, time, isAvailable) => {
        return (
            <tr style={{ display: (showInputRow && isCustomer === false) ? "" : "none" }}>
                <td></td>
                <td><input required ref={date} placeholder="date" type="date" /></td>
                <td><input required ref={time} placeholder="time" type="time" /></td>
                <td><input required ref={isAvailable} placeholder="available" type="checkbox" /></td>
            </tr>
        )
    }

    const ActionButtons = ({ body, slot }) => {

        return (
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
                <button onClick={e => onDelete(auth.currentUser.uid, slot[0])}>🗑</button>
                {
                    (!slot[1].isAvailable)
                        ? <Popup trigger={
                            <button>👁</button>
                        } position="left center">
                            {
                                close => (
                                    <BookingDataReceipt data={slot} close={close} />
                                )
                            }
                        </Popup>
                        : null
                }
            </div>
        )
    }
    return (
        <LoadingOverlay
            active={loading}
            spinner={true}
            text='Loading...'
            className="loadingContain"
        >
            <div className="dashboard-container">
                <h1 className="dashboard-title">
                    {`Welcome ${auth.currentUser.displayName || " "}`}
                </h1>
                {isCustomer
                    ? <CustomerDashboard />
                    : <>
                        <table><tbody>
                            <tr>
                                <th>Slot Id</th>
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
                                            <td>{slot[0]}</td>
                                            <td>{slot[1].date}</td>
                                            <td>{slot[1].time}</td>
                                            <td>{`${slot[1].isAvailable}`}</td>
                                            <td className="action">
                                                <ActionButtons
                                                    slot={slot}
                                                    body={body}
                                                />
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
        </LoadingOverlay>
    );
}

export default Dashboard;