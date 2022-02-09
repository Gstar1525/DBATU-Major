import React, { useEffect, useState } from "react";
import { auth } from "../api/firebase-service";
import { readUserRole, updateUserRole } from "../api/users";
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

    const getUserRole = async () => {
        const userRole = await readUserRole();
        setIsCustomer(userRole.isCustomer);
        return userRole.isCustomer;
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
                            <div onClick={async () => {
                                const userRole = await getUserRole();
                                console.log(userRole);
                                await updateUserRole(!userRole)
                                setIsCustomer(!userRole)
                                setProfileMenu(!profileMenu)
                            }} className="list-item">
                                {isCustomer
                                    ? "Change to Business"
                                    : "Change to Customer"}
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