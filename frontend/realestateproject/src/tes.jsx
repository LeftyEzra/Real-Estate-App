import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_BASE_URL = "http://127.0.0.1:8000";

export default function PropertyDetails() {
  const { slug } = useParams();

  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/${slug}/details/`)
      .then((res) => res.json())
      .then((data) => setProperty(data))
      .catch((err) => console.error(err));
  }, [slug]);

  if (!property) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <main className="property-detail-page">

        <section className="property-hero">
          <div className="wrap">
            <div className="property-gallery">

              <div className="main-image">
                {`${API_BASE_URL}${property.image}`}
              </div>

            </div>
          </div>
        </section>

        <section className="property-header-section">
          <div className="wrap">
            <div className="property-header">

              <div>
                <span className="badge badge--sale">
                  {property.status_display}
                </span>

                <h1 className="property-title">
                  {property.title}
                </h1>

                <p className="property-address">
                  {property.address}
                </p>
              </div>

              <div className="property-price-box">
                <p className="property-price">
                  ₦{Number(property.price).toLocaleString()}
                </p>
              </div>

            </div>
          </div>
        </section>

        <section className="property-info-section">
          <div className="wrap">

            <div className="property-stats">

              <div className="stat-item">
                <h4>Bedrooms</h4>
                <span>{property.bedrooms}</span>
              </div>

              <div className="stat-item">
                <h4>Bathrooms</h4>
                <span>{property.bathrooms}</span>
              </div>

              <div className="stat-item">
                <h4>Area</h4>
                <span>{property.area_sqft} sqft</span>
              </div>

              <div className="stat-item">
                <h4>Property Type</h4>
                <span>{property.property_type}</span>
              </div>

            </div>

          </div>
        </section>

        <section className="property-content">
  <div className="wrap">
    <div className="property-layout">
      <div className="property-main">
        <div className="property-section">
          <h2>Description</h2>
          <p>{property?.description || "No description provided."}</p>
        </div>

        <div className="property-section">
          <h2>Property Details</h2>
          <table className="details-table">
            <tbody>
              <tr>
                <td>Property Type</td>
                <td>{property?.property_type || "-"}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{property?.status_display || property?.status || "-"}</td>
              </tr>
              <tr>
                <td>Bedrooms</td>
                <td>{property?.bedrooms ?? "-"}</td>
              </tr>
              <tr>
                <td>Bathrooms</td>
                <td>{property?.bathrooms ?? "-"}</td>
              </tr>
              <tr>
                <td>Area</td>
                <td>{property?.area_sqft ? `${property.area_sqft} sqft` : "-"}</td>
              </tr>
              <tr>
                <td>State</td>
                <td>{property?.state || "-"}</td>
              </tr>
              <tr>
                <td>City</td>
                <td>{property?.city || "-"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <aside className="property-sidebar">
        <div className="agent-card">
          <img
            src={
              property?.owner?.profile_picture
                ? `${API_BASE_URL}${property.owner.profile_picture}`
                : "/img/agent-01.jpg"
            }
            alt={`${property?.owner?.first_name || ""} ${property?.owner?.last_name || ""}`}
            className="agent-avatar"
          />

          <h3>
            {property?.owner?.first_name || property?.owner?.last_name
              ? `${property.owner.first_name || ""} ${property.owner.last_name || ""}`.trim()
              : property?.owner?.username || "Property Agent"}
          </h3>

          <p>{property?.owner?.email || "No email provided"}</p>

          <a
            href={`tel:${property?.owner?.phone || ""}`}
            className="btn btn--amber btn--block"
          >
            Call Agent
          </a>
        </div>
      </aside>
    </div>
  </div>
</section>

      </main>
    </>
  );
}










