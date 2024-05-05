import React, { useState } from "react";
import {
  Form,
  redirect,
  useNavigation,
  useOutletContext,
  useLoaderData,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import { STATUS } from "../../../utils/constants";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    await customFetch.post("/projects", data);
    toast.success("Project added successfully");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const loader = async () => {
  try {
    const { data } = await customFetch.get(`/projects/customers`);
    console.log(data);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect("/dashboard/add-project");
  }
};

const AddProject = () => {
  const { user } = useOutletContext();
  const { customers } = useLoaderData();
  const [createNewCustomer, setCreateNewCustomer] = useState(false);

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">create new project</h4>
        <div className="form-center">
          <FormRow type="text" name="title" />
          <FormRow type="text" name="description" />
          <FormRow type="text" name="sphere" />
          <FormRow type="number" name="budget" />
          <FormRow type="date" name="deadline" />
          <FormRowSelect
            labelText="project status"
            name="projectStatus"
            defaultValue={STATUS.TODO}
            list={Object.values(STATUS)}
          />
        </div>

        <h4 className="customer-title form-title">add customer</h4>
        <div className="form-center customer-form">
          {customers && Object.values(customers).length > 0 && (
            <FormRowSelect
              name="customerId"
              customers
              list={customers}
              defaultValue={customers[0]}
              labelText="Existing customers"
            />
          )}
          <div className="form-check">
            <input
              type="checkbox"
              id="new-customer-check"
              checked={createNewCustomer}
              onChange={(e) => setCreateNewCustomer(e.target.checked)}
              className="form-check-input"
            />
            <label htmlFor="new-customer-check" className="form-check-label">
              Create a new customer
            </label>
          </div>
          {createNewCustomer && (
            <>
              <FormRow type="text" name="customerName" labelText="name" />
              <FormRow
                type="text"
                name="customerLastName"
                labelText="last name"
              />
              <FormRow type="text" name="customerNote" labelText="note" />
            </>
          )}

          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddProject;
