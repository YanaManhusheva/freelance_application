import React, { useState } from "react";
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
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post(`projects/${params.id}/tasks`, data);
    toast.success("Task added successfully");
    return redirect(`../project-details/${params.id}`);
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

export const loader = async ({ params }) => {
  console.log(params.id);
  try {
    const { data } = await customFetch.get(`/projects/${params.id}/taskTags`);
    console.log(data);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect("/dashboard");
  }
};

const AddTask = () => {
  const { uniqueTags } = useLoaderData();
  const [createNewTag, setCreateNewTag] = useState(false);

  console.log(uniqueTags);
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
        <h4 className="customer-title form-title">add tag</h4>
        <div className="form-center tag-form">
          {uniqueTags && Object.values(uniqueTags).length > 0 && (
            <FormRowSelect
              name="tag"
              uniqueTags
              list={uniqueTags}
              labelText="Existing tags"
            />
          )}
          <div className="form-check">
            <input
              type="checkbox"
              id="new-tag-check"
              checked={createNewTag}
              onChange={(e) => setCreateNewTag(e.target.checked)}
              className="form-check-input"
            />
            <label htmlFor="new-tag-check" className="form-check-label">
              Create a new tag
            </label>
          </div>
          {createNewTag && <FormRow type="text" name="tag" labelText="tag" />}
        </div>
        <SubmitBtn formBtn />
      </Form>
    </Wrapper>
  );
};

export default AddTask;
