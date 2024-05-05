import React from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(
      `/projects/customers/${params.customerId}`
    );
    console.log(data);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect("/dashboard/all-customers");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/projects/customers/${params.customerId}`, data);
    toast.success("Customer modified successfully");
    return redirect("/dashboard/all-customers");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const EditCustomer = () => {
  const { customer } = useLoaderData();
  const { name, lastName, note } = customer;

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit Customer</h4>
        <div className="form-center">
          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow
            type="text"
            name="lastName"
            defaultValue={lastName}
            labelText="last name"
          />
          <FormRow type="text" name="note" defaultValue={note} />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditCustomer;
