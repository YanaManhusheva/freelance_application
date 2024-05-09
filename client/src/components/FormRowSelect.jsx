import React from "react";

const FormRowSelect = ({
  name,
  labelText,
  list,
  defaultValue,
  customers,
  onChange,
  uniqueTags,
}) => {
  let options = list.map((item) => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    );
  });

  if (customers) {
    options = list.map((customer) => {
      return (
        <option key={customer._id} value={customer._id}>
          {customer.name + " " + customer.lastName}
        </option>
      );
    });
  }
  if (uniqueTags) {
    list = ["no tag", ...list];
    options = list.map((tag) => {
      return (
        <option key={tag} value={tag}>
          {tag}
        </option>
      );
    });
  }
  return (
    <div className={customers ? "form-row customers-select" : "form-row"}>
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {options}
      </select>
    </div>
  );
};

export default FormRowSelect;
