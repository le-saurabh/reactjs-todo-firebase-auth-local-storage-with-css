import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js";
import "./Login.css"
import bg from "./login.png"

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className='Login'>
    <img className='bg' src={bg} />
      <div>
      <form className="login_form_css" onSubmit={handleLogin}>
      <input name="email" type="email" placeholder="Email" size="40"/>
      <br/>
      <br/>
      <input name="password" type="password" placeholder="Password" size="40"/>
      <br/>
      <br/>
      <button class="btn" type="submit">Log In</button>
      </form>
      </div>
      <form class="new_account_form_css"action="http://localhost:3000/signup">
        <button>Create A New Account</button> 
      </form>
    </div>
  );
};

export default withRouter(Login);
