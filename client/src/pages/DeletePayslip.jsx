import React from "react";
import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ params }) => {
  try {
    await customFetch.delete(
      `/projects/${params.id}/payslips/${params.payslipId}`
    );
    toast.success("Payslip deleted successfully");
    return redirect(`../project-details/${params.id}`);
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
