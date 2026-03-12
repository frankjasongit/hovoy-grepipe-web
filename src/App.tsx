import { BrowserRouter, Link, NavLink, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import {
  applicationPages,
  faqItems,
  productPages,
  secondaryNav,
  siteUrl,
} from './siteData'

type MetaConfig = {
  title: string
  description: string
  path: string
}

function ensureMetaAttribute(
  selector: string,
  attributeName: 'name' | 'property',
  attributeValue: string,
) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector)

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attributeName, attributeValue)
    document.head.appendChild(tag)
  }

  return tag
}

function usePageMeta({ title, description, path }: MetaConfig) {
  useEffect(() => {
    document.title = title

    const descriptionTag = ensureMetaAttribute('meta[name="description"]', 'name', 'description')
    descriptionTag.content = description

    const ogTitleTag = ensureMetaAttribute('meta[property="og:title"]', 'property', 'og:title')
    ogTitleTag.content = title

    const ogDescriptionTag = ensureMetaAttribute(
      'meta[property="og:description"]',
      'property',
      'og:description',
    )
    ogDescriptionTag.content = description

    const canonicalUrl = `${siteUrl}${path}`
    const ogUrlTag = ensureMetaAttribute('meta[property="og:url"]', 'property', 'og:url')
    ogUrlTag.content = canonicalUrl

    let canonicalTag = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonicalTag) {
      canonicalTag = document.createElement('link')
      canonicalTag.rel = 'canonical'
      document.head.appendChild(canonicalTag)
    }
    canonicalTag.href = canonicalUrl
  }, [description, path, title])
}

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return null
}

function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <header className="topbar">
        <Link className="brand-lockup" to="/">
          <div className="brand-badge">HG</div>
          <div>
            <p className="brand-name">Hovoy Composite Pipe</p>
            <p className="brand-tag">Well, line, marine, and flexible composite pipe systems</p>
          </div>
        </Link>

        <nav className="topnav" aria-label="Primary">
          {secondaryNav.map((item) => (
            <NavLink
              className={({ isActive }) => (isActive ? 'navlink navlink-active' : 'navlink')}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div>
          <p className="brand-name">Hovoy Composite Pipe</p>
          <p className="footer-note">
            Export-focused composite pipe systems for well tubing and casing, line pipe, marine
            piping, flexible pipe, and project-driven industrial applications.
          </p>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          {secondaryNav.map((item) => (
            <NavLink
              className={({ isActive }) => (isActive ? 'navlink navlink-active' : 'navlink')}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </footer>
    </div>
  )
}

function HomePage() {
  usePageMeta({
    title: 'Hovoy Composite Pipe | Well, Line, Marine, and Flexible Pipe Systems',
    description:
      'Hovoy Composite Pipe supplies well tubing and casing, line pipe, marine and offshore pipe, flexible composite pipe, fittings, and engineering support for industrial export projects.',
    path: '/',
  })

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Hovoy Composite Pipe',
    url: siteUrl,
    email: 'sales@hovoy-grepipe.com',
    description:
      'Hovoy Composite Pipe supplies well tubing and casing, line pipe, marine pipe, flexible composite pipe, and engineered project support.',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Composite Pipe Systems For Industrial Projects</p>
          <h1>Composite pipe systems for well service, line transport, marine duty, and flexible flowlines.</h1>
          <p className="hero-text">
            Hovoy Composite Pipe supplies rigid and flexible composite pipe solutions for corrosive,
            weight-sensitive, and project-driven applications. Our portfolio covers well tubing and
            casing, line pipe, marine and offshore systems, flexible composite pipe, and matching
            fittings for oil and gas, water treatment, desalination, marine, and chemical service.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/products">
              Explore Product Lines
            </Link>
            <Link className="button button-secondary" to="/contact">
              Send RFQ
            </Link>
          </div>
          <dl className="hero-stats">
            <div>
              <dt>Product Focus</dt>
              <dd>Well, line, marine, flexible, fittings</dd>
            </div>
            <div>
              <dt>Market Logic</dt>
              <dd>Export, EPC, distributor, project supply</dd>
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
              <span>Pipeline Scope</span>
              <strong>Well / Line / Marine / Flexible</strong>
            </div>
            <div className="pipe-callout callout-two">
              <span>Commercial Logic</span>
              <strong>Products + Applications + Engineering</strong>
            </div>
            <div className="pipe-panel">
              <span>Hovoy</span>
              <strong>Composite Pipe</strong>
              <small>Engineered supply for industrial, marine, and energy pipeline applications.</small>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Industrial positioning">
        <p>Well tubing and casing</p>
        <p>Line pipe systems</p>
        <p>Marine and offshore pipe</p>
        <p>Flexible composite pipe</p>
        <p>Engineering-led RFQ path</p>
      </section>

      <section className="section section-grid">
        <div className="section-heading">
          <p className="eyebrow">Products</p>
          <h2>Composite pipe product lines for distinct operating environments.</h2>
          <p>
            Each product family serves different service conditions, installation methods, and
            project priorities. Explore dedicated pages for well pipe, line pipe, marine systems,
            flexible flowlines, and fittings.
          </p>
        </div>

        <div className="product-grid">
          {productPages.map((item) => (
            <article className="product-card" key={item.slug}>
              <div className="card-index" aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <ul>
                {item.highlights.slice(0, 3).map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Link className="text-link" to={`/products/${item.slug}`}>
                View product page
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-grid">
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">Applications</p>
            <h2>Application-focused solutions for demanding industrial sectors.</h2>
          </div>
          <p>
            Composite pipe selection depends on service media, corrosion risk, installation method,
            and operating environment. Our application pages connect those conditions to the right
            product family and support package.
          </p>
        </div>

        <div className="sector-grid">
          {applicationPages.map((item) => (
            <article className="sector-card" key={item.slug}>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <Link className="text-link" to={`/applications/${item.slug}`}>
                View application page
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section capability-band">
        <div className="capability-copy">
          <p className="eyebrow">Engineering Support</p>
          <h2>Material selection, joint methods, and project-oriented technical support.</h2>
          <p>
            Product selection is only one part of the supply decision. Buyers also need clear
            support on connection systems, service conditions, documentation, and project
            coordination before moving to quotation or technical review.
          </p>
        </div>

        <div className="capability-grid">
          <article className="capability-card">
            <h3>Material Systems</h3>
            <p>Explain GRE, composite construction logic, and selection rationale by service duty.</p>
          </article>
          <article className="capability-card">
            <h3>Joint Systems</h3>
            <p>Show how threaded, bonded, laminated, flanged, and flexible connection methods fit different projects.</p>
          </article>
          <article className="capability-card">
            <h3>Standards and Quality</h3>
            <p>Give buyers a dedicated place for testing, compliance, manufacturing control, and documentation logic.</p>
          </article>
        </div>
      </section>

      <section className="section section-grid">
        <div className="section-heading">
          <p className="eyebrow">Project Workflow</p>
          <h2>From inquiry review to product matching and delivery support.</h2>
        </div>

        <div className="timeline">
          <article>
            <span>01</span>
            <strong>Inquiry Review</strong>
            <p>We start from application, media, pressure class, dimensions, routing scope, and destination market.</p>
          </article>
          <article>
            <span>02</span>
            <strong>Product Matching</strong>
            <p>Rigid or flexible systems, fittings, and connection methods are aligned to service conditions and installation needs.</p>
          </article>
          <article>
            <span>03</span>
            <strong>Technical and Commercial Review</strong>
            <p>Scope clarification, documentation support, and quotation alignment help reduce delays before order placement.</p>
          </article>
          <article>
            <span>04</span>
            <strong>Project Delivery</strong>
            <p>Export communication, packing coordination, and follow-up support continue through project execution.</p>
          </article>
        </div>
      </section>

      <section className="section contact-panel">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Discuss product selection, application fit, and project requirements with Hovoy.</h2>
          <p>
            Our team supports buyers looking for well tubing and casing, line pipe, marine piping,
            flexible composite pipe, fittings, and export-oriented project supply.
          </p>
        </div>

        <div className="contact-card">
          <p>Primary inquiry email</p>
          <a href="mailto:sales@hovoy-grepipe.com">sales@hovoy-grepipe.com</a>
          <span>Send application details, product scope, dimensions, pressure class, and destination market.</span>
          <Link className="button button-primary contact-button" to="/contact">
            Contact Hovoy
          </Link>
        </div>
      </section>
    </>
  )
}

function ProductsPage() {
  usePageMeta({
    title: 'Composite Pipe Products | Well Pipe, Line Pipe, Marine Pipe, Flexible Pipe',
    description:
      'Explore Hovoy composite pipe product lines including well tubing and casing, line pipe, marine and offshore pipe, flexible composite pipe, and fittings and joints.',
    path: '/products/',
  })

  return (
    <PageHero
      eyebrow="Products"
      title="Composite pipe product lines for industrial, marine, and energy projects."
      description="Explore the main Hovoy product families, from well tubing and casing to line pipe, marine systems, flexible composite pipe, and fittings and joints."
    >
      <div className="product-grid">
        {productPages.map((item) => (
          <article className="product-card" key={item.slug}>
            <div className="card-index" aria-hidden="true" />
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <ul>
              {item.highlights.slice(0, 3).map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <Link className="text-link" to={`/products/${item.slug}`}>
              View product page
            </Link>
          </article>
        ))}
      </div>
    </PageHero>
  )
}

function ProductDetailPage() {
  const { slug } = useParams()
  const page = productPages.find((item) => item.slug === slug)

  if (!page) {
    return <Navigate to="/products" replace />
  }

  usePageMeta({
    title: `${page.title} | Hovoy Composite Pipe`,
    description: page.metaDescription,
    path: `/products/${page.slug}/`,
  })

  return (
    <PageHero eyebrow={page.heroEyebrow} title={page.title} description={page.summary}>
      <section className="section section-grid page-section">
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">Product Scope</p>
            <h2>Designed around service conditions and project requirements.</h2>
          </div>
          <p>{page.intro}</p>
        </div>

        <div className="detail-grid">
          <article className="detail-panel">
            <h3>Typical buyer focus</h3>
            <ul className="detail-list">
              {page.buyerFocus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="detail-panel">
            <h3>Key commercial strengths</h3>
            <ul className="detail-list">
              {page.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Applications</p>
          <h2>Where this product line fits.</h2>
        </div>
        <div className="pill-grid">
          {page.applications.map((item) => (
            <span className="pill" key={item}>
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Related Pages</p>
          <h2>Related applications for this product family.</h2>
        </div>
        <div className="sector-grid">
          {applicationPages
            .filter((item) => page.relatedApplications.includes(item.slug))
            .map((item) => (
              <article className="sector-card" key={item.slug}>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <Link className="text-link" to={`/applications/${item.slug}`}>
                  View application page
                </Link>
              </article>
            ))}
        </div>
      </section>

      <CtaSection
        title="Request technical review or quotation support for this product line."
        text="Share the application, media, pressure class, dimensions, fittings scope, and destination market to help us respond more accurately."
      />
    </PageHero>
  )
}

function ApplicationsPage() {
  usePageMeta({
    title: 'Applications | Oil and Gas, Marine, Desalination, Chemical Processing',
    description:
      'Explore Hovoy application pages for oil and gas, marine and offshore, water treatment and desalination, and chemical processing composite piping systems.',
    path: '/applications/',
  })

  return (
    <PageHero
      eyebrow="Applications"
      title="Composite piping solutions for major industrial and marine applications."
      description="Review key application sectors including oil and gas, marine and offshore, desalination, water treatment, and chemical processing."
    >
      <div className="sector-grid">
        {applicationPages.map((item) => (
          <article className="sector-card" key={item.slug}>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <Link className="text-link" to={`/applications/${item.slug}`}>
              View application page
            </Link>
          </article>
        ))}
      </div>
    </PageHero>
  )
}

function ApplicationDetailPage() {
  const { slug } = useParams()
  const page = applicationPages.find((item) => item.slug === slug)

  if (!page) {
    return <Navigate to="/applications" replace />
  }

  usePageMeta({
    title: `${page.title} | Hovoy Composite Pipe`,
    description: page.metaDescription,
    path: `/applications/${page.slug}/`,
  })

  return (
    <PageHero eyebrow={page.heroEyebrow} title={page.title} description={page.summary}>
      <section className="section section-grid page-section">
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">Industry Overview</p>
            <h2>Service demands and operating priorities in this sector.</h2>
          </div>
          <p>{page.intro}</p>
        </div>

        <div className="detail-grid">
          <article className="detail-panel">
            <h3>Typical operating concerns</h3>
            <ul className="detail-list">
              {page.concerns.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="detail-panel">
            <h3>Why composite pipe gets selected</h3>
            <ul className="detail-list">
              {page.advantages.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Recommended Products</p>
          <h2>Product lines commonly used in this application.</h2>
        </div>
        <div className="product-grid">
          {productPages
            .filter((item) => page.relatedProducts.includes(item.slug))
            .map((item) => (
              <article className="product-card" key={item.slug}>
                <div className="card-index" aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <Link className="text-link" to={`/products/${item.slug}`}>
                  View product page
                </Link>
              </article>
            ))}
        </div>
      </section>

      <CtaSection
        title="Discuss application-specific product selection with Hovoy."
        text="If you already know the service media, pressure class, routing scope, or installation environment, send those details with your inquiry for faster review."
      />
    </PageHero>
  )
}

function EngineeringPage() {
  usePageMeta({
    title: 'Engineering | Materials, Joints, Standards, and Quality Logic',
    description:
      'Review Hovoy engineering support for composite pipe systems including material systems, joint methods, standards, quality control, and RFQ preparation.',
    path: '/engineering/',
  })

  return (
    <PageHero
      eyebrow="Engineering"
      title="Engineering support for materials, joints, standards, and quality control."
      description="Product performance depends on more than pipe type alone. Hovoy supports buyers with application-focused guidance on material systems, connection methods, standards, and project documentation."
    >
      <div className="capability-grid">
        <article className="capability-card">
          <h3>Material Systems</h3>
          <p>
            Separate GRE, RTP, and flexible composite logic by product family, service media, and
            operating duty rather than mixing them into one generic brochure page.
          </p>
        </article>
        <article className="capability-card">
          <h3>Joint Methods</h3>
          <p>
            Clarify threaded, bonded, laminated, flanged, and spoolable connection approaches so
            engineering conversations can start from real installation logic.
          </p>
        </article>
        <article className="capability-card">
          <h3>Standards and Certification</h3>
          <p>
            Buyers need clear access to standards, testing, manufacturing controls, and quality
            discussion instead of chasing this information through sales copy.
          </p>
        </article>
      </div>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Engineering Focus</p>
          <h2>Key technical topics for composite pipe selection and project review.</h2>
        </div>
        <div className="highlight-grid">
          <div className="highlight-card">
            <span className="highlight-marker" aria-hidden="true" />
            <p>Material systems by resin, reinforcement, and service condition.</p>
          </div>
          <div className="highlight-card">
            <span className="highlight-marker" aria-hidden="true" />
            <p>Joint systems by application, installation method, and maintenance logic.</p>
          </div>
          <div className="highlight-card">
            <span className="highlight-marker" aria-hidden="true" />
            <p>Standards and certifications page with testing and compliance references.</p>
          </div>
          <div className="highlight-card">
            <span className="highlight-marker" aria-hidden="true" />
            <p>Manufacturing and quality page linked from about and product content.</p>
          </div>
        </div>
      </section>
    </PageHero>
  )
}

function ResourcesPage() {
  usePageMeta({
    title: 'Resources | FAQ, Downloads Planning, and Buyer Guidance',
    description:
      'See Hovoy resources for FAQ content, data sheet planning, RFQ guidance, and technical information for composite pipe projects.',
    path: '/resources/',
  })

  return (
    <PageHero
      eyebrow="Resources"
      title="Technical resources and buyer guidance for composite pipe projects."
      description="Use this section for FAQ answers, RFQ guidance, and future technical downloads covering product selection, standards, and application support."
    >
      <div className="capability-grid">
        <article className="capability-card">
          <h3>FAQ</h3>
          <p>Review direct answers to common questions on product fit, application scope, and inquiry preparation.</p>
          <Link className="text-link" to="/resources/faq">
            Open FAQ page
          </Link>
        </article>
        <article className="capability-card">
          <h3>Downloads</h3>
          <p>Technical data sheets, brochures, line cards, and supporting documents can be organized here for buyer access.</p>
        </article>
        <article className="capability-card">
          <h3>RFQ Guidance</h3>
          <p>Guidance on application details, dimensions, pressure class, and fittings scope helps improve inquiry quality.</p>
        </article>
      </div>
    </PageHero>
  )
}

function FaqPage() {
  usePageMeta({
    title: 'FAQ | Composite Pipe Questions For Industrial Buyers',
    description:
      'Read common FAQ answers about composite pipe selection, well tubing and casing, line pipe, marine pipe, flexible pipe, and inquiry preparation.',
    path: '/resources/faq/',
  })

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions about composite pipe supply and selection."
        description="Review common questions on product fit, application areas, and inquiry preparation for well, line, marine, and flexible composite pipe systems."
      >
        <div className="faq-list">
          {faqItems.map((item) => (
            <article className="faq-card" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </PageHero>
    </>
  )
}

function AboutPage() {
  usePageMeta({
    title: 'About Hovoy | Composite Pipe Website Structure and Market Positioning',
    description:
      'Learn about Hovoy Composite Pipe, our product focus, export market orientation, and support for industrial, marine, and energy pipeline projects.',
    path: '/about/',
  })

  return (
    <PageHero
      eyebrow="About"
      title="Composite pipe solutions for industrial, marine, and energy markets."
      description="Hovoy focuses on export-oriented supply of well tubing and casing, line pipe, marine and offshore pipe, flexible composite pipe, and system accessories for demanding service conditions."
    >
      <div className="timeline">
        <article>
          <span>01</span>
          <strong>Product Focus</strong>
          <p>Our portfolio covers rigid and flexible composite pipe systems for distinct operating environments and project needs.</p>
        </article>
        <article>
          <span>02</span>
          <strong>Application Coverage</strong>
          <p>We support oil and gas, marine, desalination, water treatment, and corrosive process applications.</p>
        </article>
        <article>
          <span>03</span>
          <strong>Project Support</strong>
          <p>Technical clarification, quotation review, and export coordination help buyers move from inquiry to delivery.</p>
        </article>
        <article>
          <span>04</span>
          <strong>Commercial Response</strong>
          <p>Product pages, application pages, and contact channels are aligned to support clearer and faster RFQ communication.</p>
        </article>
      </div>
    </PageHero>
  )
}

function ContactPage() {
  usePageMeta({
    title: 'Contact Hovoy | RFQ For Composite Pipe Systems',
    description:
      'Contact Hovoy Composite Pipe for RFQs related to well tubing and casing, line pipe, marine pipe, flexible composite pipe, fittings, and engineered project support.',
    path: '/contact/',
  })

  return (
    <PageHero
      eyebrow="Contact"
      title="Contact Hovoy for product selection, technical review, and project quotations."
      description="Send your application details, product scope, dimensions, pressure class, and destination market so we can review the request and respond more accurately."
    >
      <div className="detail-grid">
        <article className="detail-panel">
          <h3>Primary contact</h3>
          <p className="contact-email">
            <a href="mailto:sales@hovoy-grepipe.com">sales@hovoy-grepipe.com</a>
          </p>
          <p>
            Use this address for product selection, project discussion, export RFQs, and follow-up
            on composite pipe requirements.
          </p>
        </article>
        <article className="detail-panel">
          <h3>What to include in your RFQ</h3>
          <ul className="detail-list">
            <li>Product line: well, line, marine, flexible, or fittings</li>
            <li>Application and service media</li>
            <li>Diameter range, pressure class, and line scope</li>
            <li>Destination country and project timing</li>
            <li>Drawings, line list, or technical notes if available</li>
          </ul>
        </article>
      </div>
    </PageHero>
  )
}

function NotFoundPage() {
  usePageMeta({
    title: 'Page Not Found | Hovoy Composite Pipe',
    description: 'The requested Hovoy Composite Pipe page was not found.',
    path: '/404/',
  })

  return (
    <PageHero
      eyebrow="404"
      title="The page you requested could not be found."
      description="Use the main navigation to return to product, application, engineering, resource, or contact pages."
    >
      <div className="hero-actions">
        <Link className="button button-primary" to="/">
          Return Home
        </Link>
        <Link className="button button-secondary" to="/products">
          Browse Products
        </Link>
      </div>
    </PageHero>
  )
}

function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </section>
      {children}
    </>
  )
}

function CtaSection({ title, text }: { title: string; text: string }) {
  return (
    <section className="section contact-panel">
      <div>
        <p className="eyebrow">Call To Action</p>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className="contact-card">
        <p>Inquiry email</p>
        <a href="mailto:sales@hovoy-grepipe.com">sales@hovoy-grepipe.com</a>
        <span>Share product scope, application details, dimensions, pressure class, and destination market.</span>
        <Link className="button button-primary contact-button" to="/contact">
          Contact Hovoy
        </Link>
      </div>
    </section>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SiteLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/applications/:slug" element={<ApplicationDetailPage />} />
          <Route path="/engineering" element={<EngineeringPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/faq" element={<FaqPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </SiteLayout>
    </BrowserRouter>
  )
}

export default App
