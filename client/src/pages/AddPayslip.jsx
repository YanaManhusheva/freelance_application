import React from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../components";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

export const action = async ({ request, params }) => {
  console.log(params);
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    await customFetch.post(`projects/${params.id}/payslips`, data);
    toast.success("Payslip added successfully");
    return redirect(`../project-details/${params.id}`);
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const AddPayslip = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add Payslip</h4>
        <div className="form-center">
          <FormRow type="date" name="date" />
          <FormRow type="number" name="amount" />
        </div>

        <button
          type="submit"
          className="btn btn-block form-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "submitting..." : "submit"}
        </button>
      </Form>
    </Wrapper>
  );
};

export default AddPayslip;
