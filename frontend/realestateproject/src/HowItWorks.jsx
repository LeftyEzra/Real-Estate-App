

export default function HowItWorks() {


  return (

    <section className="section section--porcelain" id="how" aria-labelledby="how-title">
        <div className="wrap">
            <div className="section-head ">
            <p className="kicker">How it works</p>
            <h2 className="section-title" id="how-title">From first search to front-door keys</h2>
            </div>
            <ol className="steps">
            <li className="step ">
                <span className="step-num">01</span>
                <span className="step-ico"><svg className="ic" aria-hidden="true"><use href="#i-search"></use></svg></span>
                <h3>Search &amp; save</h3>
                <p>Filter by city, price and beds, then tap the heart to build a shortlist that syncs across your devices.</p>
            </li>
            <li className="step ">
                <span className="step-num">02</span>
                <span className="step-ico"><svg className="ic" aria-hidden="true"><use href="#i-calendar"></use></svg></span>
                <h3>Book a tour</h3>
                <p>Pick a slot that suits you, in person or virtual, and your local agent confirms in minutes &mdash; not days.</p>
            </li>
            <li className="step ">
                <span className="step-num">03</span>
                <span className="step-ico"><svg className="ic" aria-hidden="true"><use href="#i-key"></use></svg></span>
                <h3>Make it yours</h3>
                <p>Submit an offer, track every milestone in one place, and get the keys with zero mystery paperwork.</p>
            </li>
            </ol>
        </div>
    </section>

  );
}

