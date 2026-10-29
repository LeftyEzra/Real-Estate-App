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
  // Centralized filter state to hold search terms, status, property type, etc.
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    property_type: "",
    price__lte: "",
    bedrooms: "",
  });

  return (
    <>
      {/* Pass setFilters to Header if your navigation links filter listings */}
      <Header setFilters={setFilters} />

      <main id="main">
        {/* Pass filters & setFilters to Hero so the search form can update state */}
        <Hero filters={filters} setFilters={setFilters} />
        
        {/* Pass filters & setFilters to Listings so it fetches matching backend results */}
        <Listings filters={filters} setFilters={setFilters} />

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