import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import Portfolio from "./components/portfolio/Portfolio";
import Blog from "./components/blog/Blog";
import Project from "./components/projects/Project";
import Contact from "./components/contact/Contact";
import Store from "./components/store/Store";

// import { Contact } from "lucide-react";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Store/>
              <Project />
              <Blog/>
              <Contact />
              
            </>
          }
        />

        {/* Portfolio Page */}
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </>
  );
}
