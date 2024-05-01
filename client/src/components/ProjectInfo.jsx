import React from "react";
import Wrapper from "../assets/wrappers/ProjectInfo";

const ProjectInfo = ({ icon, text, header }) => {
  return (
    <Wrapper>
      <span className="project-icon">{icon}</span>
      <span className={header ? "project-text header-text" : "project-text"}>
        {text}
      </span>
    </Wrapper>
  );
};

export default ProjectInfo;
