import { useState } from "react";
import { updateSlot, sendSlotConfirmation } from "../api/slots";
import { Link } from "react-router-dom"
import { auth } from "../api/firebase-service";


const Slot = ({ data, uid, businessEmail, setLoading }) => {
    const style = {
        height: "30px",
        width: "70px"
    };
    const slot = data[1]
    const slotId = data[0]

    const [available, setAvailable] = useState(slot.isAvailable);

    const bookSlot = async (event) => {
        setLoading(true)
        slot.isAvailable = false;
        const body = {
            uid: uid,
            slotId: slotId,
            data: slot
        }
        const mailBody = {
            businessesEmail: businessEmail,
            customerEmail: auth.currentUser.email,
            slotData: slot
        }

        await updateSlot(body);
        setAvailable(slot.isAvailable);
        setLoading(false)
        await sendSlotConfirmation(mailBody)
    }

    return (
        <tr>
            <td>{slot.date}</td>
            <td>{slot.time}</td>
            <td>
                {
                    (available === true)
                        ?
                        <Link to={`/u/${uid}`}>
                            <button onClick={bookSlot} style={style}>Book</button>
                        </Link>
                        : "Booked"
                }
            </td>
        </tr>
    );
}

export default Slot;