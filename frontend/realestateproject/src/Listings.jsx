import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Listings({ filter, setFilter }) {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    let url = "http://127.0.0.1:8000/properties/";

    if (filter) {
      url += `?status=${filter}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => setProperties(data));
  }, [filter]);

  const getStatusBadgeClass = (status) => {
    if (!status) return "badge--rented";

    // Fixed typo: toLowerCase()
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

        <div className="filter-bar" role="group" aria-label="Filter listings">
          <button className={`chip ${filter === "" ? "is-active" : ""}`} type="button" onClick={() => setFilter("")}> All homes </button>
          <button className={`chip ${filter === "for sale" ? "is-active" : ""}`} type="button" onClick={() => setFilter("for sale")}> For sale </button>
          <button className={`chip ${filter === "for rent" ? "is-active" : ""}`} type="button" onClick={() => setFilter("for rent")}> For rent </button>
          <button className={`chip ${filter === "just listed" ? "is-active" : ""}`} type="button" onClick={() => setFilter("just listed")}> Just listed </button>
          <button className={`chip ${filter === "sold" ? "is-active" : ""}`} type="button" onClick={() => setFilter("sold")}> Sold </button>
        </div>

        <div className="listings-grid" data-listings>
          {properties.map((property) => (
            <article className="listing-card" key={property.id} data-listing data-cat="sale new">
              <div className="listing-media">
                <img 
                  src={property.image ? (property.image.startsWith('http') ? property.image : `http://127.0.0.1:8000${property.image}`) : "/img/listing-04.jpg"} 
                  alt={property.title} 
                  loading="lazy" 
                  width="600" 
                  height="440" 
                />
                
                {/* Single Dynamic Badge */}
                <span className={`badge ${getStatusBadgeClass(property.status_display)}`}>
                  {property.status_display}
                </span>

                <button className="fav-btn" type="button" aria-pressed="false" aria-label="Save Property" data-fav="linden">
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
                      width="600" 
                      height="440" 
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
                    Edit Property
                  </Link>

                  <Link className="listing-more" to={`/property/${property.slug}`}>Details</Link>
                </div>
              </div>
            </article>
          ))}


           {/* Card 2 */}
          <article className="listing-card" data-listing data-cat="rent">
            <div className="listing-media">
              <img src="/img/listing-02.jpg" alt="Rivergate apartments overlooking a calm harbour marina" loading="lazy" width="600" height="440" />
              <span className="badge badge--rent">For rent</span>
              <button className="fav-btn" type="button" aria-pressed="false" aria-label="Save Rivergate Apartment 12B" data-fav="rivergate">
                <svg className="ic" aria-hidden="true"><use href="#i-heart"></use></svg>
              </button>
            </div>
            <div className="listing-body">
              <p className="listing-price">$3,400<span className="per">/mo</span></p>
              <h3 className="listing-title"><a href="#listings">Rivergate Apartment 12B</a></h3>
              <p className="listing-addr"><svg className="ic" aria-hidden="true"><use href="#i-pin"></use></svg>12 Harborline, Seattle, WA</p>
              <ul className="stat-strip">
                <li><svg className="ic" aria-hidden="true"><use href="#i-bed"></use></svg>2 beds</li>
                <li><svg className="ic" aria-hidden="true"><use href="#i-bath"></use></svg>2 baths</li>
                <li><svg className="ic" aria-hidden="true"><use href="#i-area"></use></svg>1,180 sqft</li>
              </ul>
              <div className="listing-foot">
                <span className="agent-mini"><img src="/img/agent-02.jpg" alt="" width="32" height="32" />Marcus Bell</span>
                <a className="listing-more" href="#listings">Details</a>
              </div>
            </div>
          </article>

          {/* Card 3 */}
          <article className="listing-card" data-listing data-cat="sale">
            <div className="listing-media">
              <img src="/img/listing-03.jpg" alt="Magnolia Estate, a white heritage home framed by live oaks" loading="lazy" width="600" height="440" />
              <span className="badge badge--sale">For sale</span>
              <button className="fav-btn" type="button" aria-pressed="false" aria-label="Save Magnolia Estate" data-fav="magnolia">
                <svg className="ic" aria-hidden="true"><use href="#i-heart"></use></svg>
              </button>
            </div>
            <div className="listing-body">
              <p className="listing-price">$2,150,000</p>
              <h3 className="listing-title"><a href="#listings">Magnolia Estate</a></h3>
              <p className="listing-addr"><svg className="ic" aria-hidden="true"><use href="#i-pin"></use></svg>88 Live Oak Lane, Charleston, SC</p>
              <ul className="stat-strip">
                <li><svg className="ic" aria-hidden="true"><use href="#i-bed"></use></svg>5 beds</li>
                <li><svg className="ic" aria-hidden="true"><use href="#i-bath"></use></svg>4 baths</li>
                <li><svg className="ic" aria-hidden="true"><use href="#i-area"></use></svg>4,600 sqft</li>
              </ul>
              <div className="listing-foot">
                <span className="agent-mini"><img src="/img/agent-03.jpg" alt="" width="32" height="32" />Priya Nair</span>
                <a className="listing-more" href="#listings">Details</a>
              </div>
            </div>
          </article>

          {/* Card 4 */}
          <article className="listing-card" data-listing data-cat="rent">
            <div className="listing-media">
              <img src="/img/listing-01.jpg" alt="Lakeview Lofts, contemporary apartments beside a reflective lake" loading="lazy" width="600" height="440" />
              <span className="badge badge--rent">For rent</span>
              <button className="fav-btn" type="button" aria-pressed="false" aria-label="Save Lakeview Lofts 7" data-fav="lakeview">
                <svg className="ic" aria-hidden="true"><use href="#i-heart"></use></svg>
              </button>
            </div>
            <div className="listing-body">
              <p className="listing-price">$2,150<span className="per">/mo</span></p>
              <h3 className="listing-title"><a href="#listings">Lakeview Lofts 7</a></h3>
              <p className="listing-addr"><svg className="ic" aria-hidden="true"><use href="#i-pin"></use></svg>7 Basin Street, Denver, CO</p>
              <ul className="stat-strip">
                <li><svg className="ic" aria-hidden="true"><use href="#i-bed"></use></svg>1 bed</li>
                <li><svg className="ic" aria-hidden="true"><use href="#i-bath"></use></svg>1 bath</li>
                <li><svg className="ic" aria-hidden="true"><use href="#i-area"></use></svg>760 sqft</li>
              </ul>
              <div className="listing-foot">
                <span className="agent-mini"><img src="/img/agent-04.jpg" alt="" width="32" height="32" />Theo Marsh</span>
                <a className="listing-more" href="#listings">Details</a>
              </div>
            </div>
          </article>

          {/* Card 5 */}
          <article className="listing-card" data-listing data-cat="sale new">
            <div className="listing-media">
              <img src="/img/listing-05.jpg" alt="The Solane, a solar-panelled family house in a green suburb" loading="lazy" width="600" height="440" />
              <span className="badge badge--new">Just listed</span>
              <button className="fav-btn" type="button" aria-pressed="false" aria-label="Save The Solane" data-fav="solane">
                <svg className="ic" aria-hidden="true"><use href="#i-heart"></use></svg>
              </button>
            </div>
            <div className="listing-body">
              <p className="listing-price">$865,000</p>
              <h3 className="listing-title"><a href="#listings">The Solane</a></h3>
              <p className="listing-addr"><svg className="ic" aria-hidden="true"><use href="#i-pin"></use></svg>45 Sunfield Drive, Boulder, CO</p>
              <ul className="stat-strip">
                <li><svg className="ic" aria-hidden="true"><use href="#i-bed"></use></svg>3 beds</li>
                <li><svg className="ic" aria-hidden="true"><use href="#i-bath"></use></svg>2 baths</li>
                <li><svg className="ic" aria-hidden="true"><use href="#i-area"></use></svg>2,100 sqft</li>
              </ul>
              <div className="listing-foot">
                <span className="agent-mini"><img src="/img/agent-01.jpg" alt="" width="32" height="32" />Dana Alvarez</span>
                <a className="listing-more" href="#listings">Details</a>
              </div>
            </div>
          </article>

          {/* Card 6 */}
          <article className="listing-card" data-listing data-cat="sale">
            <div className="listing-media">
              <img src="/img/listing-06.jpg" alt="Cordova Court, warm-toned condo blocks under a soft sky" loading="lazy" width="600" height="440" />
              <span className="badge badge--sale">For sale</span>
              <button className="fav-btn" type="button" aria-pressed="false" aria-label="Save Cordova Court 4A" data-fav="cordova">
                <svg className="ic" aria-hidden="true"><use href="#i-heart"></use></svg>
              </button>
            </div>
            <div className="listing-body">
              <p className="listing-price">$520,000</p>
              <h3 className="listing-title"><a href="#listings">Cordova Court 4A</a></h3>
              <p className="listing-addr"><svg className="ic" aria-hidden="true"><use href="#i-pin"></use></svg>4A Cordova Court, Austin, TX</p>
              <ul className="stat-strip">
                <li><svg className="ic" aria-hidden="true"><use href="#i-bed"></use></svg>2 beds</li>
                <li><svg className="ic" aria-hidden="true"><use href="#i-bath"></use></svg>2 baths</li>
                <li><svg className="ic" aria-hidden="true"><use href="#i-area"></use></svg>1,340 sqft</li>
              </ul>
              <div className="listing-foot">
                <span className="agent-mini"><img src="/img/agent-02.jpg" alt="" width="32" height="32" />Marcus Bell</span>
                <a className="listing-more" href="#listings">Details</a>
              </div>
            </div>
          </article>

          
        </div>

        {properties.length === 0 && (
          <p className="listings-empty">No homes match that filter right now &mdash; try another.</p>
        )}
      </div>
    </section>
  );
}