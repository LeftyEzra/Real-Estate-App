import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../public/css/style.css";

const API_BASE_URL = "http://127.0.0.1:8000";

export default function PropertyDetails() {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`${API_BASE_URL}/${slug}/details/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Property not found (${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        setProperty(data);
        setActiveImage(data.image ? `${API_BASE_URL}${data.image}` : null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching property:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="wrap" style={{ padding: "4rem 1rem", textAlign: "center" }}>
          <h2>Loading property details...</h2>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !property) {
    return (
      <>
        <Header />
        <main className="wrap" style={{ padding: "4rem 1rem", textAlign: "center" }}>
          <h2>Property Not Found</h2>
          <p>We couldn't locate details for "{slug}".</p>
          <Link to="/" className="btn btn--amber" style={{ marginTop: "1rem", display: "inline-block" }}>
            Return to Homepage
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  // Image URL Helper
  const getImageUrl = (path) => {
    if (!path) return "/img/placeholder.jpg";
    return path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
  };

  const primaryImage = getImageUrl(property.image);
  const secondaryImages = Array.isArray(property.property_images)
    ? property.property_images.map((img) => getImageUrl(typeof img === "object" ? img.image : img))
    : [];
  const gallery = [primaryImage, ...secondaryImages];

  // Owner / Agent Details
  const owner = property.owner || {};
  const ownerName = owner.first_name || owner.last_name
    ? `${owner.first_name || ""} ${owner.last_name || ""}`.trim()
    : owner.username || "Agent";
  const ownerAvatar = getImageUrl(owner.profile_picture);
  const formattedPhone = owner.phone ? owner.phone.replace(/[^0-9+]/g, "") : "";

  // Location Query String for Map
  const mapAddressQuery = encodeURIComponent(
    `${property.address || ""}, ${property.city || ""}, ${property.state || ""}`
  );



  





  return (
    <>
      <Header />

      <main className="property-detail-page" style={{ padding: "0 1rem", maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* HEADER SECTION */}
        <section className="property-header-section" style={{ paddingTop: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span className="badge badge--sale" style={{ textTransform: "uppercase", fontWeight: "bold", fontSize: "0.8rem", padding: "0.25rem 0.5rem" }}>
                {property.status_display || property.status || "For Rent"}
              </span>
              <h1 className="property-title" style={{ margin: "0.5rem 0", fontSize: "clamp(1.5rem, 4vw, 2.2rem)", wordBreak: "break-word" }}>
                {property.title}
              </h1>
              <p className="property-address" style={{ opacity: 0.8, fontSize: "0.95rem" }}>
                📍 {property.address}{property.city ? `, ${property.city}` : ""}{property.state ? `, ${property.state}` : ""}
              </p>
            </div>

            <div className="property-price-box">
              <span style={{ fontSize: "0.85rem", color: "#666", display: "block" }}>Asking Price</span>
              <p className="property-price" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)", fontWeight: "bold", color: "#d97706", margin: 0 }}>
                ₦{Number(property.price || 0).toLocaleString()}
              </p>
            </div>
          </div>
        </section>

        {/* HERO GALLERY */}
        <section className="property-hero" style={{ margin: "1.5rem 0" }}>
          <div className="property-gallery">
            <div className="main-image" style={{ width: "100%", aspectRatio: "16/9", maxHeight: "480px", overflow: "hidden", borderRadius: "12px", backgroundColor: "#f3f4f6" }}>
              <img
                src={activeImage || primaryImage}
                alt={property.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            {gallery.length > 1 && (
              <div className="gallery-thumbnails" style={{ display: "flex", gap: "8px", marginTop: "12px", overflowX: "auto", paddingBottom: "6px" }}>
                {gallery.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => setActiveImage(imgUrl)}
                    style={{
                      width: "80px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      cursor: "pointer",
                      flexShrink: 0,
                      border: (activeImage || primaryImage) === imgUrl ? "3px solid #059669" : "2px solid transparent",
                      opacity: (activeImage || primaryImage) === imgUrl ? 1 : 0.7
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* MAIN CONTENT & SIDEBAR */}
        <section className="property-content" style={{ paddingBottom: "3rem" }}>
          <div className="property-layout" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", alignItems: "start" }}>
            
            {/* MAIN CONTENT AREA */}
            <div className="property-main">
              <div className="property-section" style={{ marginBottom: "2rem" }}>
                <h2 style={{ marginBottom: "0.75rem", fontSize: "1.3rem" }}>Description</h2>
                <p style={{ lineHeight: "1.6", color: "#374151", fontSize: "0.95rem", whitespace: "pre-line" }}>
                  {property.description || "No description provided for this property listing."}
                </p>
              </div>
             <div className="property-section" style={{ marginBottom: "2rem" }}>
                <h2 style={{ marginBottom: "0.75rem", fontSize: "1.3rem" }}>Property Details</h2>
                      <div style={{ overflowX: "auto" }}>
                          <table className="details-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                            <tbody>
                              {/* CORE PROPERTY SPECS */}
                              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                                <td style={{ padding: "0.6rem 0", fontWeight: "600", fontSize: "0.9rem", width: "40%" }}>Property Type</td>
                                <td style={{ padding: "0.6rem 0", textTransform: "capitalize", fontSize: "0.9rem" }}>{property.property_type || "Block of Flats"}</td>
                              </tr>
                              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                                <td style={{ padding: "0.6rem 0", fontWeight: "600", fontSize: "0.9rem" }}>Status</td>
                                <td style={{ padding: "0.6rem 0", fontSize: "0.9rem" }}>{property.status_display || property.status || "For Rent"}</td>
                              </tr>
                              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                                <td style={{ padding: "0.6rem 0", fontWeight: "600", fontSize: "0.9rem" }}>Bedrooms</td>
                                <td style={{ padding: "0.6rem 0", fontSize: "0.9rem" }}>{property.bedrooms ?? "-"}</td>
                              </tr>
                              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                                <td style={{ padding: "0.6rem 0", fontWeight: "600", fontSize: "0.9rem" }}>Bathrooms</td>
                                <td style={{ padding: "0.6rem 0", fontSize: "0.9rem" }}>{property.bathrooms ?? "-"}</td>
                              </tr>
                              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                                <td style={{ padding: "0.6rem 0", fontWeight: "600", fontSize: "0.9rem" }}>Area</td>
                                <td style={{ padding: "0.6rem 0", fontSize: "0.9rem" }}>{property.area_sqft ? `${property.area_sqft} sqft` : "-"}</td>
                              </tr>
                              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                                <td style={{ padding: "0.6rem 0", fontWeight: "600", fontSize: "0.9rem" }}>State</td>
                                <td style={{ padding: "0.6rem 0", fontSize: "0.9rem" }}>{property.state || "-"}</td>
                              </tr>
                              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                                <td style={{ padding: "0.6rem 0", fontWeight: "600", fontSize: "0.9rem" }}>City</td>
                                <td style={{ padding: "0.6rem 0", fontSize: "0.9rem" }}>{property.city || "-"}</td>
                              </tr>

                              {/* FEATURES & AMENITIES ROW */}
                              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                                <td style={{ padding: "0.75rem 0", fontWeight: "600", fontSize: "0.9rem", verticalAlign: "top" }}>Features & Amenities</td>
                                <td style={{ padding: "0.75rem 0" }}>
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "0.4rem", color: "#4b5563", fontSize: "0.85rem" }}>
                                      {(property.features && property.features.length > 0 ? property.features : [
                                        "Tennis Court",
                                        "Swimming Pool",
                                        "Gym",
                                        "Family Lounge",
                                        "Waiting Area",
                                        "Balconies",
                                        "Fully Fitted Kitchens",
                                        "Boys' Quarters",
                                        "24 Hours Power Supply"
                                      ]).map((feature, idx) => (
                                        <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                                          <span style={{ color: "#059669" }}>✓</span> {feature}
                                        </div>
                                      ))}
                                    </div>
                                </td>
                              </tr>

                              {/* FEES BREAKDOWN */}
                              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                                <td style={{ padding: "0.6rem 0", fontWeight: "600", fontSize: "0.9rem" }}>Agency Fee</td>
                                <td style={{ padding: "0.6rem 0", fontSize: "0.9rem" }}>
                                  {property.agency_fee || property.agency_fee_percentage ? `${property.agency_fee || property.agency_fee_percentage}%` : "10%"}
                                </td>
                              </tr>
                              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                                <td style={{ padding: "0.6rem 0", fontWeight: "600", fontSize: "0.9rem" }}>Legal Fee</td>
                                <td style={{ padding: "0.6rem 0", fontSize: "0.9rem" }}>
                                  {property.legal_fee || property.legal_fee_percentage ? `${property.legal_fee || property.legal_fee_percentage}%` : "10%"}
                                </td>
                              </tr>
                              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                                <td style={{ padding: "0.6rem 0", fontWeight: "600", fontSize: "0.9rem" }}>Service Charge</td>
                                <td style={{ padding: "0.6rem 0", fontSize: "0.9rem" }}>
                                  {property.service_charge ? `${property.service_charge}%` : "15%"}
                                </td>
                              </tr>
                              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                                <td style={{ padding: "0.6rem 0", fontWeight: "600", fontSize: "0.9rem" }}>Agreement Fee</td>
                                <td style={{ padding: "0.6rem 0", fontSize: "0.9rem" }}>
                                  {property.agreement_fee ? `${property.agreement_fee}%` : "10%"}
                                </td>
                              </tr>
                              <tr>
                                <td style={{ padding: "0.6rem 0", fontWeight: "600", fontSize: "0.9rem" }}>Refundable Deposit</td>
                                <td style={{ padding: "0.6rem 0", fontSize: "0.9rem" }}>
                                  {property.caution_deposit || property.refundable_deposit ? `₦${Number(property.caution_deposit || property.refundable_deposit).toLocaleString()}` : "₦4,000,000"}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
              

         

  
              </div>
              {/* LOCATION MAP IFRAME */}
              <div className="property-section">
                <h2 style={{ marginBottom: "0.75rem", fontSize: "1.3rem" }}>Location & Map</h2>
                <div style={{   width: "100%",  height: "350px",  borderRadius: "8px",  overflow: "hidden",  border: "1px solid #e5e7eb"   }} >
                  <iframe
                    title="Property Location Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://maps.google.com/maps?q=${mapAddressQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  ></iframe>
                </div>
              </div>
            </div>

            {/* SIDEBAR AGENT CARD */}
            <aside className="property-sidebar" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
  
                {/* 1. AGENT CARD */}
                <div 
                  className="agent-card" 
                  style={{ 
                    border: "1px solid #15304A", 
                    borderRadius: "12px", 
                    overflow: "hidden", 
                    background: "#0C1E33",
                    color: "#f3f4f6",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)"
                  }}
                >
                  {/* AGENCY HEADER BANNER */}
                  <div 
                    style={{ 
                      backgroundColor: "#f59e0b", 
                      color: "#0C1E33", 
                      padding: "0.85rem 1.25rem", 
                      textAlign: "right",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      borderRadius: "5px",
                    }}
                  >
                    {owner?.agency_name || "Prince Rocks Ltd"}
                  </div>

                  <div style={{ padding: "1.25rem" }}>
                    {/* AGENT INFO ROW */}
                    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1rem" }}>
                      <img
                        src={ownerAvatar}
                        alt={ownerName}
                        style={{ 
                          width: "56px", 
                          height: "56px", 
                          borderRadius: "50%", 
                          objectFit: "cover", 
                          flexShrink: 0,
                          border: "2px solid #f59e0b"
                        }}
                      />
                      <div>
                        <span style={{ fontSize: "0.75rem", color: "#9ca3af", display: "block", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                          Listed By
                        </span>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                          <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: "bold", color: "#ffffff" }}>{ownerName}</h3>
                          <span style={{ color: "#06d694", fontSize: "0.9rem" }} title="Verified Agent">✔</span>
                        </div>
                        <p style={{ margin: "0.35rem 0 0", fontSize: "0.8rem", color: "#9ca3af", lineHeight: "1.3" }}>
                          📍 {owner?.address || "2 Prince Adebayo St, LEKKI / AJAH, Lagos"}
                        </p>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", marginTop: "0.5rem", background: "rgba(245, 158, 11, 0.15)", color: "#06d694", padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem" }}>
                          <span>✔</span> Verified ID
                        </div>
                      </div>
                    </div>

                    {/* ACTION BUTTONS GRID */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginTop: "1.25rem" }}>
                      <a
                        href={`/agents/${owner?.id || ""}`}
                        style={{
                          padding: "0.6rem",
                          borderRadius: "6px",
                          border: "1px solid #15304A",
                          color: "#e5e7eb",
                          background: "#12293F",
                          textDecoration: "none",
                          fontSize: "0.825rem",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.3rem"
                        }}
                      >
                        🏢 View Profile
                      </a>

                      <a
                        href={`mailto:${owner?.email || ""}?subject=Inquiry for ${encodeURIComponent(property?.title || "Property")}`}
                        style={{
                          padding: "0.6rem",
                          borderRadius: "6px",
                          border: "none",
                          color: "#0C1E33",
                          background: "#f59e0b",
                          textDecoration: "none",
                          fontSize: "0.825rem",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.3rem"
                        }}
                      >
                        ✉ Contact Agent
                      </a>

                      <a
                        href={`tel:${formattedPhone}`}
                        style={{
                          padding: "0.6rem",
                          borderRadius: "6px",
                          border: "1px solid #15304A",
                          color: "#e5e7eb",
                          background: "#12293F",
                          textDecoration: "none",
                          fontSize: "0.825rem",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.3rem"
                        }}
                      >
                        📞 Call Agent
                      </a>

                      <a
                        href={`https://wa.me/${formattedPhone}?text=Hi%20I'm%20interested%20in%20${encodeURIComponent(property?.title || "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: "0.6rem",
                          borderRadius: "6px",
                          border: "1px solid #15304A",
                          color: "#e5e7eb",
                          background: "#12293F",
                          textDecoration: "none",
                          fontSize: "0.825rem",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.3rem"
                        }}
                      >
                        💬 Chat WhatsApp
                      </a>
                    </div>

                    <div style={{ marginTop: "0.85rem" }}>
                      <a
                        href={`tel:${formattedPhone}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.4rem",
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "6px",
                          border: "1px solid #f59e0b",
                          background: "transparent",
                          color: "#f59e0b",
                          fontWeight: "bold",
                          fontSize: "0.875rem",
                          textDecoration: "none",
                          boxSizing: "border-box"
                        }}
                      >
                        📞 Request call back
                      </a>
                    </div>
                  </div>
                </div>

                {/* 2. INTERESTED IN THIS PROPERTY FORM */}
                <div 
                  style={{ 
                    border: "1px solid #15304A", 
                    borderRadius: "12px", 
                    padding: "1.25rem", 
                    background: "#0C1E33",
                    color: "#f3f4f6",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)"
                  }}
                >
                  <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.1rem", fontWeight: "bold", color: "#ffffff" }}>
                    Interested in this property?
                  </h3>

                  <form>
                    <div style={{ marginBottom: "0.85rem" }}>
                      <label style={{ display: "block", fontSize: "0.825rem", fontWeight: "600", color: "#9ca3af", marginBottom: "0.35rem" }}>
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        style={{
                          width: "100%",
                          padding: "0.65rem 0.85rem",
                          borderRadius: "6px",
                          border: "1px solid #15304A",
                          backgroundColor: "#12293F",
                          color: "#ffffff",
                          fontSize: "0.875rem",
                          boxSizing: "border-box",
                          outline: "none"
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "0.85rem" }}>
                      <label style={{ display: "block", fontSize: "0.825rem", fontWeight: "600", color: "#9ca3af", marginBottom: "0.35rem" }}>
                        Your Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        style={{
                          width: "100%",
                          padding: "0.65rem 0.85rem",
                          borderRadius: "6px",
                          border: "1px solid #15304A",
                          backgroundColor: "#12293F",
                          color: "#ffffff",
                          fontSize: "0.875rem",
                          boxSizing: "border-box",
                          outline: "none"
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "0.85rem" }}>
                      <label style={{ display: "block", fontSize: "0.825rem", fontWeight: "600", color: "#9ca3af", marginBottom: "0.35rem" }}>
                        Your Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 0801 234 5678 or +234 801 234 5678"
                        style={{
                          width: "100%",
                          padding: "0.65rem 0.85rem",
                          borderRadius: "6px",
                          border: "1px solid #15304A",
                          backgroundColor: "#12293F",
                          color: "#ffffff",
                          fontSize: "0.875rem",
                          boxSizing: "border-box",
                          outline: "none"
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                      <label style={{ display: "block", fontSize: "0.825rem", fontWeight: "600", color: "#9ca3af", marginBottom: "0.35rem" }}>
                        Message
                      </label>
                      <textarea
                        rows="4"
                        defaultValue={`I'm interested in the property listed. Please contact me with more information.`}
                        style={{
                          width: "100%",
                          padding: "0.65rem 0.85rem",
                          borderRadius: "6px",
                          border: "1px solid #15304A",
                          backgroundColor: "#12293F",
                          color: "#ffffff",
                          fontSize: "0.85rem",
                          lineHeight: "1.4",
                          resize: "vertical",
                          boxSizing: "border-box",
                          outline: "none"
                        }}
                      />
                    </div>

                    <button
                      type="button"
                      style={{
                        width: "100%",
                        backgroundColor: "#f59e0b",
                        color: "#0C1E33",
                        border: "none",
                        borderRadius: "6px",
                        padding: "0.75rem",
                        fontWeight: "bold",
                        fontSize: "0.95rem",
                        cursor: "pointer",
                        marginBottom: "0.75rem"
                      }}
                    >
                      Send Inquiry
                    </button>

                    <p style={{ fontSize: "0.725rem", color: "#9ca3af", lineHeight: "1.35", margin: 0 }}>
                      By sending your message, you agree that the real estate agent/owner may contact you by live or automated means about your inquiry at the number and email you provided.
                    </p>
                  </form>
                </div>

                {/* 3. NEIGHBORHOOD SNAPSHOT CARD */}
                <div 
                  style={{ 
                    border: "1px solid #15304A", 
                    borderRadius: "12px", 
                    padding: "1.25rem", 
                    background: "#0C1E33",
                    color: "#f3f4f6",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                    <span style={{ fontSize: "1.1rem" }}>📍</span>
                    <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: "bold", color: "#ffffff" }}>
                      {property?.city || property?.state ? `${property?.city || ""}, ${property?.state || ""}` : "Owode Ede, Osun"}
                    </h3>
                  </div>

                  <h4 style={{ fontSize: "0.9rem", fontWeight: "600", color: "#f59e0b", margin: "0.75rem 0 0.35rem 0", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span>🧩</span> Neighborhood snapshot
                  </h4>

                  <p style={{ fontSize: "0.8rem", color: "#9ca3af", marginTop: 0, marginBottom: "0.75rem" }}>
                    {property?.city || property?.state ? `${property?.city || ""}, ${property?.state || ""}` : "Owode Ede, Osun"}
                  </p>

                  <ul style={{ paddingLeft: "1.1rem", margin: 0, fontSize: "0.825rem", color: "#d1d5db", lineHeight: "1.5" }}>
                    <li style={{ marginBottom: "0.5rem" }}>
                      <strong style={{ color: "#ffffff" }}>Affordable Living & Investment Value:</strong> Offers significantly more affordable real estate options, including land and rentals.
                    </li>
                    <li style={{ marginBottom: "0.5rem" }}>
                      <strong style={{ color: "#ffffff" }}>Strong Community & Cultural Heritage:</strong> Features a vibrant, close-knit community with deep-rooted cultural values.
                    </li>
                    <li>
                      <strong style={{ color: "#ffffff" }}>Strategic Connectivity & Accessibility:</strong> Well-maintained road networks provide convenient access to surrounding hubs.
                    </li>
                  </ul>
                </div>

                {/* 4. SAFETY TIPS CAROUSEL CARD */}
                <div 
                  style={{ 
                    border: "1px solid #15304A", 
                    borderRadius: "12px", 
                    overflow: "hidden", 
                    background: "#0C1E33",
                    color: "#f3f4f6",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)"
                  }}
                >
                  <div 
                    style={{ 
                      backgroundColor: "#12293F", 
                      borderBottom: "1px solid #15304A",
                      color: "#ffffff", 
                      padding: "0.85rem 1.25rem", 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "0.5rem",
                      fontWeight: "bold",
                      fontSize: "0.95rem"
                    }}
                  >
                    <span style={{ color: "#f59e0b" }}>🛡️</span>
                    <span>Safety Tips</span>
                  </div>

                  <div style={{ padding: "1.25rem" }}>
                    <p style={{ fontSize: "0.85rem", color: "#d1d5db", margin: "0 0 1rem 0", lineHeight: "1.45" }}>
                      Avoid submitting any evaluation charges until you've had an opportunity to meet the agent and view the property personally.
                    </p>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.75rem", fontSize: "0.8rem", color: "#9ca3af" }}>
                      <button 
                        type="button" 
                        style={{  background: "rgba(245, 158, 11, 0.15)", border: "1px solid #15304A", borderRadius: "4px", cursor: "pointer", color: "#e5e7eb", fontSize: "0.85rem", padding: "0.2rem 0.5rem" }}
                      >
                        &lt;
                      </button>
                      <span>1 / 4</span>
                      <button 
                        type="button" 
                        style={{  background: "rgba(245, 158, 11, 0.15)", border: "1px solid #15304A", borderRadius: "4px", cursor: "pointer", color: "#e5e7eb", fontSize: "0.85rem", padding: "0.2rem 0.5rem" }}
                      >
                        &gt;
                      </button>
                    </div>
                  </div>
                </div>

                {/* 5. WEEKLY PROPERTY ALERTS SUBSCRIBE CARD */}
                <div 
                  style={{ 
                    border: "1px solid #15304A", 
                    borderRadius: "12px", 
                    padding: "1.25rem", 
                    background: "#0C1E33",
                    color: "#f3f4f6",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)"
                  }}
                >
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", marginBottom: "0.85rem" }}>
                    <span style={{ fontSize: "1.2rem", color: "#f59e0b" }}>🔔</span>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: "bold", color: "#ffffff" }}>
                        Get weekly property alerts
                      </h3>
                      <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.8rem", color: "#9ca3af", lineHeight: "1.35" }}>
                        Receive new rent listings around {property?.city || "Ikoyi"}, {property?.state || "Lagos State"} once a week.
                      </p>
                    </div>
                  </div>

                  <form>
                    <div style={{ marginBottom: "0.75rem" }}>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        style={{
                          width: "100%",
                          padding: "0.65rem 0.85rem",
                          borderRadius: "6px",
                          border: "1px solid #15304A",
                          backgroundColor: "#12293F",
                          color: "#ffffff",
                          fontSize: "0.875rem",
                          boxSizing: "border-box",
                          outline: "none"
                        }}
                      />
                    </div>

                    <button
                      type="button"
                      style={{
                        width: "100%",
                        backgroundColor: "#f59e0b",
                        color: "#0C1E33",
                        border: "none",
                        borderRadius: "6px",
                        padding: "0.7rem",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        cursor: "pointer"
                      }}
                    >
                      Notify Me
                    </button>
                  </form>
                </div>

            </aside>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}