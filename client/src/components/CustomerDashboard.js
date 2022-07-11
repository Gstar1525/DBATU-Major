import { auth } from "../api/firebase-service";
import { useEffect } from "react";
import { getAllBookingData } from "../api/businesses";
import { useState } from "react";
import { deleteBookedSlot, deleteCustomerBookedSlot } from "../api/slots";
import { useDispatch } from "react-redux";
import isLoading from "../actions/isLoading";
import Popup from 'reactjs-popup';
import "../styles/Dashboard-style.css"
import { getUserData } from "../api/users";


const CustomerDashboard = () => {
    const [bookedSlots, setBookedSlots] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        getBookingData();
    }, []);

    const getBookingData = async () => {
        const uid = auth.currentUser.uid;
        const data = await getAllBookingData(uid, true);
        setBookedSlots(data)
    }

    const removeSlot = async (slot) => {
        dispatch(isLoading(true));
        const res = await deleteCustomerBookedSlot({
            uid: auth.currentUser.uid,
            slotId: slot[0]
        })
        window.location.reload("/dashboard");
    }

    const cancelSlot = async (data) => {
        dispatch(isLoading(true));
        const customerData = {
            uid: auth.currentUser.uid,
            slotId: data[0]
        }

        const businessData = {
            uid: data[1].uid,
            slotId: data[1].docId
        }
        await deleteBookedSlot({ customerData, businessData });
        window.location.reload("/dashboard");
    }

    const BookingDataReceipt = ({ close, data }) => {

        console.log(data);

        const [busiData, setBusiData] = useState(({ displayName: "Loading...", email: "Loading..." }));
        
        const getBusiData = async () => {
            const d = await getUserData(data[1].uid);
            setBusiData(d)
        }

        useEffect(()=> {
            getBusiData()
        },[])


        const style = {
            width: "85%",
            margin: "auto",
            position: "relative",
            top: "10%"
        }

        const Gap = () => <><br /><hr /><br /></>
        return (
            <div style={style}>
                <h3><u>Slot Id</u> - {data[1].data.slotId}</h3>
                <h3><u>Time</u> - {data[1].data.time}</h3>
                <h3><u>Date</u> - {data[1].data.date}</h3>
                <Gap />
                <h3><u>Booked By</u> - {auth.currentUser.displayName}</h3>
                <h3><u>Email</u> - {auth.currentUser.email}</h3>
                <Gap />
                <h3><u>Booked At</u> - {busiData.displayName}</h3>
                <h3><u>Email</u> - {busiData.email}</h3>
                <button
                    onClick={
                        async () => {
                            close()
                            await cancelSlot(data)
                        }
                    }
                    style={{
                        margin: "auto",
                        position: "relative",
                        marginTop: "10%",
                        background: "red"
                    }} >
                    Cancel Slot
                </button>
            </div>
        )
    }



    return (
        Object.keys(bookedSlots).length !== 0 ?
            <table>
                <tbody>
                    <tr>
                        <th>Slot Number</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th className="action-col">Actions </th>
                    </tr>
                    {
                        Object.entries(bookedSlots).map(slot => {

                            return (
                                <tr key={slot[1].data.slotId}>
                                    <td>{slot[1].data.slotId}</td>
                                    <td>{slot[1].data.date}</td>
                                    <td>{slot[1].data.time}</td>
                                    <td className="action">
                                        <div className="action-btn">
                                            <Popup
                                                trigger={
                                                    <button>👁</button>
                                                } position="left center">
                                                {
                                                    close => (
                                                        <BookingDataReceipt data={slot} close={close} />
                                                    )
                                                }

                                            </Popup>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                        )}
                </tbody>
            </table> : <h2>Search and Book your first Slot</h2>
    )
}

export default CustomerDashboard
