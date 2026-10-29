import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Listings({ filters, setFilters }) {
  const [properties, setProperties] = useState([]);

  // Fetch properties whenever any filter changes
  useEffect(() => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    });

    const url = `http://127.0.0.1:8000/properties/?${params.toString()}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setProperties(data))
      .catch((err) => console.error("Error fetching listings:", err));
  }, [filters]);

  const getStatusBadgeClass = (status) => {
    if (!status) return "badge--rented";
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes("rent")) return "badge--rented";
    if (lowerStatus.includes("sale")) return "badge--sale";
    if (lowerStatus.includes("sold")) return "badge--sold";
    if (lowerStatus.includes("just listed")) return "badge--new";
    return "badge--default";
  };

  return (
    <section className="section" id="listings" aria-labelledby="listings-title">
      <div className="wrap">
        <div className="section-head section-head--row">
          <div>
            <p className="kicker">Fresh on the market</p>
            <h2 className="section-title" id="listings-title">Featured homes this week</h2>
          </div>
          <a className="link-arrow" href="#listings">
            Browse all 4,820 <svg className="ic" aria-hidden="true"><use href="#i-arrow"></use></svg>
          </a>
        </div>

        {/* Filter Chip Bar */}
        <div className="filter-bar" role="group" aria-label="Filter listings">
          <button className={`chip ${filters.status === "" ? "is-active" : ""}`} type="button" onClick={() => setFilters(prev => ({ ...prev, status: "" }))}> All homes </button>
          <button className={`chip ${filters.status === "for sale" ? "is-active" : ""}`} type="button" onClick={() => setFilters(prev => ({ ...prev, status: "for sale" }))}> For sale </button>
          <button className={`chip ${filters.status === "for rent" ? "is-active" : ""}`} type="button" onClick={() => setFilters(prev => ({ ...prev, status: "for rent" }))}> For rent </button>
          <button className={`chip ${filters.status === "just listed" ? "is-active" : ""}`} type="button" onClick={() => setFilters(prev => ({ ...prev, status: "just listed" }))}> Just listed </button>
          <button className={`chip ${filters.status === "sold" ? "is-active" : ""}`} type="button" onClick={() => setFilters(prev => ({ ...prev, status: "sold" }))}> Sold </button>
        </div>

        {/* Listings Grid */}
        <div className="listings-grid" data-listings>
          {properties.map((property) => (
            <article className="listing-card" key={property.id} data-listing>
              <div className="listing-media">
                <img 
                  src={property.image ? (property.image.startsWith('http') ? property.image : `http://127.0.0.1:8000${property.image}`) : "/img/listing-04.jpg"} 
                  alt={property.title} 
                  loading="lazy" 
                  width="600" 
                  height="440" 
                />
                
                <span className={`badge ${getStatusBadgeClass(property.status_display)}`}>
                  {property.status_display}
                </span>

                <button className="fav-btn" type="button" aria-pressed="false" aria-label="Save Property">
                  <svg className="ic" aria-hidden="true"><use href="#i-heart"></use></svg>
                </button>
              </div>

              <div className="listing-body">
                <p className="listing-price">{property.price}</p>
                <h3 className="listing-title">
                  <Link to={`/property/${property.slug}`}>{property.title}</Link>
                </h3>
                <p className="listing-addr">
                  <svg className="ic" aria-hidden="true"><use href="#i-pin"></use></svg>{property.address}
                </p>
                <ul className="stat-strip">
                  <li><svg className="ic" aria-hidden="true"><use href="#i-bed"></use></svg>{property.bedrooms}</li>
                  <li><svg className="ic" aria-hidden="true"><use href="#i-bath"></use></svg>{property.bathrooms}</li>
                  <li><svg className="ic" aria-hidden="true"><use href="#i-area"></use></svg>{property.area_sqft}</li>
                </ul>

                <div className="listing-foot">
                  <span className="agent-mini">
                    <img 
                      src={property.owner?.profile_picture ? (property.owner.profile_picture.startsWith('http') ? property.owner.profile_picture : `http://127.0.0.1:8000${property.owner.profile_picture}`) : "/img/agent-01.jpg"} 
                      alt={property.title} 
                      loading="lazy" 
                      width="32" 
                      height="32" 
                    />
                    {property.owner?.first_name} {property.owner?.last_name}
                  </span>

                  <Link
                    to={`/edit-property/${property?.slug || property?.id}`}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: "inline-block",
                      padding: "8px 16px",
                      backgroundColor: "#f59e0b",
                      color: "#0C1E33",
                      fontWeight: "bold",
                      borderRadius: "6px",
                      textDecoration: "none",
                      position: "relative",
                      zIndex: 10,
                    }}
                  >
                    Edit
                  </Link>

                  <Link className="listing-more" to={`/property/${property.slug}`}>Details</Link>
                </div>
              </div>
            </article>
          ))}



   




        </div>

        {properties.length === 0 && (
          <p className="listings-empty">No homes match that filter right now &mdash; try another.</p>
        )}
      </div>
    </section>
  );
}