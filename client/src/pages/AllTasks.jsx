import React, { createContext, useContext } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { Form, useLoaderData, useSubmit } from "react-router-dom";
import { FormRowSelect, SearchTasksContainer } from "../components";
import TasksContainer from "../components/TasksContainer";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const projectId = url.pathname.split("/")[2];
  const queryParameters = Object.fromEntries(url.searchParams.entries());
  console.log(projectId);
  try {
    const [projectData, tagsData, tasksData] = await Promise.all([
      customFetch.get(`/projects/${projectId}`),
      customFetch.get(`/projects/${projectId}/taskTags`),
      customFetch.get(`/projects/${projectId}/tasks`, {
        params: queryParameters,
      }),
    ]);
    return {
      project: projectData.data,
      uniqueTags: tagsData.data,
      filteredTasks: tasksData.data,
      searchValues: queryParameters, // this can be used to display or debug what filters are active
    };
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect(`/dashboard/${params.id}/tasks`);
  }
};

const AllTasksContext = createContext();

const AllTasks = () => {
  const { project, uniqueTags, filteredTasks, searchValues } = useLoaderData();

  console.log(searchValues);
  const tasksSorted = filteredTasks.tasks;
  console.log(tasksSorted);
  // const { tasks } = project.project;
  const tasks = tasksSorted;

  // const { project } = useLoaderData();
  // const { tasks } = project;
  // console.log(tasks);

  return (
    <AllTasksContext.Provider
      value={{ tasks, project, searchValues, uniqueTags }}
    >
      <SearchTasksContainer />

      <TasksContainer manage tasks={tasks} project={project.project} />
    </AllTasksContext.Provider>
  );
};

export const useAllTasksContext = () => useContext(AllTasksContext);
export default AllTasks;
