import React from "react";
import { FaBookOpen, FaBtc, FaCoins, FaCalendarAlt } from "react-icons/fa";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

import Wrapper from "../assets/wrappers/Customer";
import { Link, Form } from "react-router-dom";
import ProjectInfo from "./ProjectInfo";
day.extend(advancedFormat);

const Customer = ({ name, lastName, note, projects, _id }) => {
  //const date = day(deadline).format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <h5>{name}</h5>
        <p>{lastName}</p>
      </header>
      <div className="content">
        <div className="content-center">
          <ProjectInfo icon={<FaBookOpen />} text={note} />
          <div className="customer-projects">
            <h5>Projects Number:</h5>
            <p>{projects.length}</p>
          </div>
        </div>
        <footer className="actions">
          <Link to={`/dashboard/edit-customer/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Link to={`project-details/${_id}`} className="btn details-btn ">
            see details
          </Link>
          <Form method="post" action={`/dashboard/delete-customer/${_id}`}>
            <button type="submit" className="btn delete-btn danger-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Customer;
