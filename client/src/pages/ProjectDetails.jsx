import React from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import {
  Form,
  redirect,
  useLoaderData,
  Link,
  useNavigate,
} from "react-router-dom";

import day from "dayjs";
import Wrapper from "../assets/wrappers/ProjectDetails";
import advancedFormat from "dayjs/plugin/advancedFormat";
import PayslipsContainer from "../components/PayslipsContainer";
import TasksContainer from "../components/TasksContainer";
day.extend(advancedFormat);

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/projects/${params.id}`);
    console.log(data);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect("");
  }
};

const ProjectDetails = () => {
  const { project, customer } = useLoaderData();
  const {
    title,
    description,
    deadline,
    projectStatus,
    sphere,
    budget,
    _id,
    payslips,
    tasks,
  } = project;
  const date = day(deadline).format("MMM Do, YYYY");
  const statusClass = projectStatus.split(" ").join("");
  console.log(payslips);
  const totalAmountPayed = payslips.reduce(
    (acc, payslip) => acc + payslip.amount,
    0
  );

  const payedPercentage = (totalAmountPayed / budget) * 100;

  return (
    <Wrapper>
      <div className="details-section">
        <header>
          <div className="main-icon">{title.charAt(0)}</div>
          <div className="info">
            <h5>{title}</h5>
            <p>{description}</p>
          </div>
        </header>
        <div className="details-content">
          <div className="header">Status</div>
          <div className="header">Customer</div>
          <div className="header">Sphere</div>
          <div className="header">Deadline</div>
          <div className="header">Budget</div>
          <div className="header">Pay Status</div>
          <div className="header">Current tasks </div>

          <div className={`data status ${statusClass}`}>{projectStatus}</div>
          <div className="data">
            {customer.name} {customer.lastName}
          </div>
          <div className="data">{sphere}</div>
          <div className="data">{date}</div>
          <div className="data">${budget}</div>
          <div className="data">
            {payedPercentage > 100 ? `100%` : `${payedPercentage.toFixed(2)}%`}
          </div>
          <div className="data">{tasks.length}</div>
        </div>
      </div>
      <PayslipsContainer payslips={payslips} project={project} />
      <TasksContainer tasks={tasks} project={project} />
    </Wrapper>
  );
};

export default ProjectDetails;
