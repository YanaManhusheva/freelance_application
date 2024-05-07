import React from "react";

import Project from "./Project";

import { useAllProjectsContext } from "../pages/AllProjects";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/ProjectsContainer";
import PageBthContainer from "./PageBthContainer";

const ProjectContainer = () => {
  const { data } = useAllProjectsContext();
  console.log(data);
  const { projects, totalProjects, numOfPages } = data;

  const navigate = useNavigate();
  if (projects.length === 0) {
    return (
      <Wrapper>
        <h2>No projects yet.. </h2>
        <button
          type="button"
          className="btn add-btn"
          onClick={() => navigate("add-project")}
        >
          create new one
        </button>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalProjects} project{projects.length > 1 && "s"} found
      </h5>
      <div className="projects">
        {projects.map((project) => {
          return <Project key={project._id} {...project} />;
        })}
      </div>
      {numOfPages > 1 && <PageBthContainer />}
    </Wrapper>
  );
};

export default ProjectContainer;
