
import React, { useEffect, useState } from "react";

export default function Hero({ filters, setFilters }) {
  const [totalCities, setCities] = useState([]);
  const [count, setCount] = useState([0]);
  const [totalStates, setStatesCount] = useState([]);
  const [latestProperty, setLatestProperty] = useState(null);
  
  // Local form inputs
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [propertyType, setPropertyType] = useState(filters.property_type || "");
  const [bedrooms, setBedrooms] = useState(filters.bedrooms || "");

  useEffect(() => {
    // 1. Fetch city stats for your hero text
    fetch("http://127.0.0.1:8000/cities/")
      .then((response) => response.json())
      .then((data) => {
        setCities(data.total_cities);
        setCount(data.count);
        setStatesCount(data.total_states);
      });

    // 2. Fetch the "just listed" property from your database
    fetch("http://127.0.0.1:8000/properties/?status=just%20listed")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setLatestProperty(data[0]); // Grabs the first matching property
        }
      })
      .catch((err) => console.error("Error fetching just listed property:", err));
  }, []);

  const handlePriceRangeChange = (e) => {
    const value = e.target.value;
    if (!value) {
      setFilters((prev) => ({ ...prev, price__gte: "", price__lte: "" }));
      return;
    }

    const [min, max] = value.split("-");
    setFilters((prev) => ({
      ...prev,
      price__gte: min || "",
      price__lte: max || "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      search: searchQuery,
      property_type: propertyType === "Any type" ? "" : propertyType,
      bedrooms: bedrooms === "Any" ? "" : bedrooms,
    }));
  };
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot"></span>Property, without the runaround</p>
          <h1 className="hero-title" id="hero-title">Find the place<br />you'll call<br /><em>your&nbsp;own&nbsp;acre.</em></h1>
          <p className="hero-lead">Search thousands of verified homes to buy or rent across {totalCities} cities in {totalStates} states.</p>

          <div className="hero-stats" data-counters>
            <div className="stat">
              <span className="stat-num">{totalCities}</span>
              <span className="stat-label">Live listings</span>
            </div>
            <div className="stat">
              <span className="stat-num">{totalStates}</span>
              <span className="stat-label">Cities</span>
            </div>
            <div className="stat">
              <span className="stat-num">340+</span>
              <span className="stat-label">Partner agents</span>
            </div>
            <div className="stat">
              <span className="stat-num">11</span>
              <span className="stat-label">Avg days to offer</span>
            </div>
          </div>
        </div>

        {/* Dynamic Hero Media & Just Listed Flag */}
        <div className="hero-media">
          <div className="media-frame">
            <img 
              src={latestProperty?.image || "/img/hero.jpg"} 
              alt={latestProperty?.title || "Featured property"} 
              width="720" 
              height="520" 
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop";
              }}
            />
          </div>
          <div className="price-flag" aria-hidden="true">
            <span className="price-flag-tag">Just listed</span>
            <strong className="price-flag-price">
              {latestProperty ? `₦${Number(latestProperty.price).toLocaleString()}` : "₦0"}
            </strong>
            <span className="price-flag-meta">
              {latestProperty ? `${latestProperty.title} · ${latestProperty.bedrooms} bd` : "Loading listing..."}
            </span>
          </div>
          <div className="verify-flag" aria-hidden="true">
            <svg className="ic" aria-hidden="true"><use href="#i-pin"></use></svg>
            <span>Every address verified</span>
          </div>
        </div>
      </div>

      <div className="wrap">
        <form className="searchbar" role="search" aria-label="Property search" onSubmit={handleSubmit}>
          <div className="search-tabs" role="tablist" aria-label="Search intent">
            <button 
              type="button" 
              className={`search-tab ${filters.status === "for sale" ? "is-active" : ""}`}
              onClick={() => setFilters(prev => ({ ...prev, status: prev.status === "for sale" ? "" : "for sale" }))}
            >
              Buy
            </button>
            <button 
              type="button" 
              className={`search-tab ${filters.status === "for rent" ? "is-active" : ""}`}
              onClick={() => setFilters(prev => ({ ...prev, status: prev.status === "for rent" ? "" : "for rent" }))}
            >
              Rent
            </button>
            <button 
              type="button" 
              className={`search-tab ${filters.status === "sold" ? "is-active" : ""}`}
              onClick={() => setFilters(prev => ({ ...prev, status: prev.status === "sold" ? "" : "sold" }))}
            >
              Sold
            </button>
            <button 
              type="button" 
              className={`search-tab ${filters.status === "just listed" ? "is-active" : ""}`}
              onClick={() => setFilters(prev => ({ ...prev, status: prev.status === "just listed" ? "" : "just listed" }))}
            >
              Just Listed
            </button>
          </div>

          <div className="search-fields">
            {/* Location Input */}
            <div className="field field--location">
              <label className="field-label" htmlFor="s-loc">Location</label>
              <div className="field-control">
                <svg className="ic field-ic" aria-hidden="true"><use href="#i-pin"></use></svg>
                <input 
                  className="field-input" 
                  id="s-loc" 
                  type="text" 
                  placeholder="City, neighbourhood or title" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Property Type Dropdown */}
            <div className="field">
              <label className="field-label" htmlFor="s-type">Property type</label>
              <div className="field-control select-wrap">
                <select 
                  className="field-input" 
                  id="s-type"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value="">Any type</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="land">Land</option>
                  <option value="shop">Shop</option>
                  <option value="hall">Hall</option>
                  <option value="commercial">Commercial</option>
                </select>
                <svg className="ic field-chevron" aria-hidden="true"><use href="#i-chevron"></use></svg>
              </div>
            </div>

            {/* Price Range Dropdown */}
            <div className="field">
              <label className="field-label" htmlFor="s-price">Price range</label>
              <div className="field-control select-wrap">
                <select 
                  className="field-input" 
                  id="s-price"
                  onChange={handlePriceRangeChange}
                >
                  <option value="">Any price</option>
                  <option value="500000-1000000">₦500k – ₦1M</option>
                  <option value="1000000-5000000">₦1M – ₦5M</option>
                  <option value="5000000-10000000">₦5M – ₦10M</option>
                  <option value="10000000-50000000">₦10M – ₦50M</option>
                  <option value="50000000-100000000">₦50M – ₦100M</option>
                  <option value="100000000-500000000">₦100M – ₦500M</option>
                  <option value="500000000-">Above ₦500M</option>
                </select>
                <svg className="ic field-chevron" aria-hidden="true"><use href="#i-chevron"></use></svg>
              </div>
            </div>

            {/* Beds Dropdown */}
            <div className="field field--beds">
              <label className="field-label" htmlFor="s-beds">Beds</label>
              <div className="field-control select-wrap">
                <select 
                  className="field-input" 
                  id="s-beds"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
                <svg className="ic field-chevron" aria-hidden="true"><use href="#i-chevron"></use></svg>
              </div>
            </div>

            <button className="search-submit" type="submit">
              <svg className="ic" aria-hidden="true"><use href="#i-search"></use></svg>
              <span>Search</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}




