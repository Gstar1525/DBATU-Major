import { getAuth } from "../api/auth";
import { getBusinessesByUid } from "../api/businesses";
import { isLogged } from "../actions/isLogged";
import { readAllSlot } from "../api/slots";
import { Slot } from "../components";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../styles/Dashboard-style.css"
import LoadingOverlay from 'react-loading-overlay';


const BookSlots = () => {
    const [data, setData] = useState({});
    const [businessData, setBusinessData] = useState("_")
    const { uid } = useParams()
    const dispatch = useDispatch();
    const authUser = useSelector(state => state.userReducer)
    const [loading, setLoading] = useState(false)
    LoadingOverlay.propTypes = undefined



    useEffect(() => {
        onAuthStateChanged(getAuth(), (user) => {
            dispatch(isLogged(user))
        })
    }, [authUser]);

    useEffect(() => {
        getBusiness();
        getAllSlots();
    }, [])

    const getBusiness = async () => {
        const business = await getBusinessesByUid(uid);
        setBusinessData(business[0])
    }

    const getAllSlots = async () => {
        setLoading(true)
        const allSlots = await readAllSlot(uid)
        setData(allSlots)
        setLoading(false)
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
                    {`Book slot at ${businessData.displayName || ""} `}
                </h1>
                <table><tbody>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Available</th>
                    </tr>
                    {
                        Object.entries(data).map(slot => (
                            <Slot key={slot[0]} data={slot} businessData={businessData} />
                        ))
                    }
                </tbody></table>
            </div></LoadingOverlay>
    );
}

export default BookSlots;

