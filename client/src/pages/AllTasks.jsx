import React, { createContext, useContext } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import { ProjectContainer, SearchContainer } from "../components";
import TasksContainer from "../components/TasksContainer";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/projects/${params.id}`);

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect("");
  }
};

const AllTasksContext = createContext();

const AllTasks = () => {
  const { project } = useLoaderData();
  const { tasks } = project;

  return (
    <AllTasksContext.Provider value={{ tasks, project }}>
      {/* <SearchContainer /> */}
      <TasksContainer tasks={tasks} project={project} manage />
    </AllTasksContext.Provider>
  );
};

export const useAllTasksContext = () => useContext(AllTasksContext);
export default AllTasks;
