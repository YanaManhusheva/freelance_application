import React from "react";
import { FaBookOpen, FaBtc, FaCoins, FaCalendarAlt } from "react-icons/fa";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Wrapper from "../assets/wrappers/Payslip";
import { Link, Form } from "react-router-dom";
import ProjectInfo from "./ProjectInfo";
day.extend(advancedFormat);

const Payslip = ({ payslip, index, projectId }) => {
  const date = day(payslip.date).format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>{`Payslip №${index + 1}`} </header>
      <div className="content">
        <div className="content-center">
          <ProjectInfo icon={<FaCalendarAlt />} text={date} />
          <ProjectInfo icon={<FaCoins />} text={payslip.amount} />
        </div>
        <footer className="actions">
          <Link
            to={`/dashboard/${projectId}/edit-payslip/${payslip._id}`}
            className="btn edit-btn"
          >
            Edit
          </Link>

          <Form
            method="post"
            action={`/dashboard/${projectId}/payslips/${payslip._id}`}
          >
            <button type="submit" className="btn delete-btn danger-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Payslip;
