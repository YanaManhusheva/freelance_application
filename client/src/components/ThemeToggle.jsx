import React from "react";
import { BsFillSunFill } from "react-icons/bs";
import { IoIosMoon } from "react-icons/io";
import Wrapper from "../assets/wrappers/ThemeToggle";
import { useDashboardContext } from "../pages/DashboardLayout";

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext();
  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <BsFillSunFill className="toggle-icon" />
      ) : (
        <IoIosMoon className="toggle-icon" />
      )}
    </Wrapper>
  );
};

export default ThemeToggle;
