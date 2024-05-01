import React from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  DashboardLayout,
  Register,
  Login,
  Error,
  Profile,
  Stats,
  AllProjects,
  AllCustomers,
  AddProject,
  EditProject,
  ProjectDetails,
  AddPayslip,
  EditPayslip,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { action as addProjectAction } from "./pages/AddProject";
import { loader as getCustomersLoader } from "./pages/AddProject";
import { loader as allProjectsLoader } from "./pages/AllProjects";
import { loader as editProjectLoader } from "./pages/EditProject";
import { action as editProjectAction } from "./pages/EditProject";
import { action as deleteProjectAction } from "./pages/DeleteProject";
import { loader as getDetailsOnProjectLoader } from "./pages/ProjectDetails";
import { action as addPayslipAction } from "./pages/AddPayslip";
import { action as deletePayslipAction } from "./pages/DeletePayslip";
import { action as editPayslipAction } from "./pages/EditPayslip";
import { loader as editPayslipLoader } from "./pages/EditPayslip";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("dark-theme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AllProjects />,
            loader: allProjectsLoader,
          },
          {
            path: "add-project",
            element: <AddProject />,
            action: addProjectAction,
            loader: getCustomersLoader,
          },
          {
            path: "all-customers",
            element: <AllCustomers />,
          },
          {
            path: "stats",
            element: <Stats />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "edit-project/:id",
            element: <EditProject />,
            loader: editProjectLoader,
            action: editProjectAction,
          },
          {
            path: "project-details/:id",
            element: <ProjectDetails />,
            loader: getDetailsOnProjectLoader,
          },
          {
            path: "delete-project/:id",
            action: deleteProjectAction,
          },
          {
            path: ":id/payslips",
            element: <AddPayslip />,
            action: addPayslipAction,
          },
          {
            path: ":id/payslips/:payslipId",
            action: deletePayslipAction,
          },
          {
            path: ":id/edit-payslip/:payslipId",
            element: <EditPayslip />,
            loader: editPayslipLoader,
            action: editPayslipAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
