import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../styles/UpdateSlotStyle.css"
import UpdateForm from "../components/UpdateForm"

const UpdateSlot = () => {
    return (
        <Popup trigger={Trigger} position="center center">
            <UpdateForm />
        </Popup>
    )
}

const Trigger = () => {
    return <button style={{
        position: "absolute",
        top: "20em",
        left: "0",
        right: "0",
        margin: "auto",
    }} > Trigger</button>
}

export default UpdateSlot;
