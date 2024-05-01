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
  } = project;
  const date = day(deadline).format("MMM Do, YYYY");
  const statusClass = projectStatus.split(" ").join("");
  console.log(payslips);
  const totalAmountPayed = payslips.reduce(
    (acc, payslip) => acc + payslip.amount,
    0
  );

  const payedPercentage = (totalAmountPayed / budget) * 100;
  const navigate = useNavigate();
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
          <div className="header">Budget</div>
          <div className="header">Pay Status</div>

          <div className={`data status ${statusClass}`}>{projectStatus}</div>
          <div className="data">
            {customer.name} {customer.lastName}
          </div>
          <div className="data">{sphere}</div>
          <div className="data">${budget}</div>
          <div className="data">
            {payedPercentage > 100 ? `100%` : `${payedPercentage.toFixed(2)}%`}
          </div>
        </div>
      </div>
      <PayslipsContainer payslips={payslips} project={project} />
    </Wrapper>
  );

  //   return (
  //     <Wrapper>
  //       <header>
  //         <div className="main-icon">{title.charAt(0)}</div>
  //         <div className="info">
  //           <h5>{title}</h5>
  //           <p>{description}</p>
  //         </div>
  //       </header>
  //       <div className="content">
  //         <div className="content-center">
  //           <ProjectInfo icon={<FaBookOpen />} text="Title" header />
  //           <div className="details-info">{title}</div>
  //           <ProjectInfo icon={<FaBookOpen />} text="Description" header />
  //           <div className="details-info">{description}</div>
  //           <ProjectInfo icon={<FaBookOpen />} text="Sphere" header />
  //           <div className="details-info">{sphere}</div>
  //           <ProjectInfo icon={<FaCoins />} text="Budget" header />
  //           <div className="details-info">{`${budget}$`}</div>
  //           <ProjectInfo icon={<FaBtc />} text="Payed" header />
  //           <div className="details-info">
  //             {payedPercentage > 100 ? `100%` : `${payedPercentage}%`}
  //           </div>
  //           <ProjectInfo icon={<FaCalendarAlt />} text="Deadline" header />
  //           <div className="details-info">{date}</div>

  //           <ProjectInfo icon={<FaCalendarAlt />} text="Customer" header />
  //           <div className="details-info">
  //             {customer.name + " " + customer.lastName}
  //           </div>
  //           <ProjectInfo icon={<FaCalendarAlt />} text="Status" header />
  //           <div className={`status ${statusClass}`}>{projectStatus}</div>
  //         </div>
  //         {/* <footer className="actions">
  //           <Link to={`edit-project/${_id}`} className="btn edit-btn">
  //             Edit
  //           </Link>
  //           <Link to={`project-details/${_id}`} className="btn details-btn ">
  //             see details
  //           </Link>
  //           <Form method="post" action={`delete-project/${_id}`}>
  //             <button type="submit" className="btn delete-btn danger-btn">
  //               Delete
  //             </button>
  //           </Form>
  //         </footer> */}
  //       </div>
  //     </Wrapper>
  //   );
};

export default ProjectDetails;
