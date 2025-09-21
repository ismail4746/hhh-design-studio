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
import Meta from "./components/Meta/Meta";

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
                <Meta
                  title="HHH Design Studio — Home"
                  description="HHH Design Studio — Architecture, interior design, and project management. We design modern, sustainable spaces tailored to your vision."
                  keywords="architecture, interior design, design studio, HHH Design Studio"
                  url="https://hhhdesignstudio.com/"
                  image="https://hhhdesignstudio.com/src/assets/abouthero.jpg"
                />
                <Hero />
                <Store/>
                <Project />
                <Blog/>
              
              </>
            }
        />

        {/* Portfolio Page */}
        <Route
          path="/portfolio"
          element={
            <>
              <Meta
                title="Portfolio — HHH Design Studio"
                description="Our portfolio showcases residential and commercial projects highlighting our design philosophy and expertise."
                keywords="portfolio, architecture projects, design portfolio, HHH"
                url="https://hhhdesignstudio.com/portfolio"
                image="https://hhhdesignstudio.com/src/assets/architecture1.jpg"
              />
              <Portfolio />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Meta
                title="About — HHH Design Studio"
                description="Learn about HHH Design Studio: our team, approach, and commitment to sustainable, client-driven design."
                keywords="about, team, HHH Design Studio, sustainable design"
                url="https://hhhdesignstudio.com/about"
                image="https://hhhdesignstudio.com/src/assets/azeemCeo1.jpg"
              />
              <About/>
            </>
          }
        />
        <Route
          path="/contactDetails"
          element={
            <>
              <Meta
                title="Contact — HHH Design Studio"
                description="Get in touch with HHH Design Studio for consultations, project inquiries, and collaboration opportunities."
                keywords="contact, inquiries, HHH Design Studio, consultations"
                url="https://hhhdesignstudio.com/contact"
                image="https://hhhdesignstudio.com/src/assets/about.jpg"
              />
              <ContactDetails/>
            </>
          }
        />
        <Route
          path="/project"
          element={
            <>
              <Meta
                title="Project — HHH Design Studio"
                description="Project highlights and case studies by HHH Design Studio. Explore our detailed project pages for design insights."
                keywords="project, case study, architecture, HHH"
                url="https://hhhdesignstudio.com/project"
                image="https://hhhdesignstudio.com/src/assets/architecture3.jpg"
              />
              <Projectsmain/>
            </>
          }
        />
        <Route
          path="/services"
          element={
            <>
              <Meta
                title="Services — HHH Design Studio"
                description="Our services include architectural design, interior design, project management, and consultancy for residential and commercial projects."
                keywords="services, architectural design, interior design, project management"
                url="https://hhhdesignstudio.com/services"
                image="https://hhhdesignstudio.com/src/assets/architecture2.jpg"
              />
              <ServicesMain/>
            </>
          }
        />

      </Routes>
      <Footer/>
    </>
  );
}
