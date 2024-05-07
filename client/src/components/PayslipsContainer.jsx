import React from "react";
import { Link } from "react-router-dom";
import Payslip from "../components/Payslip";

const PayslipsContainer = ({ project, payslips }) => {
  payslips.sort((a, b) => {
    return new Date(b.date) - new Date(a.date); // Descending order
  });
  return (
    <div className="payslips-section">
      <div className="section-header">
        <h4 className="section-text">All payslips </h4>
        <Link
          to={`/dashboard/${project._id}/payslips`}
          type="button"
          className="btn add-btn"
        >
          create payslip
        </Link>
      </div>
      <div className="payslips">
        {payslips.map((payslip, index) => {
          return (
            <Payslip
              key={payslip._id}
              payslip={payslip}
              index={index}
              projectId={project._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PayslipsContainer;
