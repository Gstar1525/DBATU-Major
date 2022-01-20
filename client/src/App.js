import { useEffect, useState } from 'react';
import { fetchData } from "./api"
import './App.css';

function App() {
  const routes = [
    "/auth/login",
    "/auth/signup",
    "/home/dashboard",
    "/home/settings",
    "/home/settings/profile",
  ]

  const [message, setMessage] = useState("Token");
  return (
    <div className="container">
      <header>{message}</header>
      <div className="tabs">
        {
          routes.map((route) => (
            <div key={route} className='btn' onClick={
              async () => {
                const json = await fetchData(route);
                setMessage(json.message)
              }
            }>{route}</div>
          ))
        }
      </div>

    </div>
  );
}

export default App;
