import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "buyer",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const accountTypes = [
    {
      id: "buyer",
      title: "Regular User",
      description: "Browse properties and make inquiries",
      icon: "👤",
    },
    {
      id: "agent",
      title: "Real Estate Agent",
      description: "List and manage multiple properties",
      icon: "🏢",
    },
    {
      id: "owner",
      title: "Property Owner",
      description: "List and manage your own properties",
      icon: "🏠",
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Split Full Name into first_name and last_name
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const cleanUsername = formData.username.trim() !== "" 
      ? formData.username 
      : formData.email.split("@")[0];

    const payload = {
      ...formData,
      first_name: firstName,
      last_name: lastName,
      username: cleanUsername,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/members/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = typeof data === "object" 
          ? Object.entries(data).map(([key, val]) => `${key}: ${val}`).join(" | ")
          : "Registration failed.";
        throw new Error(errorMessage);
      }

      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      {/* Page Header */}
      <Header />

      {/* Main Registration Area */}
      <main style={styles.mainContainer}>
        <div style={styles.card}>
          <div style={styles.header}>
            <span style={styles.tagline}>• PROPERTY, WITHOUT THE RUNAROUND</span>
            <h2 style={styles.title}>
              Create an <span style={styles.highlight}>account.</span>
            </h2>
            <p style={styles.subtitle}>Enter your information below to get started with Acre</p>
          </div>

          {error && <div style={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Phone Number (optional)</label>
              <input
                type="text"
                name="phone"
                placeholder="+234 800 000 0000"
                value={formData.phone}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Account Type</label>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "6px" }}>
                {accountTypes.map((type) => {
                  const isSelected = formData.role === type.id;
                  return (
                    <div
                      key={type.id}
                      onClick={() => setFormData({ ...formData, role: type.id })}
                      style={{
                        ...styles.accountCard,
                        borderColor: isSelected ? "#F97316" : "rgba(255, 255, 255, 0.15)",
                        backgroundColor: isSelected ? "rgba(249, 115, 22, 0.12)" : "rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      <span style={{ fontSize: "20px" }}>{type.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: "600", fontSize: "14px", color: "#FFFFFF" }}>{type.title}</div>
                        <div style={{ fontSize: "12px", color: "#94A3B8" }}>{type.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button type="submit" disabled={loading} style={styles.submitBtn}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p style={styles.footerText}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#F97316", textDecoration: "none", fontWeight: "600" }}>
               Login
            </Link>
          </p>
        </div>
      </main>

      {/* Page Footer */}
      <Footer />
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#0B132B",
  },
  mainContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "48px 16px",
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "440px",
    backgroundColor: "#1C2541",
    borderRadius: "16px",
    padding: "32px 28px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  header: {
    textAlign: "left",
    marginBottom: "24px",
  },
  tagline: {
    fontSize: "11px",
    letterSpacing: "1px",
    fontWeight: "700",
    color: "#F97316",
    display: "block",
    marginBottom: "8px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "800",
    margin: "0 0 6px 0",
    color: "#FFFFFF",
  },
  highlight: {
    color: "#F97316",
  },
  subtitle: {
    fontSize: "13px",
    color: "#94A3B8",
    margin: 0,
  },
  errorBox: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    border: "1px solid #EF4444",
    color: "#FCA5A5",
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "18px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#E2E8F0",
  },
  input: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    border: "1px solid #CBD5E1",
    borderRadius: "8px",
    padding: "12px 14px",
    color: "#0F172A",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  },
  accountCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  submitBtn: {
    width: "100%",
    backgroundColor: "#F97316",
    color: "#FFFFFF",
    fontWeight: "700",
    padding: "14px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    marginTop: "8px",
    fontSize: "15px",
    transition: "background-color 0.2s",
  },
  footerText: {
    textAlign: "center",
    fontSize: "13px",
    color: "#94A3B8",
    marginTop: "20px",
    marginBottom: 0,
  },
};