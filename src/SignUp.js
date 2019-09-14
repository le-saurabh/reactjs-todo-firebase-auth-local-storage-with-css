import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./base";
import "./SignUp.css";
import BodyBackgroundColor from "react-body-backgroundcolor";
import bg from "./login.png"
// import bg2 from "./app.jpg"

var sectionStyle = {
  width: "100%",
  height: "800px",
  backgroundImage: `url(${bg})`
};

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <div className='SignUp'>
      <img className='bg' src={bg} />
      <form className="SignUp_form_css" onSubmit={handleSignUp}>
          <input name="email" type="email" placeholder="Email" size="40" />
          <br/>
          <br/>
          <input name="password" type="password" placeholder="Password" size="40" />
          <br/>
          <br/>
          <button type="submit">Sign Up</button>
      </form>
      <form className="goto_login_form_css" action="http://localhost:3000/login">
        <button>Go To Log In</button>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
