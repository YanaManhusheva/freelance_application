import React from "react";

import { MdOutlineQueryStats } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoPeopleOutline } from "react-icons/io5";
import { FaDesktop } from "react-icons/fa";
import { RiFolderAddLine } from "react-icons/ri";

const links = [
  {
    text: "projects",
    path: ".",
    icon: <FaDesktop />,
  },
  {
    text: "add project",
    path: "add-project",
    icon: <RiFolderAddLine />,
  },
  {
    text: "customers",
    path: "all-customers",
    icon: <IoPeopleOutline />,
  },
  {
    text: "stats",
    path: "stats",
    icon: <MdOutlineQueryStats />,
  },
  {
    text: "profile",
    path: "profile",
    icon: <CgProfile />,
  },
];

export default links;
