import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import Portfolio from "./components/portfolio/Portfolio";
import Blog from "./components/blog/Blog";
import Project from "./components/projects/Project";
import Store from "./components/store/Store";
import ContactDetails from "./components/contact/ContactDetails";
import ProjectDetails from "./components/ProjectsDetails/ProjectsDetails";
import Footer from "./components/Footer/Footer";
import Projectsmain from "./components/ProjectsDetails/Projectsmain";
import ServicesMain from "./components/services/ServicesMain";

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
              
            </>
          }
        />

        {/* Portfolio Page */}
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contactDetails" element={<ContactDetails/>} />
        <Route path="/project" element={<Projectsmain/>} />
        <Route path="/services" element={<ServicesMain/>} />

      </Routes>
      <Footer/>
    </>
  );
}
