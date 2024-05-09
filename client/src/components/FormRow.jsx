import React from "react";

const FormRow = ({
  type,
  name,
  labelText,
  defaultValue,
  onChange,
  className,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className={className ? `form-input ${className}` : "form-input"}
        defaultValue={defaultValue || ""}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default FormRow;
