import React, { useState } from "react";
import "../styles/ProfileMenu-style.css"

const ProfileMenu = () => {

    const [profileMenu, setProfileMenu] = useState(false);

    const profileOnClick = () => {
        console.log("Progile Clicked");
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
                            <div onClick={itemOnClick} className="list-item">Setting</div>
                            <div onClick={itemOnClick} className="list-item">Logout</div>
                        </div>
                        : null
                }
            </div>
        </React.Fragment>
    );

}


export default ProfileMenu;