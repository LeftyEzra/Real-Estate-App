import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";


export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Endpoint for Obtain JWT Pair or Login
      const response = await fetch("http://127.0.0.1:8000/api/members/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Login Response Data:", data);

      if (!response.ok) {
        const errorMessage = typeof data === "object" 
          ? data.detail || Object.entries(data).map(([key, val]) => `${key}: ${val}`).join(" | ")
          : "Invalid credentials. Please try again.";
        throw new Error(errorMessage);
      }

      // Store Auth Tokens / Session
      if (data.access) {
        localStorage.setItem("token", data.access);
      }
      if (data.refresh) {
        localStorage.setItem("refresh", data.refresh);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      alert("Welcome back!");
      navigate("/"); // Redirect to home page upon successful login
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

      {/* Main Login Area */}
      <main style={styles.mainContainer}>
        <div style={styles.card}>
          <div style={styles.header}>
            <span style={styles.tagline}>• PROPERTY, WITHOUT THE RUNAROUND</span>
            <h2 style={styles.title}>
              Welcome <span style={styles.highlight}>back.</span>
            </h2>
            <p style={styles.subtitle}>Log in to access your saved homes and account</p>
          </div>

          {error && <div style={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Username or Email</label>
              <input
                type="text"
                name="username"
                placeholder="john.doe or john@example.com"
                value={formData.username}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label style={styles.label}>Password</label>
                <a href="#forgot" style={{ fontSize: "12px", color: "#F97316", textDecoration: "none" }}>
                  Forgot?
                </a>
              </div>
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

            <button type="submit" disabled={loading} style={styles.submitBtn}>
              {loading ? "Signing in..." : "Log In"}
            </button>
          </form>

          <p style={styles.footerText}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#F97316", textDecoration: "none", fontWeight: "600" }}>
              Sign Up
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
    maxWidth: "420px",
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