import { useEffect } from "react";
import { updateSlot } from "../api/slots";
import { Link } from "react-router-dom"


const Slot = ({ data, uid }) => {
    const style = {
        height: "30px",
        width: "70px"
    };

    const slot = data[1]
    const slotId = data[0]

    const bookSlot = async (event) => {
        slot.isAvailable = false;
        const body = {
            uid: uid,
            slotId: slotId,
            data: slot
        }
        await updateSlot(body);
    }

    return (
        <tr>
            <td>{slot.date}</td>
            <td>{slot.time}</td>
            <td>
                {
                    (slot.isAvailable === "true")
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