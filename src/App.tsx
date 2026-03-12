import './App.css'

const productLines = [
  {
    title: 'GRE Pipes',
    text: 'Filament-wound glass-reinforced epoxy pipe systems for corrosive liquids, industrial water transfer, marine utility duty, and chemical process service.',
    points: [
      'Straight pipe supply by project scope',
      'Pressure-class matching for engineered systems',
      'Smooth internal bore for hydraulic efficiency',
    ],
  },
  {
    title: 'Fittings and Spools',
    text: 'Elbows, tees, reducers, flanges, manifolds, and custom fabricated GRE spool assemblies built around actual routing and installation constraints.',
    points: [
      'Standard and custom geometry',
      'Matched fittings for pressure and media',
      'Export packing for project shipments',
    ],
  },
  {
    title: 'Jointing Solutions',
    text: 'Adhesive-bonded, laminated, flanged, and application-specific joining approaches selected for lifecycle reliability and field practicality.',
    points: [
      'Support for field installation planning',
      'Connection method aligned to service conditions',
      'Maintenance-aware system selection',
    ],
  },
  {
    title: 'Project Support',
    text: 'Commercial quotation support, technical clarification, packing strategy, and export-facing communication for distributors, EPCs, and contractors.',
    points: [
      'RFQ response support',
      'Commercial and technical coordination',
      'Lead-ready contact path for overseas buyers',
    ],
  },
]

const sectors = [
  {
    title: 'Industrial Water Treatment',
    text: 'GRE piping for filtration skids, cooling loops, utility transfer, and corrosion-sensitive plant water systems.',
  },
  {
    title: 'Chemical Processing',
    text: 'Pipe and fittings for aggressive media handling where steel corrosion, maintenance, and weight become commercial problems.',
  },
  {
    title: 'Desalination and Marine',
    text: 'Seawater-compatible piping concepts for intake, discharge, and auxiliary lines in coastal and marine environments.',
  },
  {
    title: 'Mining and Utilities',
    text: 'Lightweight corrosion-resistant systems for utility lines, wash water, and harsh-site service conditions.',
  },
  {
    title: 'Power and FGD Support',
    text: 'Auxiliary piping and corrosive utility systems in plants that need reliable composite alternatives to metal pipework.',
  },
  {
    title: 'Municipal Infrastructure',
    text: 'Long-life corrosion-resistant networks for water, wastewater, and treatment-related applications.',
  },
]

const engineeringCapabilities = [
  {
    title: 'Application-Led Selection',
    text: 'We structure product recommendations around service media, temperature, pressure class, installation method, and project environment.',
  },
  {
    title: 'System-Level Supply',
    text: 'The site is being built to present not only pipe but also fittings, joints, spools, and project-ready delivery logic.',
  },
  {
    title: 'Export Communication',
    text: 'Inquiry flow, scope confirmation, and documentation language are being shaped for overseas buyers rather than domestic catalog traffic.',
  },
]

const technicalHighlights = [
  'Corrosion resistance for wet, saline, and chemically aggressive environments',
  'Lower system weight than steel alternatives, reducing handling and support burden',
  'Hydraulically smooth inner surface for stable flow performance',
  'Flexible project-based fabrication instead of one-size-fits-all catalog supply',
]

const processSteps = [
  {
    step: '01',
    title: 'Inquiry Review',
    text: 'We start from application, media, pressure, diameter range, standards, and destination market rather than price-only quoting.',
  },
  {
    step: '02',
    title: 'System Matching',
    text: 'Pipe, fittings, and joining methods are aligned to actual service conditions and practical installation constraints.',
  },
  {
    step: '03',
    title: 'Commercial Package',
    text: 'Quotation, scope summary, and export-oriented communication are prepared for distributors, EPCs, and plant buyers.',
  },
  {
    step: '04',
    title: 'Project Delivery',
    text: 'The platform is being structured around technical follow-up, packing logic, and scalable support for repeat inquiries.',
  },
]

const faqs = [
  {
    question: 'What is GRE pipe used for?',
    answer:
      'GRE pipe is used in corrosion-sensitive industrial piping systems such as water treatment, chemical transfer, marine service, desalination, and other aggressive utility applications.',
  },
  {
    question: 'Can Hovoy supply fittings and fabricated spools together with pipe?',
    answer:
      'Yes. The site is being structured around system-level supply, including GRE pipes, fittings, joining approaches, and custom spool assemblies matched to project scope.',
  },
  {
    question: 'Is this website intended for export inquiries?',
    answer:
      'Yes. The commercial structure, contact path, and future resource content are being built specifically for international distributors, contractors, and industrial buyers.',
  },
  {
    question: 'What information should buyers send in an inquiry?',
    answer:
      'The most useful RFQs include application details, media, diameter range, pressure class, fittings scope, destination country, and any drawings or line lists available.',
  },
]

function App() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Hovoy GRE Pipe',
    url: 'https://hovoy-grepipe.com',
    email: 'sales@hovoy-grepipe.com',
    description:
      'Hovoy GRE Pipe supplies corrosion-resistant GRE pipe systems, fittings, and project support for industrial export markets.',
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="site-shell">
        <header className="topbar">
          <div className="brand-lockup">
            <div className="brand-badge">HG</div>
            <div>
              <p className="brand-name">Hovoy GRE Pipe</p>
              <p className="brand-tag">Corrosion-resistant piping systems for industrial projects</p>
            </div>
          </div>
          <nav className="topnav" aria-label="Primary">
            <a href="#products">Products</a>
            <a href="#applications">Applications</a>
            <a href="#engineering">Engineering</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <main>
          <section className="hero" id="top">
            <div className="hero-copy">
              <p className="eyebrow">Industrial GRE Pipe Manufacturer Website Build</p>
              <h1>GRE pipe systems for industrial water, chemical, marine, and corrosive process duty.</h1>
              <p className="hero-text">
                Hovoy GRE Pipe is being rebuilt as an export-focused industrial website for glass
                reinforced epoxy pipe systems, fittings, jointing solutions, and project-ready
                support. The structure is designed around how serious buyers search: products,
                applications, technical fit, engineering support, and clear inquiry routes.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">
                  Request a Quote
                </a>
                <a className="button button-secondary" href="#products">
                  View Product Scope
                </a>
              </div>
              <dl className="hero-stats">
                <div>
                  <dt>Focus</dt>
                  <dd>GRE pipes, fittings, and system support</dd>
                </div>
                <div>
                  <dt>Markets</dt>
                  <dd>Industrial export and project supply</dd>
                </div>
                <div>
                  <dt>Contact</dt>
                  <dd>sales@hovoy-grepipe.com</dd>
                </div>
              </dl>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="pipe-graphic">
                <div className="grid-overlay" />
                <div className="pipe pipe-main" />
                <div className="pipe pipe-branch pipe-branch-top" />
                <div className="pipe pipe-branch pipe-branch-bottom" />
                <div className="pipe-ring pipe-ring-one" />
                <div className="pipe-ring pipe-ring-two" />
                <div className="pipe-callout callout-one">
                  <span>Service Media</span>
                  <strong>Water / Chemicals / Seawater</strong>
                </div>
                <div className="pipe-callout callout-two">
                  <span>Supply Mode</span>
                  <strong>Pipes + Fittings + Spools</strong>
                </div>
                <div className="pipe-panel">
                  <span>Hovoy</span>
                  <strong>GRE Systems</strong>
                  <small>Built for application fit, not directory-style listing pages.</small>
                </div>
              </div>
            </div>
          </section>

          <section className="trust-strip" aria-label="Industrial positioning">
            <p>Corrosion-resistant piping</p>
            <p>Project-ready fittings</p>
            <p>Export inquiry support</p>
            <p>Industrial application pages</p>
            <p>SEO-friendly structure</p>
          </section>

          <section className="section section-grid" id="products">
            <div className="section-heading">
              <p className="eyebrow">Product Structure</p>
              <h2>Organize the site the way industrial buyers expect to navigate it.</h2>
              <p>
                Strong industrial websites lead with product families, industries, engineering
                support, and commercial clarity. This homepage now sets up those entry points so
                the site can expand into detailed GRE product pages without losing focus.
              </p>
            </div>

            <div className="product-grid">
              {productLines.map((item) => (
                <article className="product-card" key={item.title}>
                  <div className="card-index" aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="section section-grid" id="applications">
            <div className="section-heading section-heading-split">
              <div>
                <p className="eyebrow">Applications</p>
                <h2>Use the language buyers search for when they need GRE pipe.</h2>
              </div>
              <p>
                International industrial websites perform better when application sectors are
                visible near the top. That helps both buyers and search engines understand the
                practical context of the product offer.
              </p>
            </div>

            <div className="sector-grid">
              {sectors.map((sector) => (
                <article className="sector-card" key={sector.title}>
                  <h3>{sector.title}</h3>
                  <p>{sector.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section capability-band" id="engineering">
            <div className="capability-copy">
              <p className="eyebrow">Engineering Fit</p>
              <h2>Position Hovoy around system thinking, not commodity pipe trading.</h2>
              <p>
                The strongest industrial manufacturers do not treat the homepage as a loose
                product list. They show how the company helps buyers select, configure, and
                deliver systems. That is the model this rebuild follows.
              </p>
            </div>

            <div className="capability-grid">
              {engineeringCapabilities.map((item) => (
                <article className="capability-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section section-grid">
            <div className="section-heading">
              <p className="eyebrow">Technical Value</p>
              <h2>Explain why GRE piping is commercially attractive in real plants.</h2>
            </div>

            <div className="highlight-grid">
              {technicalHighlights.map((item) => (
                <div className="highlight-card" key={item}>
                  <span className="highlight-marker" aria-hidden="true" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="section roadmap" id="process">
            <div className="section-heading">
              <p className="eyebrow">Project Workflow</p>
              <h2>Show buyers what happens after they contact you.</h2>
            </div>
            <div className="timeline">
              {processSteps.map((item) => (
                <article key={item.step}>
                  <span>{item.step}</span>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section section-grid faq-section" id="faq">
            <div className="section-heading section-heading-split">
              <div>
                <p className="eyebrow">FAQ</p>
                <h2>Give search engines and buyers direct answers about GRE pipe supply.</h2>
              </div>
              <p>
                This section supports SEO and conversion at the same time. It answers the queries
                that buyers typically ask before they send drawings, line lists, or a formal RFQ.
              </p>
            </div>

            <div className="faq-list">
              {faqs.map((item) => (
                <article className="faq-card" key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section contact-panel" id="contact">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Ready for the next phase: product pages, technical resources, and lead capture.</h2>
              <p>
                The foundation is now aligned with how industrial manufacturers structure web
                traffic: product entry points, application fit, engineering logic, and a clear
                contact destination. Next steps can include dedicated product pages, downloadable
                GRE data sheets, and sector-specific SEO landing pages.
              </p>
            </div>
            <div className="contact-card">
              <p>Primary inquiry email</p>
              <a href="mailto:sales@hovoy-grepipe.com">sales@hovoy-grepipe.com</a>
              <span>Website: hovoy-grepipe.com</span>
              <span>Focus: GRE pipes, fittings, and export project support</span>
              <a className="button button-primary contact-button" href="mailto:sales@hovoy-grepipe.com">
                Send Inquiry
              </a>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div>
            <p className="brand-name">Hovoy GRE Pipe</p>
            <p className="footer-note">
              Industrial GRE piping systems for corrosion-resistant process and utility
              applications.
            </p>
          </div>
          <nav className="footer-nav" aria-label="Footer">
            <a href="#products">Products</a>
            <a href="#applications">Applications</a>
            <a href="#engineering">Engineering</a>
            <a href="#contact">Contact</a>
          </nav>
        </footer>
      </div>
    </>
  )
}

export default App
