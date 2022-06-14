import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { isLogged } from "../actions/isLogged";
import { getAuth } from "../api/auth";
import { getBusinessesByUid } from "../api/businesses";
import { auth } from "../api/firebase-service";
import { createSlot, readAllSlot } from "../api/slots";
import { readUserRole } from "../api/users";
import "../styles/Dashboard-style.css"

const BookSlots = ({ isCustomer, setIsCustomer }) => {
    const [showInputRow, setShowInputRow] = useState(false);
    const [btnText, setBtnText] = useState(false);
    const [data, setData] = useState([]);
    const [businessName, setBusinessName] = useState("")
    const dateRef = createRef();
    const timeRef = createRef();
    const availableRef = createRef();
    const { uid } = useParams()
    const dispatch = useDispatch();
    const authUser = useSelector(state => state.userReducer)

    useEffect(() => {
        getBusiness();
        getAllSlots();
    }, [])

    useEffect(() => {
        onAuthStateChanged(getAuth(), (user) => {
            dispatch(isLogged(user))
        })
    }, [authUser]);

    const getBusiness = async () => {
        const business = await getBusinessesByUid(uid);
        setBusinessName(business[0].email)
    }

    const getAllSlots = async () => {
        // await getUserRole();
        const allSlots = await readAllSlot(uid)
        setData([...data, ...allSlots.allSlots])
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
                {`Book slot at ${businessName} `}
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
                                <td>{

                                    (slot.isAvailable === "true") ? <button style={{ height: "40px" }}>Book</button> : "Booked"

                                }</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
export default BookSlots;