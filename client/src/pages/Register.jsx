import React from "react";
import { Form, redirect, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("registration successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" defaultValue="Yana" />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          defaultValue="Manhusheva"
        />
        <FormRow type="email" name="email" defaultValue="yana12@gmail.com" />
        <FormRow type="password" name="password" defaultValue="secret123" />
        <div className="btn-container">
          <SubmitBtn />
        </div>
        <div className="action-container">
          <p>Already have an account?</p>
          <Link to="/login" className="member-btn">
            Log in!
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Register;
