import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";

const Register = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" defaultValue="Yana" />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          defaultValue="Manhusheva"
        />
        <FormRow type="email" name="email" defaultValue="yana@gmail.com" />
        <FormRow type="password" name="password" defaultValue="secret123" />
        <div className="btn-container">
          <button type="submit" className="btn btn-block">
            submit
          </button>
        </div>
        <div className="action-container">
          <p>Already have an account?</p>
          <Link to="/login" className="member-btn">
            Log in!
          </Link>
        </div>
      </form>
    </Wrapper>
  );
};

export default Register;
