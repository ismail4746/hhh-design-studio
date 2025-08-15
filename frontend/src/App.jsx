import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero/>
      <About/>
    </>
  );
}
