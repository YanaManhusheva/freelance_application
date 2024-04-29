import React from "react";
import { FaBookOpen, FaBtc, FaCoins, FaCalendarAlt } from "react-icons/fa";
import { RiMoneyEuroBoxFill } from "react-icons/ri";

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
}) => {
  const date = day(deadline).format("MMM Do, YYYY");
  console.log(projectStatus);
  const statusClass = projectStatus.split(" ").join("");
  console.log(statusClass);
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
          <Link className="btn edit-btn">Edit</Link>
          <Form method="post">
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Project;
