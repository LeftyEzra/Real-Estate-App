import React, { useState, useEffect } from 'react';

const API_BASE_URL = "http://127.0.0.1:8000";

export default function States() {
  const [statesData, setStatesData] = useState({ count: 0, states: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch states from your Django endpoint (e.g., /states/)
    fetch(`${API_BASE_URL}/states/`)
      .then((res) => res.json())
      .then((data) => {
        // Flexibly handles whether Django returns a list [...] or an object { count, states }
        if (Array.isArray(data)) {
          setStatesData({ count: data.length, states: data });
        } else {
          setStatesData({ count: data.count || 0, states: data.states || data.results || [] });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching states:', err);
        setLoading(false);
      });
  }, []);

  // Helper to preserve your CSS layout grid modifiers
  const getTileModifier = (index) => {
    if (index === 0) return 'city-tile--lead'; // First tile gets lead/large layout
    if (index === 3) return 'city-tile--wide'; // Fourth tile gets wide layout
    return '';                                  // Standard tile layout
  };

  if (loading) {
    return (
      <section className="section">
        <div className="wrap">
          <p>Loading states...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section" id="cities" aria-labelledby="cities-title">
      <div className="wrap">
        <div className="section-head section-head--row">
          <div>
            <p className="kicker">Where people are moving</p>
            <h2 className="section-title" id="cities-title">Popular states right now</h2>
          </div>
          <a className="link-arrow" href="#cities">
            All {statesData.count} state guides{' '}
            <svg className="ic" aria-hidden="true">
              <use href="#i-arrow"></use>
            </svg>
          </a>
        </div>

        <div className="cities-grid">
          {statesData.states.map((state, index) => (
            <a 
              key={state.id || index} 
              className={`city-tile ${getTileModifier(index)}`} 
              href={`/states/${state.slug || state.id}`}
            >
              <div className="city-media">
                <img 
                  src={
                    state.image 
                      ? (state.image.startsWith('http') ? state.image : `${API_BASE_URL}${state.image}`)
                      : `/img/city-0${(index % 4) + 1}.jpg`
                  } 
                  alt={state.name} 
                  loading="lazy" 
                  width="800" 
                  height="600" 
                />
              </div>
              <div className="city-overlay">
                <h3 className="city-name">{state.name}</h3>
                <p className="city-count">
                  {state.cities_count} listings
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}