import React, { createContext, useContext, useState } from "react";

import { Outlet } from "react-router-dom";
import { SmallSidebar, BigSidebar, Navbar } from "../components";
import Wrapper from "../assets/wrappers/Dashboard";
import { checkDefaultTheme } from "../App";

const DashboardContext = createContext({
  user: "",
  showSidebar: false,
  isDarkTheme: false,
  toggleDarkTheme: () => {},
  toggleSideBar: () => {},
  logoutUser: () => {},
});

const DashboardLayout = ({ isDarkThemeEnabled }) => {
  const user = { name: "yana" };
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("dark-theme", newDarkTheme);
  };
  const toggleSideBar = () => {
    setShowSidebar(!showSidebar);
  };
  const logoutUser = async () => {
    console.log("logout");
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSideBar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
