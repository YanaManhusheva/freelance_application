import React from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../components";
import { STATUS } from "../../../utils/constants";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/projects/${params.id}`);
    console.log(data);
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
    await customFetch.patch(`/projects/${params.id}`, data);
    toast.success("Project modified successfully");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const EditProject = () => {
  const { project, customer } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const date = day(project.deadline).format("YYYY-MM-DD");

  console.log(project);
  console.log(customer);
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit Project</h4>
        <div className="form-center">
          <FormRow type="text" name="title" defaultValue={project.title} />
          <FormRow
            type="text"
            name="description"
            defaultValue={project.description}
          />
          <FormRow type="text" name="sphere" defaultValue={project.sphere} />
          <FormRow type="number" name="budget" defaultValue={project.budget} />
          <FormRow type="date" name="deadline" defaultValue={date} />
          <FormRowSelect
            name="projectStatus"
            labelText="project status"
            defaultValue={project.projectStatus}
            list={Object.values(STATUS)}
          />
        </div>
        <h4 className="customer-title form-title">Edit customer</h4>
        <div className="form-center customer-form">
          <FormRow
            type="text"
            name="customerName"
            labelText="name"
            defaultValue={customer.name}
          />
          <FormRow
            type="text"
            name="customerLastName"
            labelText="last name"
            defaultValue={customer.lastName}
          />
          <FormRow
            type="text"
            name="customerNote"
            labelText="note"
            defaultValue={customer.note}
          />

          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditProject;
