import React from "react";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { Form, redirect, useLoaderData } from "react-router-dom";
import Project from "../components/Project";

import Wrapper from "../assets/wrappers/ProjectsContainer";

export const loader = async ({ params }) => {
  console.log(params);
  try {
    const { data } = await customFetch.get(
      `/projects/customers/${params.customerId}/details`
    );
    console.log(data);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect("/dashboard/all-customers");
  }
};

const CustomerDetailProjects = () => {
  const { projects } = useLoaderData();
  console.log(projects);
  return (
    <Wrapper>
      <h5>
        {projects.length} project{projects.length > 1 && "s"} found
      </h5>
      <div className="projects">
        {projects.map((project) => {
          return <Project key={project._id} {...project} />;
        })}
      </div>
    </Wrapper>
  );
};

export default CustomerDetailProjects;
