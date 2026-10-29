import React, { useEffect, useState } from "react";

export default function Hero() {

  const [totalCities, setCities] = useState([]);
  const [count, setCount] = useState([0]);
  const [totalStates, setStatesCount] = useState([]);
    
  
    // Load properties when page opens
    useEffect(() => {
  
      fetch("http://127.0.0.1:8000/cities/")
        .then((response) => response.json())
        .then((data) => {
          setCities(data.total_cities); // Accesses 'cities' array from Django Response
          setCount(data.count); // Accesses 'count' from Django Response
          setStatesCount(data.total_states); 

        });
  
    }, []);


  return (
  
                  <section className="hero" aria-labelledby="hero-title">
                    <div className="wrap hero-grid">
                      <div className="hero-copy">
                        <p className="eyebrow"><span className="eyebrow-dot"></span>Property, without the runaround</p>
                        <h1 className="hero-title" id="hero-title">Find the place<br />you'll call<br /><em>your&nbsp;own&nbsp;acre.</em> </h1>
                        <p className="hero-lead">Search thousands of verified homes to buy or rent across {totalCities} cities in {totalStates} states. Real prices, real agents, and a favourites list that follows you everywhere.</p>

                        <div className="hero-stats" data-counters>
                          <div className="stat">
                            <span className="stat-num" data-count="4820" data-suffix="+">{totalCities}</span>
                            <span className="stat-label">Live listings</span>
                          </div>
                          <div className="stat">
                            <span className="stat-num" data-count="62">{totalStates}</span>
                            <span className="stat-label">Cities</span>
                          </div>
                          <div className="stat">
                            <span className="stat-num" data-count="340" data-suffix="+">0</span>
                            <span className="stat-label">Partner agents</span>
                          </div>
                          <div className="stat">
                            <span className="stat-num" data-count="11">0</span>
                            <span className="stat-label">Avg days to offer</span>
                          </div>
                        </div>
                      </div>

                      <div className="hero-media">
                        <div className="media-frame">
                          <img src="/img/hero.jpg" alt="A sunlit street of characterful townhouses with flower-lined balconies" width="720" height="520" />
                        </div>
                        <div className="price-flag" aria-hidden="true">
                          <span className="price-flag-tag">Just listed</span>
                          <strong className="price-flag-price">$865,000</strong>
                          <span className="price-flag-meta">The Solane · 3 bd · Boulder</span>
                        </div>
                        <div className="verify-flag" aria-hidden="true">
                          <svg className="ic" aria-hidden="true"><use href="#i-shield"></use></svg>
                          <span>Every address verified</span>
                        </div>
                      </div>
                    </div>

                    
                    <div className="wrap">
                      <form className="searchbar" role="search" aria-label="Property search" data-search>
                        <div className="search-tabs" role="tablist" aria-label="Search intent">
                          <button type="button" className="search-tab is-active" role="tab" aria-selected="true" data-tab="buy">Buy</button>
                          <button type="button" className="search-tab" role="tab" aria-selected="false" data-tab="rent">Rent</button>
                          <button type="button" className="search-tab" role="tab" aria-selected="false" data-tab="sold">Sold</button>
                        </div>
                        <div className="search-fields">
                          <div className="field field--location">
                            <label className="field-label" htmlFor="s-loc">Location</label>
                            <div className="field-control">
                              <svg className="ic field-ic" aria-hidden="true"><use href="#i-pin"></use></svg>
                              <input className="field-input" id="s-loc" type="text" placeholder="City, neighbourhood or ZIP" data-search-placeholder />
                            </div>
                          </div>
                          <div className="field">
                            <label className="field-label" htmlFor="s-type">Property type</label>
                            <div className="field-control select-wrap">
                              <select className="field-input" id="s-type">
                                <option>Any type</option>
                                <option>House</option>
                                <option>Apartment</option>
                                <option>Condo</option>
                                <option>Villa</option>
                                <option>Townhouse</option>
                              </select>
                              <svg className="ic field-chevron" aria-hidden="true"><use href="#i-chevron"></use></svg>
                            </div>
                          </div>
                          <div className="field">
                            <label className="field-label" htmlFor="s-price">Max price</label>
                            <div className="field-control select-wrap">
                              <select className="field-input" id="s-price">
                                <option>No max</option>
                                <option>$500k</option>
                                <option>$750k</option>
                                <option>$1M</option>
                                <option>$2M+</option>
                              </select>
                              <svg className="ic field-chevron" aria-hidden="true"><use href="#i-chevron"></use></svg>
                            </div>
                          </div>
                          <div className="field field--beds">
                            <label className="field-label" htmlFor="s-beds">Beds</label>
                            <div className="field-control select-wrap">
                              <select className="field-input" id="s-beds">
                                <option>Any</option>
                                <option>1+</option>
                                <option>2+</option>
                                <option>3+</option>
                                <option>4+</option>
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