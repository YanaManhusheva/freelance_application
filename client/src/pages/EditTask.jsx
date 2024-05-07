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

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(
      `/projects/${params.id}/tasks/${params.taskId}`
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
      `/projects/${params.id}/tasks/${params.taskId}`,
      data
    );
    toast.success("Task modified successfully");
    return redirect(`../${params.id}/tasks`);
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const EditTask = () => {
  const { task } = useLoaderData();

  const date = day(task.deadline).format("YYYY-MM-DD");

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit Task</h4>
        <div className="form-center">
          <FormRow type="text" name="title" defaultValue={task.title} />
          <FormRow
            type="text"
            name="description"
            defaultValue={task.description}
          />
          <FormRow type="date" name="deadline" defaultValue={date} />
          <FormRow
            type="number"
            name="estimatedTime"
            labelText="estimated time"
            defaultValue={task.estimatedTime}
          />
          <FormRowSelect
            name="taskStatus"
            labelText="task status"
            defaultValue={task.taskStatus}
            list={Object.values(STATUS)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditTask;
