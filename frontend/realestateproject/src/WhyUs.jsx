export default function WhyUs() {
  return (
    
    <section className="section section--ink why" id="why" aria-labelledby="why-title">
        <div className="wrap why-grid">
            <div className="why-media ">
            <div className="media-frame">
                <img src="/img/feature.jpg" alt="A warm, sunlit living room with a period fireplace and hardwood floors" loading="lazy" width="620" height="520" />
            </div>
            <div className="why-badge" aria-hidden="true">
                <strong>96%</strong>
                <span>of buyers found their home faster with Acre</span>
            </div>
            </div>
            <div className="why-copy ">
            <p className="kicker kicker--onink">Why Us</p>
            <h2 className="section-title section-title--onink" id="why-title">A marketplace that respects your time</h2>
            <p className="section-intro section-intro--onink">We built Acre for the searching, not the scrolling. Fewer dead ends, honest numbers, and people who actually pick up the phone.</p>
            <ul className="why-list">
                <li className="why-item">
                <span className="why-ico"><svg className="ic" aria-hidden="true"><use href="#i-shield"></use></svg></span>
                <div>
                    <h3>Every listing verified</h3>
                    <p>No ghost listings or bait pricing. We check each address and pull it the moment it's off the market.</p>
                </div>
                </li>
                <li className="why-item">
                <span className="why-ico"><svg className="ic" aria-hidden="true"><use href="#i-tour"></use></svg></span>
                <div>
                    <h3>Walk it in 3D first</h3>
                    <p>Tour homes room by room from the sofa, so every visit you book is one worth driving to.</p>
                </div>
                </li>
                <li className="why-item">
                <span className="why-ico"><svg className="ic" aria-hidden="true"><use href="#i-tag"></use></svg></span>
                <div>
                    <h3>Prices you can trust</h3>
                    <p>Real asking prices with a full fee breakdown up front &mdash; taxes, HOA and closing, all in one view.</p>
                </div>
                </li>
                <li className="why-item">
                <span className="why-ico"><svg className="ic" aria-hidden="true"><use href="#i-pin"></use></svg></span>
                <div>
                    <h3>Agents who know the block</h3>
                    <p>Local specialists who live where they sell &mdash; never a call centre reading from a script.</p>
                </div>
                </li>
            </ul>
            </div>
        </div>
    </section>
                  
  );
}