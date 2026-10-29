export default function Testimonials() {


  return (

  <section className="section cta" id="cta" aria-labelledby="cta-title">
                    <div className="wrap cta-inner ">
                      <div className="cta-copy">
                        <p className="kicker kicker--onink">Ready when you are</p>
                        <h2 className="section-title section-title--onink" id="cta-title">Ready to find your acre?</h2>
                        <p className="section-intro section-intro--onink">Create a free account to save homes, get price-drop alerts, and message local agents directly. Selling instead? We'll value your place in 24 hours.</p>
                        <ul className="cta-points">
                          <li><svg className="ic" aria-hidden="true"><use href="#i-check"></use></svg>Free forever for buyers and renters</li>
                          <li><svg className="ic" aria-hidden="true"><use href="#i-check"></use></svg>Instant price-drop &amp; new-listing alerts</li>
                          <li><svg className="ic" aria-hidden="true"><use href="#i-check"></use></svg>Talk to a real, local agent</li>
                        </ul>
                      </div>
                      <form className="cta-form" data-newsletter noValidate>
                        <h3 className="cta-form-title">Start your search</h3>
                        <label className="cta-field">
                          <span>Full name</span>
                          <input type="text" name="name" placeholder="Jordan Ellis" autoComplete="name" />
                        </label>
                        <label className="cta-field">
                          <span>Email address</span>
                          <input type="email" name="email" placeholder="you@email.com" autoComplete="email" required />
                        </label>
                        <button className="btn btn--amber btn--block" type="submit">Create free account</button>
                        <p className="cta-alt">Prefer to talk? <a href="#agents">Call an agent</a></p>
                        <p className="cta-note" data-newsletter-note hidden>Welcome to Acre &mdash; check your inbox to confirm.</p>
                      </form>
                    </div>
                  </section>

  );
}