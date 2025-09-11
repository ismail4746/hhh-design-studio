// app/about/page.jsx
"use client"; // Agar hooks ya state use kar rahe ho

import React from "react";
import HeroAbout from "./components/HeroAbout";
import Aboutstore from "./components/Aboutstore";
import Ceo from "./components/Ceo";
import AboutEx from "./components/AboutEx";
import Why from "./components/Why";

export default function about() {
  return (
    <>
    <HeroAbout/>
    <Aboutstore/>
    <Ceo/>
    <AboutEx/>
    <Why/>
    </>
  );
}
