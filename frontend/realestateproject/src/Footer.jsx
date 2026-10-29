export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="wrap footer-top">
        <div className="footer-brand">
          <a className="brand brand--footer" href="#top" aria-label="Acre home">
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32">
                <path d="M16 4L4 14v14h8v-8h8v8h8V14z" />
              </svg>
            </span>
            <span className="brand-word">Acre</span>
          </a>
          <p className="footer-blurb">
            The property marketplace that respects your time. Verified homes, honest prices and agents who know the neighbourhood.
          </p>
          <ul className="social" aria-label="Acre on social media">
            <li>
              <a href="#top" aria-label="Acre on X">
                <svg className="ic" aria-hidden="true"><use href="#i-x"></use></svg>
              </a>
            </li>
            <li>
              <a href="#top" aria-label="Acre on Instagram">
                <svg className="ic" aria-hidden="true"><use href="#i-instagram"></use></svg>
              </a>
            </li>
            <li>
              <a href="#top" aria-label="Acre on Facebook">
                <svg className="ic" aria-hidden="true"><use href="#i-facebook"></use></svg>
              </a>
            </li>
            <li>
              <a href="#top" aria-label="Acre on LinkedIn">
                <svg className="ic" aria-hidden="true"><use href="#i-linkedin"></use></svg>
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <h4>Buy</h4>
            <ul>
              <li><a href="#listings">Homes for sale</a></li>
              <li><a href="#categories">New developments</a></li>
              <li><a href="#cities">City guides</a></li>
              <li><a href="#how">Buying guide</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Rent</h4>
            <ul>
              <li><a href="#listings">Apartments</a></li>
              <li><a href="#listings">Houses to rent</a></li>
              <li><a href="#categories">Short lets</a></li>
              <li><a href="#how">Renter's checklist</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#why">About Acre</a></li>
              <li><a href="#agents">Our agents</a></li>
              <li><a href="#stories">Success stories</a></li>
              <li><a href="#cta">List a property</a></li>
            </ul>
          </div>
          <div className="footer-col footer-col--news">
            <h4>Market letter</h4>
            <p>Neighbourhood trends and fresh listings, every other Thursday.</p>
            <form className="foot-news" data-newsletter noValidate>
              <label className="sr-only" htmlFor="foot-email">Email address</label>
              <input id="foot-email" type="email" name="email" placeholder="you@email.com" required />
              <button type="submit" aria-label="Subscribe">
                <svg className="ic" aria-hidden="true"><use href="#i-arrow"></use></svg>
              </button>
            </form>
            <p className="cta-note" data-newsletter-note hidden>You're on the list.</p>
          </div>
        </div>
      </div>

      {/* Blended Maintenance & Service Areas Banner */}
      <div className="wrap footer-maint-wrapper" id="maintenance">
          <div className="footer-maint-card">
            <h4>Need a repair?</h4>
            <p>
              Current residents can submit a maintenance request anytime — emergencies are answered 24/7.
            </p>
            
            <a className="btn-maint-submit" href="#maintenance">
              Submit a maintenance request
            </a>

            <div className="areas-served" aria-label="Areas served">
              <span className="area-pill">Austin</span>
              <span className="area-pill">Round Rock</span>
              <span className="area-pill">Cedar Park</span>
              <span className="area-pill">Pflugerville</span>
              <span className="area-pill">Georgetown</span>
              <span className="area-pill">Leander</span>
            </div>
          </div>
        </div>

      <div className="wrap footer-bottom">
        <p>&copy; 2026 Acre. A free template by <a href="https://uicookies.com/">uiCookies</a>.</p>
        <p className="footer-credit">Demo photos from <a href="https://loremflickr.com/">LoremFlickr</a> &amp; <a href="https://pravatar.cc/">Pravatar</a>. For demo use.</p>
      </div>
    </footer>
  );
}