import React, { useState } from "react";
import { auth } from "../api/firebase-service";
import "../styles/ProfileMenu-style.css"

const ProfileMenu = ({ isCustomer, setIsCustomer }) => {

    const [profileMenu, setProfileMenu] = useState(false);

    const profileOnClick = () => {
        setProfileMenu(!profileMenu)
    }

    const itemOnClick = () => {
        console.log("Item Clicked");
        setProfileMenu(!profileMenu)
    }


    return (
        <React.Fragment>
            < div className="profile-menu" >
                <div className="img" onClick={profileOnClick}>
                    <img src={`${process.env.PUBLIC_URL}/user-profile.png`} alt="user profile icon" />
                </div>
                {
                    profileMenu
                        ? <div className="list">
                            <div onClick={itemOnClick} className="list-item">Profile</div>
                            <div onClick={() => {
                                setIsCustomer(!isCustomer)
                                setProfileMenu(!profileMenu)
                            }} className="list-item">
                                {isCustomer ? "C" : "B"}
                            </div>
                            <div onClick={async () => { await auth.signOut() }} className="list-item">Logout</div>
                        </div>
                        : null
                }
            </div>
        </React.Fragment>
    );

}


export default ProfileMenu;