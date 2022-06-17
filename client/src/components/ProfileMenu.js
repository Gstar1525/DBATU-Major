import React, { useState } from "react";
import { auth } from "../api/firebase-service";
import { readUserRole, updateUserRole } from "../api/users";
import "../styles/ProfileMenu-style.css"

const ProfileMenu = ({ setLoading, isCustomer, setIsCustomer }) => {

    const [profileMenu, setProfileMenu] = useState(false);

    const profileOnClick = () => {
        setProfileMenu(!profileMenu)
    }

    const itemOnClick = () => {
        setProfileMenu(!profileMenu)
    }

    const getUserRole = async () => {
        const userRole = await readUserRole(auth.currentUser.uid);
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
                                setLoading(true)
                                const userRole = await getUserRole();
                                await updateUserRole(!userRole, auth.currentUser.uid)
                                setIsCustomer(!userRole)
                                setProfileMenu(!profileMenu)
                                setLoading(false)

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