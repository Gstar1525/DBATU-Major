import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate, Link } from 'react-router-dom';
import { Logo } from './components';
import { Dashboard, Login, Signup, BookSlots } from './screens';
import { useDispatch } from 'react-redux';
import { isLogged } from './actions/isLogged';
import { getAuth } from './api/auth';
import { onAuthStateChanged } from 'firebase/auth';
import ProfileMenu from './components/ProfileMenu';
import { readUserRole } from './api/users';
import { auth } from './api/firebase-service';
import Search from './screens/Search';

function App() {

  const authUser = useSelector(state => state.userReducer)
  const dispatch = useDispatch();

  // TODO : get User Role state from firebase  

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
          element={<BookSlots isCustomer={isCustomer} setIsCustomer={setIsCustomer} />}
        />
      </Routes>
    </React.Fragment>
  );
}

function SearchAndProfile({ isCustomer, setIsCustomer }) {
  return (
    <div className="search-profile-container">
      <div className="search-profile">
        <Link to="/search"><button>
          Search
        </button></Link>
        <ProfileMenu isCustomer={isCustomer} setIsCustomer={setIsCustomer} />
      </div>
    </div>
  )
}

export default App;