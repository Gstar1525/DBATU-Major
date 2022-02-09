import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Logo } from './components';
import { Dashboard, Login, Signup } from './screens';
import { useDispatch } from 'react-redux';
import { isLogged } from './actions/isLogged';
import { getAuth } from './api/auth';
import { onAuthStateChanged } from 'firebase/auth';
import ProfileMenu from './components/ProfileMenu';
import { readUserRole } from './api/users';

function App() {

  const authUser = useSelector(state => state.userReducer)
  const dispatch = useDispatch();

  // TODO : get User Role state from firebase  
  const [isCustomer, setIsCustomer] = useState();

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      dispatch(isLogged(user))
    })
  }, [authUser]);

  return (
    <React.Fragment>
      <header>
        <Logo />
        {authUser ? <ProfileMenu isCustomer={isCustomer} setIsCustomer={setIsCustomer} /> : ""}
      </header>
      <Routes>
        <Route path="/" element={authUser
          ? <Navigate to="/dashboard" replace={true} />
          : <Login />}
        />

        <Route path="/signup" element={authUser
          ? <Navigate to="/dashboard" replace={true} />
          : <Signup />}
        />

        <Route path="/dashboard" element={authUser
          ? <Dashboard isCustomer={isCustomer} setIsCustomer={setIsCustomer} />
          : <Navigate to="/" replace={true} />}
        />
      </Routes>
    </React.Fragment>
  );
}

export default App;