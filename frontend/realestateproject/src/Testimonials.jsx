export default function Testimonials() {


  return (

   <section className="section section--porcelain quotes" id="stories" aria-labelledby="stories-title">
                    <div className="wrap">
                      <div className="section-head ">
                        <p className="kicker">Moved in with Acre</p>
                        <h2 className="section-title" id="stories-title">Buyers who stopped scrolling</h2>
                      </div>
                      <div className="quote-grid">
                        <figure className="quote-card ">
                          <div className="quote-mark" aria-hidden="true">&ldquo;</div>
                          <blockquote>We saw eleven homes online, toured three in 3D, and only drove to the one we bought. Acre saved us a month of weekends.</blockquote>
                          <figcaption className="quote-author">
                            <img src="img/agent-05.jpg" alt="" width="48" height="48" />
                            <span><strong>Elena &amp; Rob Whitfield</strong>Bought in Austin, TX</span>
                          </figcaption>
                        </figure>
                        <figure className="quote-card ">
                          <div className="quote-mark" aria-hidden="true">&ldquo;</div>
                          <blockquote>The fee breakdown was the whole thing for me. No surprises at closing, no chasing anyone for numbers. It just added up.</blockquote>
                          <figcaption className="quote-author">
                            <img src="img/agent-06.jpg" alt="" width="48" height="48" />
                            <span><strong>Marcus Deland</strong>Rented in Denver, CO</span>
                          </figcaption>
                        </figure>
                      </div>
                    </div>
                  </section>

  );
}