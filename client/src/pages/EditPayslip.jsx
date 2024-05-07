import React from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(
      `/projects/${params.id}/payslips/${params.payslipId}`
    );

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect("/dashboard");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(
      `/projects/${params.id}/payslips/${params.payslipId}`,
      data
    );
    toast.success("Payslip modified successfully");
    return redirect(`../project-details/${params.id}`);
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const EditPayslip = () => {
  const { payslip } = useLoaderData();

  const date = day(payslip.date).format("YYYY-MM-DD");

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit Payslip</h4>
        <div className="form-center">
          <FormRow type="date" name="date" defaultValue={date} />
          <FormRow type="number" name="amount" defaultValue={payslip.amount} />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditPayslip;
