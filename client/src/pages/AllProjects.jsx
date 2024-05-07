import React, { createContext, useContext } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import { ProjectContainer, SearchContainer } from "../components";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const { data } = await customFetch.get("/projects", { params });
    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllProjectsContext = createContext();

const AllProjects = () => {
  const { data, searchValues } = useLoaderData();
  console.log(searchValues);

  return (
    <AllProjectsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <ProjectContainer />
    </AllProjectsContext.Provider>
  );
};

export const useAllProjectsContext = () => useContext(AllProjectsContext);
export default AllProjects;
