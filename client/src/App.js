import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate, Link } from 'react-router-dom';
import { Logo, SearchAndProfile } from './components';
import { Dashboard, Login, Signup, BookSlots, UpdateSlot } from './screens';
import { useDispatch } from 'react-redux';
import { isLogged } from './actions/isLogged';
import { getAuth } from './api/auth';
import { onAuthStateChanged } from 'firebase/auth';
import Search from './screens/Search';

function App() {

  const authUser = useSelector(state => state.userReducer)
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      dispatch(isLogged(user))
    })
  }, [authUser]);

  const [isCustomer, setIsCustomer] = useState(true);

  return (
    <React.Fragment>
      <header>
        <Logo />
        {authUser ?
          <SearchAndProfile isCustomer={isCustomer} setIsCustomer={setIsCustomer} /> : ""}
      </header>
      <Routes>
        <Route path="/" element={authUser
          ? <Navigate to="/dashboard" replace={true} />
          : <Login />}
        />

        <Route path='/search' element={<Search />} />

        <Route path="/signup" element={authUser
          ? <Navigate to="/dashboard" replace={true} />
          : <Signup />}
        />

        <Route path="/dashboard" element={authUser
          ? <Dashboard isCustomer={isCustomer} setIsCustomer={setIsCustomer} />
          : <Navigate to="/" replace={true} />}
        />

        <Route path="/u/:uid"
          element={<BookSlots />}
        />

        <Route path="/updateSlot"
          element={<UpdateSlot />}
        />
      </Routes>
    </React.Fragment>
  );
}

export default App;