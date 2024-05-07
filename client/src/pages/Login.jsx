import React from "react";
import { Form, Link, redirect, useNavigation } from "react-router-dom";

import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successful");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" defaultValue="yana@gmail.com" />
        <FormRow type="password" name="password" defaultValue="secret123" />
        <div className="btn-container">
          <SubmitBtn />
        </div>
        <div className="action-container">
          <p>Don`t have an account yet?</p>
          <Link to="/register" className="member-btn">
            Create new now!
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Login;
