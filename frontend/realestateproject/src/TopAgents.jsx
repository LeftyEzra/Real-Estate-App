export default function TopAgents() {


  return (

    <section className="section" id="agents" aria-labelledby="agents-title">
                    <div className="wrap">
                      <div className="section-head section-head--row">
                        <div>
                          <p className="kicker">People, not portals</p>
                          <h2 className="section-title" id="agents-title">Top agents this season</h2>
                        </div>
                        <a className="link-arrow" href="#agents">Meet the whole team <svg className="ic" aria-hidden="true"><use href="#i-arrow"></use></svg></a>
                      </div>
                      <div className="agents-grid">
                        <article className="agent-card">
                          <div className="agent-photo"><img src="img/agent-01.jpg" alt="Dana Alvarez, senior agent" loading="lazy" width="180" height="180" /></div>
                          <h3 className="agent-name">Dana Alvarez</h3>
                          <p className="agent-role">Senior Agent · Austin</p>
                          <p className="agent-rating"><svg className="ic star" aria-hidden="true"><use href="#i-star"></use></svg><strong>4.9</strong><span>128 reviews</span></p>
                          <p className="agent-meta">210 homes sold</p>
                          <div className="agent-chips"><span>Family homes</span><span>New builds</span></div>
                          <a className="agent-contact" href="#cta"><svg className="ic" aria-hidden="true"><use href="#i-phone"></use></svg>Contact</a>
                        </article>
                        <article className="agent-card">
                          <div className="agent-photo"><img src="img/agent-02.jpg" alt="Marcus Bell, listings lead" loading="lazy" width="180" height="180" /></div>
                          <h3 className="agent-name">Marcus Bell</h3>
                          <p className="agent-role">Listings Lead · Seattle</p>
                          <p className="agent-rating"><svg className="ic star" aria-hidden="true"><use href="#i-star"></use></svg><strong>4.8</strong><span>176 reviews</span></p>
                          <p className="agent-meta">176 homes sold</p>
                          <div className="agent-chips"><span>Waterfront</span><span>Condos</span></div>
                          <a className="agent-contact" href="#cta"><svg className="ic" aria-hidden="true"><use href="#i-phone"></use></svg>Contact</a>
                        </article>
                        <article className="agent-card">
                          <div className="agent-photo"><img src="img/agent-03.jpg" alt="Priya Nair, estate specialist" loading="lazy" width="180" height="180" /></div>
                          <h3 className="agent-name">Priya Nair</h3>
                          <p className="agent-role">Estate Specialist · Charleston</p>
                          <p className="agent-rating"><svg className="ic star" aria-hidden="true"><use href="#i-star"></use></svg><strong>5.0</strong><span>94 reviews</span></p>
                          <p className="agent-meta">94 homes sold</p>
                          <div className="agent-chips"><span>Heritage</span><span>Luxury</span></div>
                          <a className="agent-contact" href="#cta"><svg className="ic" aria-hidden="true"><use href="#i-phone"></use></svg>Contact</a>
                        </article>
                        <article className="agent-card">
                          <div className="agent-photo"><img src="img/agent-04.jpg" alt="Theo Marsh, rentals manager" loading="lazy" width="180" height="180" /></div>
                          <h3 className="agent-name">Theo Marsh</h3>
                          <p className="agent-role">Rentals Manager · Denver</p>
                          <p className="agent-rating"><svg className="ic star" aria-hidden="true"><use href="#i-star"></use></svg><strong>4.7</strong><span>203 reviews</span></p>
                          <p className="agent-meta">320 homes leased</p>
                          <div className="agent-chips"><span>Rentals</span><span>Lofts</span></div>
                          <a className="agent-contact" href="#cta"><svg className="ic" aria-hidden="true"><use href="#i-phone"></use></svg>Contact</a>
                        </article>
                      </div>
                    </div>
                  </section>

  );
}