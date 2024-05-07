import React from "react";

import Project from "./Project";

import { useAllProjectsContext } from "../pages/AllProjects";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/ProjectsContainer";

const ProjectContainer = () => {
  const { data } = useAllProjectsContext();
  const { projects } = data;

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
      <div className="projects">
        {projects.map((project) => {
          return <Project key={project._id} {...project} />;
        })}
      </div>
    </Wrapper>
  );
};

export default ProjectContainer;
