import "./styles/authContainer-style.css" 

export const AuthContainer = (props) => {
  return (
    <div className="auth-container">
      <p>{props.type}</p>
      <form action="POST">
        <div className="input-auth-container">
          <input required type="email" placeholder="Email" />
          <input required type="password" placeholder="Password" />
          {
            (props.type === "Sign Up") ? <input required type="password" placeholder="Confirm Password" /> : <></>
          }
          <button type="submit" value="Login" >{props.type}</button>
        </div>
      </form>
    </div>
  );
}