import React from "react";
import { FaBookOpen, FaBtc, FaCoins, FaCalendarAlt } from "react-icons/fa";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Wrapper from "../assets/wrappers/Project";
import { Link, Form } from "react-router-dom";
import ProjectInfo from "./ProjectInfo";
day.extend(advancedFormat);

const Project = ({
  title,
  description,
  deadline,
  projectStatus,
  sphere,
  budget,
  _id,
}) => {
  const date = day(deadline).format("MMM Do, YYYY");
  const statusClass = projectStatus.split(" ").join("");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{title.charAt(0)}</div>
        <div className="info">
          <h5>{title}</h5>
          <p>{description}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <ProjectInfo icon={<FaBookOpen />} text={sphere} />
          <ProjectInfo icon={<FaCalendarAlt />} text={date} />
          <ProjectInfo icon={<FaCoins />} text={budget} />
          <div className={`status ${statusClass}`}>{projectStatus}</div>
        </div>
        <footer className="actions">
          <Link to={`/dashboard/edit-project/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Link
            to={`/dashboard/project-details/${_id}`}
            className="btn details-btn "
          >
            see details
          </Link>
          <Form method="post" action={`/dashboard/delete-project/${_id}`}>
            <button type="submit" className="btn delete-btn danger-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Project;
