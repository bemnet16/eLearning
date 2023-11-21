import React, { useRef } from "react";
import classes from "./login.module.css";
import { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import { useHistory } from "react-router-dom";
const Login = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      const res = await fetch("http://127.0.0.1:5000/student/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.status === 200) {
        auth.handleLogin(data);
        history.push("/");
      }
    } catch (err) {
      console.log("ERRoR", err);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.login__container}>
        <h3>Login Here</h3>
        <form onSubmit={handleSubmit}>
          <div className={classes.inp}>
            <h4 className={classes.label}>Email</h4>
            <input type="text" ref={emailRef} placeholder="" />
          </div>
          <div className={classes.inp}>
            <h4 className={classes.label}>Password</h4>
            <input type="text" ref={passwordRef} placeholder="" />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?<button>Register</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
