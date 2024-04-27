import React from "react";
import { Link } from "react-router-dom";

import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";

const Login = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" defaultValue="yana@gmail.com" />
        <FormRow type="password" name="password" defaultValue="secret123" />
        <div className="btn-container">
          <button type="submit" className="btn btn-block">
            submit
          </button>
        </div>
        <div className="action-container">
          <p>Don`t have an account yet?</p>
          <Link to="/register" className="member-btn">
            Create new now!
          </Link>
        </div>
      </form>
    </Wrapper>
  );
};

export default Login;
