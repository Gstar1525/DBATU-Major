import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <div className="logo">
            <Link to="/dashboard">
                <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" />
            </Link>
        </div>
    );
}

export default Logo;