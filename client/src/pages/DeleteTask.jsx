import React from "react";
import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ params }) => {
  try {
    await customFetch.delete(`/projects/${params.id}/tasks/${params.taskId}`);
    toast.success("Task deleted successfully");
    return redirect(`../${params.id}/tasks`);
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
