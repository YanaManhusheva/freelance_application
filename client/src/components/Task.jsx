import React from "react";
import { Link, Form } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);
import Wrapper from "../assets/wrappers/Task";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import stringToColor from "../utils/stringToColor";

const Task = ({ task, manage, projectId }) => {
  const { title, description, deadline, taskStatus, estimatedTime, tag, _id } =
    task;
  console.log(tag);
  const date = day(deadline).format("MMM Do, YYYY");
  const statusClass = taskStatus.split(" ").join("");
  const groupColor = stringToColor(tag);
  console.log(groupColor);
  if (manage) {
    //manage all tasks
    return (
      <Wrapper color={groupColor}>
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
        <div className="header">Tag</div>
        <div className="data">{tag || "no tag"}</div>
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
      <div className="header">Tag</div>
      <div className="data">{tag || "no tag"}</div>
    </Wrapper>
  );
};

export default Task;
