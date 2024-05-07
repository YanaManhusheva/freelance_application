import React, { createContext, useContext } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import { CustomerContainer, SearchContainer } from "../components";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/projects/customers");

    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllCustomersContext = createContext();

const AllCustomers = () => {
  const { data } = useLoaderData();

  return (
    <AllCustomersContext.Provider value={{ data }}>
      <CustomerContainer />
    </AllCustomersContext.Provider>
  );
};

export const useAllCustomersContext = () => useContext(AllCustomersContext);
export default AllCustomers;
