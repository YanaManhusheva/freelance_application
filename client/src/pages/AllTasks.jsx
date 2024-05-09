import React, { createContext, useContext } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { Form, useLoaderData, useSubmit } from "react-router-dom";
import {
  FormRowSelect,
  ProjectContainer,
  SearchContainer,
} from "../components";
import TasksContainer from "../components/TasksContainer";

export const loader = async ({ params }) => {
  console.log(params);
  try {
    const [projectData, tagsData] = await Promise.all([
      customFetch.get(`/projects/${params.id}`),
      customFetch.get(`/projects/${params.id}/taskTags`),
    ]);
    return {
      project: projectData.data,
      uniqueTags: tagsData.data,
    };
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect(`/dashboard/${params.id}/tasks`);
  }
  // try {
  //   const { data } = await customFetch.get(`/projects/${params.id}`);
  //   return data;
  // } catch (error) {
  //   toast.error(error?.response?.data?.message);
  //   return redirect("");
  // }
};

const AllTasksContext = createContext();

const AllTasks = () => {
  const { project, uniqueTags } = useLoaderData();
  console.log(project.project);
  const { tasks } = project.project;
  console.log(uniqueTags.uniqueTags);

  const submit = useSubmit();

  const tagDefaultValue = "no tag";
  // const { project } = useLoaderData();
  // const { tasks } = project;
  // console.log(tasks);

  return (
    <AllTasksContext.Provider value={{ tasks, project }}>
      {/* <SearchContainer /> */}
      <Form className="form">
        <h5 className="form-title">Tags form</h5>

        <FormRowSelect
          labelText="tag"
          name="tag"
          list={uniqueTags.uniqueTags}
          defaultValue={tagDefaultValue}
          onChange={(e) => {
            submit(e.currentTarget.form);
          }}
        />
      </Form>
      <TasksContainer manage tasks={tasks} project={project.project} />
    </AllTasksContext.Provider>
  );
};

export const useAllTasksContext = () => useContext(AllTasksContext);
export default AllTasks;
