import React from "react";
import Wrapper from "../assets/wrappers/ProjectInfo";

const ProjectInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="project-icon">{icon}</span>
      <span className="project-text">{text}</span>
    </Wrapper>
  );
};

export default ProjectInfo;
