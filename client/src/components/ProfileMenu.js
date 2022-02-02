import React, { useState } from "react";
import "../styles/ProfileMenu-style.css"

const ProfileMenu = () => {

    const [profileMenu, setProfileMenu] = useState(false);

    return (
        <React.Fragment>
            < div className="profile-menu" >
                <div className="img" onClick={() => { setProfileMenu(!profileMenu) }}>
                    <img src={`${process.env.PUBLIC_URL}/user-profile.png`} alt="user profile icon" />
                </div>
                {
                    profileMenu
                        ? <div className="list">
                            <div className="list-item">Profile</div>
                            <div className="list-item">Setting</div>
                            <div className="list-item">Logout</div>
                        </div>
                        : null
                }
            </div>
        </React.Fragment>
    );
}

export default ProfileMenu;