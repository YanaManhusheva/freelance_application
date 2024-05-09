import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Task from "../components/Task";
import Wrapper from "../assets/wrappers/TaskContainer";
import { useAllTasksContext } from "../pages/AllTasks";

const TasksContainer = ({ manage, tasks, project }) => {
  const data = useAllTasksContext();
  console.log(data);
  // const { tasks, project } = data;
  const navigate = useNavigate();

  if (tasks.length === 0) {
    return (
      <div className="tasks-section">
        <div className="section-header">
          <h4 className="section-text">No tasks found </h4>
          <button
            type="button"
            className="btn add-btn"
            onClick={() => navigate(`/dashboard/${project._id}/add-task`)}
          >
            create new task
          </button>
        </div>
      </div>
    );
  }
  if (manage) {
    return (
      <Wrapper>
        <div className="tasks-section">
          <div className="section-header">
            <h4 className="section-text">All tasks </h4>
          </div>

          <div className="tasks">
            {tasks.map((task, index) => {
              return (
                <Task
                  task={task}
                  key={task._id}
                  projectId={project._id}
                  manage={manage}
                />
              );
            })}
          </div>
        </div>
      </Wrapper>
    );
  }
  return (
    <div className="tasks-section">
      <div className="section-header">
        <h4 className="section-text">All tasks </h4>
        <div className="actions">
          <Link
            to={`/dashboard/${project._id}/tasks`}
            type="button"
            className="btn add-btn btn-hipster"
          >
            manage all tasks
          </Link>
          <Link
            to={`/dashboard/${project._id}/add-task`}
            type="button"
            className="btn add-btn"
          >
            create task
          </Link>
        </div>
      </div>
      <div className="tasks">
        {tasks.map((task, index) => {
          return <Task task={task} key={task._id} index={index} />;
        })}
      </div>
    </div>
  );
};

export default TasksContainer;
