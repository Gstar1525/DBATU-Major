import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import isLoading from "../actions/isLoading";
import { getBusinessesByUid, postBusiness } from "../api/businesses";
import { auth } from "../api/firebase-service";
import { readUserRole, updateUserRole } from "../api/users";
import "../styles/ProfileMenu-style.css";

const ProfileMenu = ({ isCustomer, setIsCustomer }) => {


    const MenuList = () => {
        return (
            <div className="list">
                <Popup
                    trigger={<button className="list-item">Settings</button>}
                    position="bottom right"
                >
                    <Settings />
                </Popup>

                <button
                    className="list-item"
                    onClick={async () => await auth.signOut()}
                >
                    Logout
                </button>
            </div>
        );
    };

    const Settings = () => {
        const [checked, setChecked] = useState(!isCustomer);
        const [roleChanged, setRoleChanged] = useState(false);
        const settingsForm = useRef();
        const dispatch = useDispatch();

        const loadBusinessData = async () => {
            settingsForm.current["displayName"].value = auth.currentUser.displayName;
            settingsForm.current["email"].value = auth.currentUser.email;
            const response = await getBusinessesByUid(auth.currentUser.uid);
            console.log(response);
            const businessData = response[0].businessData;
            if (businessData) {
                settingsForm.current["description"].value = businessData.description;
                settingsForm.current["contactNumber"].value = businessData.contactNumber;
                settingsForm.current["address"].value = businessData.address;
            }
            if (isCustomer) {
                settingsForm.current["description"].readOnly = true;
                settingsForm.current["contactNumber"].readOnly = true;
                settingsForm.current["address"].readOnly = true;
            }
        }

        const saveSettings = async (event) => {


            dispatch(isLoading(true));
            event.preventDefault();
            const formData = new FormData(event.target);
            const settingsData = Object.fromEntries(formData);

            const response = await postBusiness({
                uid: auth.currentUser.uid,
                displayName: settingsData.displayName,
                email: settingsData.email,
                businessData: {
                    "description": settingsData.description,
                    "contactNumber": settingsData.contactNumber,
                    "address": settingsData.address,
                }
            });

            if (roleChanged) {
                await updateUserRole(!isCustomer, auth.currentUser.uid);
            }

            dispatch(isLoading(false));
            window.location.reload();
        };

        useEffect(loadBusinessData, []);

        return (
            <form ref={settingsForm} onSubmit={saveSettings} className="udpateForm">
                <div>
                    <label>Display Name</label>
                    <input name="displayName" type="text" />
                </div>
                <div>
                    <label>Email</label>
                    <input name="email" type="text" />
                </div>
                <div>
                    <label>Switch To Business Account</label>
                    <input
                        onChange={() => {
                            settingsForm.current["description"].readOnly = checked;
                            settingsForm.current["contactNumber"].readOnly = checked;
                            settingsForm.current["address"].readOnly = checked;
                            setChecked(!checked);
                            setRoleChanged(!roleChanged);
                        }}
                        defaultChecked={checked}
                        name="isCustomer"
                        type="checkbox"
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        maxLength={500}
                        style={{ resize: "vertical" }}
                        name="description"
                        type="text"
                    />
                </div>
                <div>
                    <label>Contact Number</label>
                    <input name="contactNumber" type="tel" />
                </div>
                <div>
                    <label>Address</label>
                    <textarea name="address" type="text" />
                </div>
                <button
                    type="submit"
                    style={{ width: "fit-content", paddingInline: "15px" }}
                >
                    Save Setting
                </button>
            </form>
        );
    };

    const [profileMenu, setProfileMenu] = useState(false);
    const profileOnClick = () => {
        setProfileMenu(!profileMenu);
    };

    return (
        <React.Fragment>
            <div className="profile-menu">
                <div className="img" onClick={profileOnClick}>
                    <img
                        src={`${process.env.PUBLIC_URL}/user-profile.png`}
                        alt="user profile icon"
                    />
                </div>
                {profileMenu ? <MenuList /> : null}
            </div>
        </React.Fragment>
    );
};

export default ProfileMenu;
