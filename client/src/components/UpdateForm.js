import 'reactjs-popup/dist/index.css';
import "../styles/UpdateSlotStyle.css"
import { updateSlot } from "../api/slots";

const UpdateForm = ({ date, time, isAvailable, body }) => {

    const onUpdate = async (event) => {
        console.log(body);
        const formData = new FormData(event.target);
        const slotData = Object.fromEntries(formData)

        if (slotData.isAvailable != "on") {
            slotData.isAvailable = false
        } else {
            slotData.isAvailable = true
        }

        body = {
            ...body,
            data: slotData
        }
        await updateSlot(body)
        console.log(body);
    }

    return (
        <form className='udpateForm' onSubmit={onUpdate}>
            <div>
                <label>Time</label>
                <input name="time" defaultValue={time} type="time" />
            </div>
            <div>
                <label>Date</label>
                <input name="date" defaultValue={date} type="date" />
            </div>
            <div>
                <label>Is Available</label>
                <input name="isAvailable" defaultChecked={isAvailable} type="checkbox" />
            </div>
            <button>Submit</button>
        </form>
    )
}

export default UpdateForm;