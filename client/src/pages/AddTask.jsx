import React from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import { STATUS } from "../../../utils/constants";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

export const action = async ({ request, params }) => {
  console.log(params);
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    await customFetch.post(`projects/${params.id}/tasks`, data);
    toast.success("Task added successfully");
    return redirect(`../project-details/${params.id}`);
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const AddTask = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add Task</h4>
        <div className="form-center">
          <FormRow type="text" name="title" />
          <FormRow type="text" name="description" />
          <FormRow type="date" name="deadline" />
          <FormRow
            type="number"
            name="estimatedTime"
            labelText="Estimated time (hours)"
          />
          <FormRowSelect
            labelText="task status"
            name="taskStatus"
            defaultValue={STATUS.TODO}
            list={Object.values(STATUS)}
          />
        </div>

        <SubmitBtn formBtn />
      </Form>
    </Wrapper>
  );
};

export default AddTask;
