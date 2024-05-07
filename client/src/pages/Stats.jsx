import React from "react";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { ChartsContainer, StatsContainer } from "../components";

export const loader = async () => {
  try {
    const response = await customFetch.get("/projects/stats");
    return response.data;
  } catch (error) {
    return error;
  }
};

const Stats = () => {
  const { defaultStats, monthlyIncome } = useLoaderData();
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyIncome?.length > 1 && <ChartsContainer data={monthlyIncome} />}
    </>
  );
};

export default Stats;
