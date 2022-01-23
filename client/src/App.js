import React, { useEffect, useState } from 'react';
import './App.css';
import { AuthContainer } from './components/AuthContainer';


function App() {
  const [authContextValue, setAuthContextValue] = useState("Log In")
  return (
    <React.Fragment>
      <header>
        <Logo />
        <HeaderBtn setAuthContextValue={setAuthContextValue} />
      </header>
      <section>
        <AuthContainer type={authContextValue} />
      </section>
    </React.Fragment>
  );
}

const Logo = () => {
  return (
    <div className="logo">
      <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" />
    </div>
  );
}

const HeaderBtn = ({ setAuthContextValue }) => {
  return (
    <div className="header-btn">
      <button className="header-btn-login" onClick={() => {
        const container = document.querySelector(".auth-container");
        setAuthContextValue("Log In")
      }}>Log In</button>
      <button className="header-btn-register" onClick={() => {
        setAuthContextValue("Sign Up")
      }}>Sign Up</button>
    </div>
  );
}

export default App;