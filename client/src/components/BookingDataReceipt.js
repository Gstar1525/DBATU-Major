import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import isLoading from "../actions/isLoading";
import { getAllBookingData } from "../api/businesses";
import { auth } from "../api/firebase-service"
import { deleteBookedSlot } from "../api/slots";
import { getUserData } from "../api/users";

const BookingDataReceipt = ({ close, data }) => {

    const [customerData, setCustomerData] = useState(({ displayName: "Loading...", email: "Loading..." }));
    const getBookedSlots = async () => {
        const bSlots = await getAllBookingData(auth.currentUser.uid, false)

        Object.entries(bSlots).forEach(async (sl) => {
            console.log(data);
            if (data[0] == sl[1].data.slotId) {
                const data = await getUserData(sl[1].uid);
                setCustomerData(data)
            }
        })
    }

    useEffect(() => {
        getBookedSlots();
    }, [])

    const style = {
        width: "85%",
        margin: "auto",
        position: "relative",
        top: "10%"
    }

    const Gap = () => <><br /><hr /><br /></>
    return (
        <div style={style}>
            <h3><u>Slot Id</u> - {data[0]}</h3>
            <h3><u>Time</u> - {data[1].time}</h3>
            <h3><u>Date</u> - {data[1].date}</h3>
            <Gap />
            <h3><u>Booked By</u> - {customerData.displayName}</h3>
            <h3><u>Email</u> - {customerData.email}</h3>
            <Gap />
            <h3><u>Booked At</u> - {auth.currentUser.displayName}</h3>
            <h3><u>Email</u> - {auth.currentUser.email}</h3>
        </div>
    )
}

export default BookingDataReceipt;