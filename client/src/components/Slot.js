import { useState } from "react";
import { updateSlot, sendSlotConfirmation } from "../api/slots";
import { Link } from "react-router-dom"
import { auth } from "../api/firebase-service";
import { useDispatch } from "react-redux";
import isLoading from "../actions/isLoading";
import { postBookingData } from "../api/businesses";


const Slot = ({ data, businessData }) => {
    const style = {
        height: "30px",
        width: "70px"
    };

    const slot = data[1]
    const slotId = data[0]
    slot["slotId"] = slotId
    const dispatch = useDispatch();
    const [available, setAvailable] = useState(slot.isAvailable);

    const bookSlot = async (event) => {
        dispatch(isLoading(true))
        slot.isAvailable = false;
        const body = {
            uid: businessData.uid,
            slotId: slotId,
            data: slot
        }
        const mailBody = {
            businessesEmail: businessData.email,
            customerEmail: auth.currentUser.email,
            slotData: slot
        }
        const business = {
            email: businessData.email,
            uid: businessData.uid
        }
        const customer = {
            email: auth.currentUser.email,
            uid: auth.currentUser.uid
        }
        await updateSlot(body);
        const bookingData = await postBookingData(business, customer, slot)
        dispatch(isLoading(false))
        setAvailable(slot.isAvailable);
        console.log(bookingData);
        await sendSlotConfirmation(mailBody)
    }

    return (
        <tr>
            <td>{slot.date}</td>
            <td>{slot.time}</td>
            <td>
                {
                    (available === true)
                        ? <Link to={`/u/${businessData.uid}`}>
                            <button onClick={bookSlot} style={style}>
                                Book
                            </button>
                        </Link>
                        : "Booked"
                }
            </td>
        </tr>
    );
}

export default Slot;