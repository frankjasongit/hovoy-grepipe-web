import './App.css'

const productFamilies = [
  {
    title: 'GRE Pipe Systems',
    text: 'Filament-wound glass-reinforced epoxy piping for corrosive process water, chemical transfer, and industrial utility service.',
  },
  {
    title: 'Fittings and Fabrication',
    text: 'Elbows, tees, reducers, flanges, and custom fabricated assemblies matched to project pressure class and service media.',
  },
  {
    title: 'Joining Solutions',
    text: 'Adhesive-bonded, laminated, and flanged connection strategies selected around installation speed, field serviceability, and lifecycle reliability.',
  },
  {
    title: 'Project Support',
    text: 'Commercial quotations, packing plans, export support, and application-focused recommendations for overseas distributors and contractors.',
  },
]

const sectors = [
  'Industrial water treatment',
  'Chemical process lines',
  'Mining and slurry utility systems',
  'Marine and desalination projects',
  'Power plant auxiliary piping',
  'Municipal corrosion-resistant networks',
]

const reasons = [
  'Corrosion resistance for aggressive media and wet service environments',
  'Lower installed weight than steel systems, reducing handling and support load',
  'Smooth bore and stable hydraulic performance for process efficiency',
  'Customizable fittings and spool fabrication for project-based delivery',
]

function App() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-badge">HG</div>
          <div>
            <p className="brand-name">Hovoy GRE Pipe</p>
            <p className="brand-tag">Industrial GRE piping systems for export markets</p>
          </div>
        </div>
        <nav className="topnav">
          <a href="#products">Products</a>
          <a href="#applications">Applications</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Restarting The Hovoy GRE Pipe Brand</p>
            <h1>Corrosion-resistant GRE piping for industrial fluid systems.</h1>
            <p className="hero-text">
              This new site is being rebuilt as a dedicated export-facing platform for GRE pipe,
              fittings, and engineered process piping packages. The first release focuses on a
              clean commercial structure, clear product architecture, and lead-ready contact flow.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                Request Product Details
              </a>
              <a className="button button-secondary" href="#products">
                Explore Product Scope
              </a>
            </div>
            <dl className="hero-stats">
              <div>
                <dt>Domain</dt>
                <dd>hovoy-grepipe.com</dd>
              </div>
              <div>
                <dt>Business Focus</dt>
                <dd>GRE pipes, fittings, export quoting</dd>
              </div>
              <div>
                <dt>Contact Channel</dt>
                <dd>sales@hovoy-grepipe.com</dd>
              </div>
            </dl>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="pipe-graphic">
              <div className="pipe pipe-main" />
              <div className="pipe pipe-branch pipe-branch-top" />
              <div className="pipe pipe-branch pipe-branch-bottom" />
              <div className="pipe-ring pipe-ring-one" />
              <div className="pipe-ring pipe-ring-two" />
              <div className="pipe-panel">
                <span>GRE</span>
                <strong>Piping</strong>
                <small>Export-ready product platform</small>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-grid" id="products">
          <div className="section-heading">
            <p className="eyebrow">Product Architecture</p>
            <h2>Launch the site around four commercial entry points.</h2>
            <p>
              The first milestone is not a full catalog. It is a disciplined structure that can
              accept real product data, quotations, and application pages without drifting into a
              generic trading site.
            </p>
          </div>
          <div className="family-grid">
            {productFamilies.map((item) => (
              <article className="family-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section capability-band" id="applications">
          <div className="capability-copy">
            <p className="eyebrow">Why GRE</p>
            <h2>Position the brand around application fit, not commodity pipe listings.</h2>
            <p>
              Overseas buyers respond better to service context, corrosion resistance, connection
              method, and project support than to unstructured product dumps. This rebuild should
              present Hovoy as a focused industrial piping supplier rather than a generic directory
              page.
            </p>
          </div>
          <div className="reason-list">
            {reasons.map((reason) => (
              <div className="reason-item" key={reason}>
                <span />
                <p>{reason}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section section-grid">
          <div className="section-heading">
            <p className="eyebrow">Target Sectors</p>
            <h2>Use application language that overseas buyers actually search for.</h2>
          </div>
          <div className="sector-grid">
            {sectors.map((sector) => (
              <article className="sector-card" key={sector}>
                <p>{sector}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section roadmap" id="about">
          <div className="section-heading">
            <p className="eyebrow">Build Plan</p>
            <h2>What this independent project will deliver next.</h2>
          </div>
          <div className="timeline">
            <article>
              <strong>Phase 1</strong>
              <p>Brand reset, information architecture, homepage, and inquiry-ready contact flow.</p>
            </article>
            <article>
              <strong>Phase 2</strong>
              <p>Product family pages for GRE pipes, fittings, joint systems, and key applications.</p>
            </article>
            <article>
              <strong>Phase 3</strong>
              <p>Technical data sheets, downloadable PDFs, SEO landing pages, and distributor-ready content.</p>
            </article>
          </div>
        </section>

        <section className="section contact-panel" id="contact">
          <div>
            <p className="eyebrow">Contact Setup</p>
            <h2>The new business line is now separated from Lithostek and ready for its own stack.</h2>
            <p>
              Next operational steps: bind the domain, keep free email routing active for launch,
              and move to paid mailbox hosting once the site starts generating qualified inquiries.
            </p>
          </div>
          <div className="contact-card">
            <p>Primary inquiry email</p>
            <a href="mailto:sales@hovoy-grepipe.com">sales@hovoy-grepipe.com</a>
            <span>Website domain: hovoy-grepipe.com</span>
            <span>Project status: fresh rebuild in progress</span>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
