import React from "react";
import { Link, Form } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);
import Wrapper from "../assets/wrappers/Task";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";

const Task = ({ task, manage, projectId }) => {
  const { title, description, deadline, taskStatus, estimatedTime, _id } = task;
  console.log(task);
  const date = day(deadline).format("MMM Do, YYYY");
  const statusClass = taskStatus.split(" ").join("");
  if (manage) {
    return (
      <Wrapper>
        <div className="header">Title </div>
        <div className="data">{title}</div>
        <div className="header">Description</div>
        <div className="data">{description}</div>
        <div className="header">Deadline</div>
        <div className="data">{date}</div>
        <div className="header">Task Status</div>
        <div className={`data status ${statusClass}`}>{taskStatus}</div>
        <div className="header">Needed Time</div>
        <div className="data">{`${estimatedTime}h`}</div>
        <footer className="actions">
          <Link
            to={`/dashboard/${projectId}/edit-task/${_id}`}
            className="btn edit-btn "
          >
            <MdOutlineEdit />
          </Link>

          <Form
            method="post"
            action={`/dashboard/${projectId}/delete-task/${_id}`}
          >
            <button type="submit" className="btn delete-btn danger-btn ">
              <MdDeleteOutline />
            </button>
          </Form>
        </footer>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="header">Title </div>
      <div className="data">{title}</div>
      <div className="header">Description</div>
      <div className="data">{description}</div>
      <div className="header">Deadline</div>
      <div className="data">{date}</div>
      <div className="header">Task Status</div>
      <div className={`data status ${statusClass}`}>{taskStatus}</div>
      <div className="header">Needed Time</div>
      <div className="data">{`${estimatedTime}h`}</div>
    </Wrapper>
  );
};

export default Task;
