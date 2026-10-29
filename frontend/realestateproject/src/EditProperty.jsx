import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../public/css/CreateProperty.css";
import Header from "./Header";
import Footer from "./Footer";

const API_BASE_URL = "http://localhost:8000";

const AMENITY_OPTIONS = [
  "Tennis Court",
  "Swimming Pool",
  "Gym",
  "Family Lounge",
  "Waiting Area",
  "Balconies",
  "Fully Fitted Kitchens",
  "Boys' Quarters",
  "24 Hours Power Supply",
];

export default function EditProperty() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    property_type: "apartment",
    status: "for rent",
    price: "",
    state: "",
    city: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    area_sqft: "",
    description: "",
    features: [],
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Load States on mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/states/`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setStates(data);
        else if (data?.states) setStates(data.states);
        else if (data?.results) setStates(data.results);
      })
      .catch((err) => console.error("Error fetching states:", err));
  }, []);

  // Fetch Existing Property Data
  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/${slug}/details/`);
        if (!response.ok) throw new Error("Failed to load property details");

        const data = await response.json();

        // Parse features list safely
        let parsedFeatures = [];
        if (typeof data.features === "string") {
          try {
            parsedFeatures = JSON.parse(data.features);
          } catch {
            parsedFeatures = [];
          }
        } else if (Array.isArray(data.features)) {
          parsedFeatures = data.features;
        }

        setFormData({
          title: data.title || "",
          property_type: data.property_type || "apartment",
          status: data.status || "for rent",
          price: data.price || "",
          state: data.state || "",
          city: data.city || "",
          address: data.address || "",
          bedrooms: data.bedrooms || "",
          bathrooms: data.bathrooms || "",
          area_sqft: data.area_sqft || "",
          description: data.description || "",
          features: parsedFeatures,
          image: null, // Keep null unless user uploads a new image
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };

    fetchPropertyData();
  }, [slug]);

  // Load Cities when state selection changes or populates
  useEffect(() => {
    if (!formData.state) {
      setCities([]);
      return;
    }

    const selectedStateObj = states.find(
      (s) => String(s.id) === String(formData.state) || s.name === formData.state
    );
    const stateQuery = selectedStateObj ? selectedStateObj.name : formData.state;

    fetch(`${API_BASE_URL}/cities/?state=${encodeURIComponent(stateQuery)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.cities)) setCities(data.cities);
        else if (Array.isArray(data)) setCities(data);
        else setCities([]);
      })
      .catch((err) => console.error("Error fetching cities:", err));
  }, [formData.state, states]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "state" ? { city: "" } : {}),
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleFeatureToggle = (feature) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((item) => item !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const submitData = new FormData();

      const selectedStateObj = states.find(
        (s) => String(s.id) === String(formData.state) || s.name === formData.state
      );
      const selectedCityObj = cities.find(
        (c) => String(c.id) === String(formData.city) || c.name === formData.city
      );

      const stateName = selectedStateObj ? selectedStateObj.name : formData.state;
      const cityName = selectedCityObj ? selectedCityObj.name : formData.city;

      submitData.append("title", formData.title);
      submitData.append("property_type", formData.property_type);
      submitData.append("status", formData.status);
      submitData.append("price", formData.price);
      submitData.append("state", stateName);
      submitData.append("city", cityName);
      submitData.append("address", formData.address);
      submitData.append("bedrooms", formData.bedrooms || 0);
      submitData.append("bathrooms", formData.bathrooms || 0);
      submitData.append("area_sqft", formData.area_sqft || 0);
      submitData.append("description", formData.description);

      // JSON stringified features
      submitData.append("features", JSON.stringify(formData.features || []));

      // Only attach image if user uploaded a new file
      if (formData.image) {
        submitData.append("image", formData.image);
      }

      const token = localStorage.getItem("token");

      // Send PUT or PATCH request to update endpoint
      // Send PUT request to your property detail endpoint
      const response = await fetch(`${API_BASE_URL}/${slug}/details/`, {
        method: "PUT", // <--- PUT for Update instead of POST
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: submitData,
        });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          typeof data === "object"
            ? Object.entries(data)
                .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(", ") : val}`)
                .join(" | ")
            : "Failed to update property";

        throw new Error(errorMessage);
      }

      alert("Property updated successfully!");
      navigate(`/property/${data.slug || slug}`);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 0.85rem",
    borderRadius: "6px",
    border: "1px solid #15304A",
    backgroundColor: "#12293F",
    color: "#ffffff",
    fontSize: "0.875rem",
    boxSizing: "border-box",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.825rem",
    fontWeight: "600",
    color: "#9ca3af",
    marginBottom: "0.4rem",
  };

  if (fetching) {
    return (
      <div style={{ backgroundColor: "#081321", minHeight: "100vh", color: "#fff", padding: "2rem" }}>
        <Header />
        <p style={{ textAlign: "center", marginTop: "4rem" }}>Loading property data...</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#081321", color: "#f3f4f6" }}>
      <Header />

      <main style={{ flex: 1, padding: "2.5rem 1rem", boxSizing: "border-box", width: "100%" }}>
        <div className="page-wrapper" style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div className="form-card">
            <h2 style={{ marginTop: 0, fontSize: "1.5rem" }}>Update Property Listing</h2>

            {error && (
              <div style={{ background: "#ef444420", border: "1px solid #ef4444", color: "#f87171", padding: "10px", borderRadius: "6px", marginBottom: "20px" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <h3>Basic Information</h3>

              <div style={{ marginBottom: "1rem" }}>
                <label style={labelStyle}>Property Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} style={inputStyle} required />
              </div>

              <div className="grid-3">
                <div>
                  <label style={labelStyle}>Status</label>
                  <select name="status" value={formData.status} onChange={handleChange} style={inputStyle}>
                    <option value="for rent">For Rent</option>
                    <option value="for sale">For Sale</option>
                    <option value="sold">Sold</option>
                    <option value="just listed">Just Listed</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Property Type</label>
                  <select name="property_type" value={formData.property_type} onChange={handleChange} style={inputStyle}>
                    <option value="land">Land</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="shop">Shop</option>
                    <option value="hall">Hall</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Price ($)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} style={inputStyle} required />
                </div>
              </div>

              <h3 style={{ marginTop: "2rem" }}>Location</h3>

              <div style={{ marginBottom: "1rem" }}>
                <label style={labelStyle}>Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} style={inputStyle} />
              </div>

              <div className="grid-2">
                <div>
                  <label style={labelStyle}>State</label>
                  <select name="state" value={formData.state} onChange={handleChange} style={inputStyle} required>
                    <option value="">Select State</option>
                    {Array.isArray(states) &&
                      states.map((st) => (
                        <option key={st.id} value={st.id || st.name}>
                          {st.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>City</label>
                  <select name="city" value={formData.city} onChange={handleChange} style={inputStyle} required disabled={!formData.state}>
                    <option value="">{formData.state ? "Select City" : "Select State first"}</option>
                    {Array.isArray(cities) &&
                      cities.map((ct) => (
                        <option key={ct.id} value={ct.id || ct.name}>
                          {ct.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <h3 style={{ marginTop: "2rem" }}>Property Details</h3>

              <div className="grid-3">
                <div>
                  <label style={labelStyle}>Bedrooms</label>
                  <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Bathrooms</label>
                  <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Area (sqft)</label>
                  <input type="number" name="area_sqft" value={formData.area_sqft} onChange={handleChange} style={inputStyle} />
                </div>
              </div>

              <div style={{ marginTop: "1rem" }}>
                <label style={labelStyle}>Description</label>
                <textarea name="description" rows="5" value={formData.description} onChange={handleChange} style={inputStyle} />
              </div>

              <h3 style={{ marginTop: "2rem" }}>Features & Amenities</h3>

              <div className="grid-amenities">
                {AMENITY_OPTIONS.map((feature) => (
                  <label key={feature} className="checkbox-label">
                    <input type="checkbox" checked={formData.features.includes(feature)} onChange={() => handleFeatureToggle(feature)} />
                    <span>{feature}</span>
                  </label>
                ))}
              </div>

              <h3 style={{ marginTop: "2rem" }}>Update Image (Optional)</h3>

              <div style={{ backgroundColor: "#12293F", border: "1px dashed #15304A", padding: "1rem", borderRadius: "6px" }}>
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ color: "#9ca3af", width: "100%" }} />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  marginTop: "2rem",
                  padding: "14px",
                  border: "none",
                  borderRadius: "6px",
                  backgroundColor: "#f59e0b",
                  color: "#0C1E33",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Updating Property..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}