const Logo = () => {
    return (
        <div className="logo">
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" />
        </div>
    );
}

export default Logo;