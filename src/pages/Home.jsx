import { Helmet } from "react-helmet-async";
import Hero from "../components/others/Hero";
import PopularServices from "../components/others/PopularServices";
import FeaturedServices from "../components/others/FeaturedService";
import HowItWork from "../components/others/HowItWork";
import Testimonials from "../components/others/Testimonials";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const Home = () => {
  useEffect(()=>{
    AOS.init({
      duration: 1000,
    })
  },[])
  return (
    <div>
      <Helmet>
        <title>Home - TaskBros | Service Sharing Platform</title>
      </Helmet>
      {/* hero section */}
      <Hero />
      {/* Popular services section */}
      <PopularServices />
      {/* featured services */}
      <FeaturedServices />
      {/* Testimonial */}
      <Testimonials />
      {/* how it Works */}
      <HowItWork />
    </div>
  );
};

export default Home;
