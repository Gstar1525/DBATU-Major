import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { isLogged } from "../actions/isLogged";
import { getAuth, login, signup } from "../api/auth";
import "../styles/AuthContainer-style.css"

const AuthContainer = ({ type }) => {
  const isSignupContainer = type === "Sign Up";
  const dispatch = useDispatch();

  return (
    <div className="auth-container">
      <p className="auth-container-title">{type.toUpperCase()}</p>
      <form onSubmit={isSignupContainer
        ? async (event) => {
          const success = await signup(event);
          onAuthStateChanged(getAuth(), (user) => {
            dispatch(isLogged(user));
          });
        }
        : async (event) => {
          const success = await login(event);
          onAuthStateChanged(getAuth(), (user) => {
            dispatch(isLogged(user));
          });
        }}>
        <div className="input-auth-container">
          <input required type="email" name="email" placeholder="Email" />
          <input required type="password" name="password" placeholder="Password" />
          {getConfirmPasswordInput(isSignupContainer)}
          <button type="submit" value="Login" >{type}</button>
        </div>
      </form>

      <p className="auth-link">
        {getAuthLinks(isSignupContainer)}
      </p>
    </div>
  );
}


const getConfirmPasswordInput = (isSignupContainer) => {
  if (isSignupContainer) {
    return <input required name="confirmPassword" type="password" placeholder="Confirm Password" />
  } else {
    return <></>
  }
}

const getAuthLinks = (isSignupContainer) => {
  if (isSignupContainer) {
    return <> Already have account  <Link to="/">Log In</Link> </>
  } else {
    return <> Don't have account ? <Link to="/signup">Sign Up</Link> </>
  }
}

export default AuthContainer;