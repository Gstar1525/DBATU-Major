import { useEffect, useState } from "react";
import { updateSlot } from "../api/slots";
import { Link } from "react-router-dom"


const Slot = ({ data, uid }) => {
    const style = {
        height: "30px",
        width: "70px"
    };
    const slot = data[1]
    const slotId = data[0]

    const [available, setAvailable] = useState(slot.isAvailable);

    useEffect(() => {
        console.log(slot.time, slot.isAvailable);
    }, [])

    const bookSlot = async (event) => {
        slot.isAvailable = false;
        const body = {
            uid: uid,
            slotId: slotId,
            data: slot
        }
        await updateSlot(body);
        setAvailable(slot.isAvailable);
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