import { useState } from "react";


import Header from "./Header";
import Hero from "./Hero";
import Listings from "./Listings";
import Categories from "./Categories";
import Cities from "./Cities";
import WhyUs from "./WhyUs";
import HowItWorks from "./HowItWorks";
import TopAgents from "./TopAgents";
import Testimonials from "./Testimonials";
import CallToAction from "./CallToAction";
import Footer from "./Footer";
import BackToTop from "./BackToTop";



export default function App() {

  const [filter, setFilter] = useState("");

  return (
    <>
     

      <Header setFilter={setFilter}/>

      <main id="main">
        <Hero />
        <Listings filter={filter} setFilter={setFilter} />
        <Categories />
        <Cities />
        <WhyUs />
        <HowItWorks />
        <TopAgents />
        <Testimonials />
        <CallToAction />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}