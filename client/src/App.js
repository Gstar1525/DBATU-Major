import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Logo, SearchAndProfile } from './components';
import { Dashboard, Login, Signup, BookSlots } from './screens';
import { useDispatch } from 'react-redux';
import { isLogged } from './actions/isLogged';
import { getAuth } from './api/auth';
import { onAuthStateChanged } from 'firebase/auth';
import LoadingOverlay from 'react-loading-overlay'
import './styles/App.css';
import Search from './screens/Search';

function App() {

  const [isCustomer, setIsCustomer] = useState(true);
  const authUser = useSelector(state => state.userReducer)
  const loading = useSelector(state => state.loadingReducer)
  const dispatch = useDispatch();
  LoadingOverlay.propTypes = undefined


  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      dispatch(isLogged(user))
    })
  }, [authUser]);

  return (
    <LoadingOverlay
      active={loading}
      spinner={true}
      text="Loading..."
      styles={{ content: "" }}
    >
      <React.Fragment>
        <header>
            <Logo/>
          {
            authUser
              ? <SearchAndProfile isCustomer={isCustomer} setIsCustomer={setIsCustomer} />
              : ""
          }
        </header>
        <Routes>
          <Route path="/u/:uid" element={<BookSlots />} />
          <Route path='/search' element={<Search />} />
          {ProtectedRoute(!authUser, "/", <Login />, "/dashboard")}
          {ProtectedRoute(!authUser, "/signup", <Signup />, "/dashboard")}
          {ProtectedRoute(authUser, "/dashboard", <Dashboard isCustomer={isCustomer} setIsCustomer={setIsCustomer} />, "/")}
        </Routes>
      </React.Fragment></LoadingOverlay>
  );
}

const ProtectedRoute = (protector, path, component, to) => {
  return (
    <Route path={path} element={
      protector ? component : <Navigate to={to} replace={true} />
    } />
  )
}

export default App;