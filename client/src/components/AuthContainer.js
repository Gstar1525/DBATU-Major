import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { isLogged } from "../actions/isLogged";
import { getAuth, login, authWithGoogle, signup } from "../api/auth";
import "../styles/AuthContainer-style.css"

const AuthContainer = ({ type }) => {
  const isSignupContainer = type === "Sign Up";
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)


  const authUser = async (event) => {
    setLoading(true)
    const success = isSignupContainer ? await signup(event) : await login(event);
    onAuthStateChanged(getAuth(), (user) => {
      dispatch(isLogged(user));
    });
  }

  const getConfirmPasswordInput = () => {
    if (isSignupContainer) {
      return <>
        <input required name="confirmPassword" type="password" placeholder="Confirm Password" />
        <input required name="displayName" type="text" placeholder="Display Name" />
      </>
    } else {
      return <></>
    }
  }

  const getAuthLinks = () => {
    if (isSignupContainer) {
      return <> Already have account  <Link to="/">Log In</Link> </>
    } else {
      return <> Don't have account ? <Link to="/signup">Sign Up</Link> </>
    }
  }


  return (
    <LoadingOverlay
      active={loading}
      spinner={true}
      text='Loading...'
      className="loadingContain"
    >
      <div className="auth-container">
        <p className="auth-container-title">{type.toUpperCase()}</p>
        <form onSubmit={
          async (event) => {
            await authUser(event);
          }
        }>
          <div className="input-auth-container">
            <input required type="email" name="email" placeholder="Email" />
            <input required type="password" name="password" placeholder="Password" />
            {getConfirmPasswordInput()}
            <button type="submit" value="Login" >{type}</button>
          </div>
        </form>
        <p>
          <b>or</b>
        </p>
        <button
          style={{ width: "fit-content", paddingInline: "20px" }}
          onClick={() => { authWithGoogle(isSignupContainer) }} type="submit" value="Google" >{isSignupContainer ? "Sign up with Google" : "Log in with Google"}
        </button>
        <p className="auth-link"> {getAuthLinks()} </p>
      </div>
    </LoadingOverlay>
  );
}

export default AuthContainer;