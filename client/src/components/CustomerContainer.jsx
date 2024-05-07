import React from "react";

import Customer from "./Customer";

import { useAllCustomersContext } from "../pages/AllCustomers";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/ProjectsContainer";

const CustomerContainer = () => {
  const { data } = useAllCustomersContext();
  const { customers } = data;

  const navigate = useNavigate();
  if (customers.length === 0) {
    return (
      <Wrapper>
        <h2>No customers yet.. </h2>
        <button
          type="button"
          className="btn add-btn"
          onClick={() => navigate("/dashboard/add-project")}
        >
          create new one
        </button>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="projects">
        {customers.map((project) => {
          return <Customer key={project._id} {...project} />;
        })}
      </div>
    </Wrapper>
  );
};

export default CustomerContainer;
