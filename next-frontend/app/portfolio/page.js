"use client";

import Pabout from "./components/Pabout";
import Phero from "./components/Phero";
import PProjects from "./components/Pprojects";
import PServices from "./components/Pservices";
import Pteam from "./components/Pteam";


export default function portfolio() {
  return (
    <>
    <Phero/>
    <Pabout/>
    <PProjects/>
    <PServices/>
    <Pteam/>
    </>
  );
}