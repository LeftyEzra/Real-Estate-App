import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ setFilter }) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Read stored auth data
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    alert("Logged out successfully");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="site-header" id="top">
      <div className="wrap header-inner">
        <Link className="brand" to="/" aria-label="Acre home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32"><path d="M16 4L4 14v14h8v-8h8v8h8V14z"/></svg>
          </span>
          <span className="brand-word">Athletech</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="main-nav d-none-mobile" id="mainNavDesktop" aria-label="Primary">
          <ul className="nav-list">
            <li><a href="#listings" onClick={() => setFilter && setFilter("for sale")}>Buy</a></li>
            <li><a href="#listings" onClick={() => setFilter && setFilter("for rent")}>Rent</a></li>
            <li><a href="#cta" onClick={() => setFilter && setFilter("for sale")}>Sell</a></li>
            <li><a href="#agents" onClick={() => setFilter && setFilter("agents")}>Agents</a></li>
            <li><a href="#cities" onClick={() => setFilter && setFilter("guides")}>Guides</a></li>
            
            {token ? (
              <>
                <li>
                  <span style={{ color: "#F97316", fontWeight: "600" }}>
                    {`Hi, ${user?.first_name || user?.username || "User"}`}
                  </span>
                </li>
                <li>
                  <button 
                    onClick={handleLogout} 
                    style={{
                      background: "none",
                      border: "none",
                      color: "#EF4444",
                      fontWeight: "600",
                      cursor: "pointer",
                      padding: 0,
                      font: "inherit"
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Sign Up</Link></li>
              </>
            )}
          </ul>
        </nav>

        <div className="header-actions">
          <a className="saved-btn" href="#listings" aria-label="Saved homes">
            <svg className="ic" aria-hidden="true"><use href="#i-heart"></use></svg>
            <span className="saved-label">Saved</span>
            <span className="saved-count" data-saved-count>0</span>
          </a>

          <Link className="btn btn--amber d-none-mobile" to="/create-property">List a property</Link>
          
          {/* Hamburger Menu Button */}
          <button 
            className="nav-toggle" 
            type="button" 
            aria-label="Open menu" 
            aria-expanded={isMobileMenuOpen} 
            aria-controls="mainNav" 
            onClick={toggleMenu}
          >
            <svg className="ic" aria-hidden="true"><use href="#i-menu"></use></svg>
          </button>
        </div>
      </div>

      {/* PORTAL: Renders the drawer directly under <body> so sticky/backdrop containers cannot constrain it */}
      {isMobileMenuOpen && createPortal(
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 9999999,
            display: "flex",
            justifyContent: "flex-end"
          }}
          onClick={toggleMenu}
        >
          <div 
            style={{
              width: "280px",
              maxWidth: "85vw",
              height: "100%",
              backgroundColor: "#0b1329",
              padding: "2rem 1.5rem",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              boxShadow: "-10px 0 30px rgba(0,0,0,0.8)",
              overflowY: "auto"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              type="button" 
              onClick={toggleMenu}
              style={{
                background: "none",
                border: "none",
                color: "#ffffff",
                fontSize: "2rem",
                alignSelf: "flex-end",
                cursor: "pointer",
                marginBottom: "1.5rem",
                lineHeight: 1
              }}
            >
              &times;
            </button>

            {/* Nav Links */}
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <li><a href="#listings" style={{ color: "#fff", textDecoration: "none", fontSize: "1.15rem" }} onClick={() => { setFilter && setFilter("for sale"); toggleMenu(); }}>Buy</a></li>
              <li><a href="#listings" style={{ color: "#fff", textDecoration: "none", fontSize: "1.15rem" }} onClick={() => { setFilter && setFilter("for rent"); toggleMenu(); }}>Rent</a></li>
              <li><a href="#cta" style={{ color: "#fff", textDecoration: "none", fontSize: "1.15rem" }} onClick={() => { setFilter && setFilter("for sale"); toggleMenu(); }}>Sell</a></li>
              <li><a href="#agents" style={{ color: "#fff", textDecoration: "none", fontSize: "1.15rem" }} onClick={() => { setFilter && setFilter("agents"); toggleMenu(); }}>Agents</a></li>
              <li><a href="#cities" style={{ color: "#fff", textDecoration: "none", fontSize: "1.15rem" }} onClick={() => { setFilter && setFilter("guides"); toggleMenu(); }}>Guides</a></li>

              {token ? (
                <>
                  <li>
                    <span style={{ color: "#F97316", fontWeight: "600" }}>
                      {`Hi, ${user?.first_name || user?.username || "User"}`}
                    </span>
                  </li>
                  <li>
                    <button 
                      onClick={() => { handleLogout(); toggleMenu(); }} 
                      style={{
                        background: "none",
                        border: "none",
                        color: "#EF4444",
                        fontWeight: "600",
                        cursor: "pointer",
                        padding: 0,
                        font: "inherit",
                        fontSize: "1.15rem"
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li><Link to="/login" style={{ color: "#fff", textDecoration: "none", fontSize: "1.15rem" }} onClick={toggleMenu}>Login</Link></li>
                  <li><Link to="/register" style={{ color: "#fff", textDecoration: "none", fontSize: "1.15rem" }} onClick={toggleMenu}>Sign Up</Link></li>
                </>
              )}
            </ul>

            <div style={{ marginTop: "2rem" }}>
              <Link className="btn btn--amber" to="/create-property" style={{ display: "block", textAlign: "center" }} onClick={toggleMenu}>
                List a property
              </Link>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}