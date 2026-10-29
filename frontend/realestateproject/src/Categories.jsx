export default function Categories() {
  return (

          <section className="section section--porcelain" id="categories" aria-labelledby="cat-title">
                    <div className="wrap">
                      <div className="section-head ">
                        <p className="kicker">Browse by type</p>
                        <h2 className="section-title" id="cat-title">Whatever "home" means to you</h2>
                      </div>
                      <div className="cat-grid">
                        <a className="cat-tile " href="#listings">
                          <span className="cat-icon"><svg className="ic" aria-hidden="true"><use href="#i-house"></use></svg></span>
                          <span className="cat-name">Houses</span>
                          <span className="cat-count">2,140 listings</span>
                        </a>
                        <a className="cat-tile " href="#listings">
                          <span className="cat-icon"><svg className="ic" aria-hidden="true"><use href="#i-building"></use></svg></span>
                          <span className="cat-name">Apartments</span>
                          <span className="cat-count">1,380 listings</span>
                        </a>
                        <a className="cat-tile " href="#listings">
                          <span className="cat-icon"><svg className="ic" aria-hidden="true"><use href="#i-condo"></use></svg></span>
                          <span className="cat-name">Condos</span>
                          <span className="cat-count">720 listings</span>
                        </a>
                        <a className="cat-tile " href="#listings">
                          <span className="cat-icon"><svg className="ic" aria-hidden="true"><use href="#i-villa"></use></svg></span>
                          <span className="cat-name">Villas</span>
                          <span className="cat-count">240 listings</span>
                        </a>
                        <a className="cat-tile " href="#listings">
                          <span className="cat-icon"><svg className="ic" aria-hidden="true"><use href="#i-town"></use></svg></span>
                          <span className="cat-name">Townhouses</span>
                          <span className="cat-count">390 listings</span>
                        </a>
                        <a className="cat-tile " href="#listings">
                          <span className="cat-icon"><svg className="ic" aria-hidden="true"><use href="#i-studio"></use></svg></span>
                          <span className="cat-name">Studios</span>
                          <span className="cat-count">510 listings</span>
                        </a>
                      </div>
                    </div>
                  </section>
    
  );
}