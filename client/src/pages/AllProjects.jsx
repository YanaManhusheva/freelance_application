import React, { createContext, useContext } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import { ProjectContainer, SearchContainer } from "../components";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/projects");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllProjectsContext = createContext();

const AllProjects = () => {
  const { data } = useLoaderData();

  return (
    <AllProjectsContext.Provider value={{ data }}>
      <SearchContainer />
      <ProjectContainer />
    </AllProjectsContext.Provider>
  );
};

export const useAllProjectsContext = () => useContext(AllProjectsContext);
export default AllProjects;
