import React from "react";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";
import {
  FaCheckCircle,
  FaClipboardCheck,
  FaPencilAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: "projects todo",
      count: defaultStats?.todo || 0,
      icon: <FaExclamationTriangle />,
      color: "#fda4a4",
      bcg: "#d52525",
    },
    {
      title: "projects in progress",
      count: defaultStats?.inProgress || 0,
      icon: <FaPencilAlt />,
      color: "#fedaa4",
      bcg: "#f09103",
    },
    {
      title: "projects done",
      count: defaultStats?.done || 0,
      icon: <FaCheckCircle />,
      color: "#c5feda",
      bcg: "#24dc67",
    },
  ];
  return (
    <Wrapper>
      {stats.map((statItem) => {
        return <StatItem key={statItem.title} {...statItem} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
