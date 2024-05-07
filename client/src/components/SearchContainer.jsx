import React from "react";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, Link, useSubmit } from "react-router-dom";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import { STATUS, PROJECT_SORT_BY } from "../../../utils/constants";
import SubmitBtn from "./SubmitBtn";
import { useAllProjectsContext } from "../pages/AllProjects";

const SearchContainer = () => {
  const { searchValues } = useAllProjectsContext();
  const { search, projectStatus, sort } = searchValues;
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeOut;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        onChange(form);
      }, 1000);
    };
  };
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">Search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText="project status"
            name="projectStatus"
            list={["all", ...Object.values(STATUS)]}
            defaultValue={projectStatus}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            name="sort"
            list={[...Object.values(PROJECT_SORT_BY)]}
            defaultValue={sort}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <Link to="/dashboard" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
          {/* <SubmitBtn formBtn /> */}
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
