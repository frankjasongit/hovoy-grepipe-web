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
      'Hovoy Composite Pipe builds a structured industrial website around well tubing and casing, line pipe, marine pipe, flexible composite pipe, fittings, and engineering support for export projects.',
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
          <h1>Well pipe, line pipe, marine pipe, and flexible composite pipe in one clear structure.</h1>
          <p className="hero-text">
            The Hovoy site is being rebuilt around how industrial buyers actually search and
            qualify suppliers: product line first, application context second, engineering fit
            third, then a direct RFQ path. This avoids the weak “single homepage trading site”
            pattern and turns the website into a real industrial sales platform.
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
              <small>Structured for SEO, project qualification, and export-facing RFQ flow.</small>
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
          <h2>Build the website around product lines instead of one generic GRE page.</h2>
          <p>
            This industry has distinct buyer groups. A marine buyer, a well tubing buyer, and a
            flexible pipe buyer do not search the same way and should not be forced through one
            undifferentiated product page.
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
            <h2>Let search engines and buyers understand the industrial use case.</h2>
          </div>
          <p>
            International competitors typically split applications from products. That is the
            right model here too, because it creates stronger landing pages for oil and gas,
            marine, desalination, and chemical process traffic.
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
          <p className="eyebrow">Engineering Structure</p>
          <h2>Separate product content from engineering content.</h2>
          <p>
            This site should not try to answer standards, materials, joint systems, and quality
            control inside random product paragraphs. Engineering deserves its own architecture so
            product pages can stay commercial and easy to scan.
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
          <p className="eyebrow">Implementation Plan</p>
          <h2>First structure the website correctly, then deepen each page.</h2>
        </div>

        <div className="timeline">
          <article>
            <span>01</span>
            <strong>Architecture</strong>
            <p>Products, applications, engineering, resources, about, and contact become separate routes.</p>
          </article>
          <article>
            <span>02</span>
            <strong>SEO Expansion</strong>
            <p>Each product and application line gets a dedicated title, description, canonical, and sitemap URL.</p>
          </article>
          <article>
            <span>03</span>
            <strong>Content Depth</strong>
            <p>Next phase adds data sheets, standards, pressure ranges, and downloadable resources.</p>
          </article>
          <article>
            <span>04</span>
            <strong>Lead Capture</strong>
            <p>RFQ pages and inquiry forms are connected to the exact product or application page that sourced the lead.</p>
          </article>
        </div>
      </section>

      <section className="section contact-panel">
        <div>
          <p className="eyebrow">Next Step</p>
          <h2>The homepage is now a router into the real site, not the whole site itself.</h2>
          <p>
            The key structural problem is solved by turning the website into a proper industrial
            page tree. That gives you room to add technical depth without collapsing all traffic
            into one weak homepage.
          </p>
        </div>

        <div className="contact-card">
          <p>Recommended action</p>
          <a href="mailto:sales@hovoy-grepipe.com">sales@hovoy-grepipe.com</a>
          <span>Use contact, product, and application pages as separate inquiry entry points.</span>
          <Link className="button button-primary contact-button" to="/contact">
            Open Contact Page
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
      title="Composite pipe product lines organized around real buying intent."
      description="Each product family needs its own page because the use case, pressure logic, standards, and buyer questions differ. This section is structured to support deeper product SEO and better RFQ quality."
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
            <h2>What this line is built for.</h2>
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
          <h2>Connect product pages to industry pages.</h2>
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
        title="Turn this product page into a qualified inquiry path."
        text="Next content depth can include pressure ranges, material systems, end connections, standards, and downloadable data sheets. The structure is already in place."
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
      title="Industry pages that match how industrial buyers search."
      description="Applications should not be buried inside product paragraphs. These pages let the site rank and convert around oil and gas, marine, water treatment, and corrosive process scenarios."
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
            <h2>What buyers in this sector usually need.</h2>
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
          <h2>Connect application intent to specific product families.</h2>
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
        title="Use application pages to attract better-qualified traffic."
        text="These pages should later absorb standards, media, pressure classes, and project scenarios. That is where long-tail industrial SEO becomes meaningful."
      />
    </PageHero>
  )
}

function EngineeringPage() {
  usePageMeta({
    title: 'Engineering | Materials, Joints, Standards, and Quality Logic',
    description:
      'Review Hovoy engineering structure for composite pipe systems including material systems, joint methods, standards, quality control, and RFQ preparation.',
    path: '/engineering/',
  })

  return (
    <PageHero
      eyebrow="Engineering"
      title="Engineering content deserves its own structure, not scattered paragraphs."
      description="Industrial composite pipe websites work better when material systems, joints, standards, and quality topics are organized in a dedicated section. This gives search engines and buyers a clearer technical map."
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
            Buyers need a direct route to standards, testing, manufacturing controls, and quality
            discussion instead of chasing this information through sales copy.
          </p>
        </article>
      </div>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">What To Build Next</p>
          <h2>High-value engineering pages after the structure phase.</h2>
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
      'See Hovoy resources architecture for FAQ content, future data sheet downloads, RFQ guidance, and technical information organization.',
    path: '/resources/',
  })

  return (
    <PageHero
      eyebrow="Resources"
      title="Resources turn traffic into better inquiries."
      description="Industrial buyers do not only browse products. They compare standards, download technical files, and search long-tail questions. This section gives those behaviors a place to land."
    >
      <div className="capability-grid">
        <article className="capability-card">
          <h3>FAQ</h3>
          <p>Use structured answer pages to capture long-tail search intent and reduce low-quality inquiries.</p>
          <Link className="text-link" to="/resources/faq">
            Open FAQ page
          </Link>
        </article>
        <article className="capability-card">
          <h3>Downloads</h3>
          <p>Later this section can host data sheets, brochures, line cards, and installation or standards PDFs.</p>
        </article>
        <article className="capability-card">
          <h3>RFQ Guidance</h3>
          <p>Resource pages can teach buyers what scope details to provide before asking for pricing or technical review.</p>
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
        title="Answer direct buyer questions instead of hiding them in sales text."
        description="FAQ content is useful for both SEO and sales. It clarifies product fit, reduces confusion between product lines, and prepares buyers to send better RFQs."
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
      'Learn how Hovoy Composite Pipe is positioning its website and commercial presentation around export markets, product families, and engineering-led industrial communication.',
    path: '/about/',
  })

  return (
    <PageHero
      eyebrow="About"
      title="The brand needs a clearer market position than a generic factory homepage."
      description="The purpose of this rebuild is to present Hovoy as a structured industrial supplier with distinct product lines, application pages, and technical pathways rather than a broad undifferentiated catalog."
    >
      <div className="timeline">
        <article>
          <span>01</span>
          <strong>Positioning</strong>
          <p>Well, line, marine, and flexible pipe are treated as separate demand buckets.</p>
        </article>
        <article>
          <span>02</span>
          <strong>Architecture</strong>
          <p>Products, applications, engineering, resources, and contact are separated into crawlable routes.</p>
        </article>
        <article>
          <span>03</span>
          <strong>Quality Story</strong>
          <p>Future pages can expand manufacturing, quality control, standards, and project support credibility.</p>
        </article>
        <article>
          <span>04</span>
          <strong>Commercial Flow</strong>
          <p>The website should help convert industrial traffic into qualified export RFQs rather than generic mailbox noise.</p>
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
      title="Make the contact page specific enough to improve inquiry quality."
      description="A strong contact page tells buyers what to send. That improves the quality of technical review and helps reduce low-information price requests."
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
            <li>Diameter range, pressure class, and route or line scope</li>
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
      title="This page does not exist in the current site structure."
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
        <p>Inquiry route</p>
        <a href="mailto:sales@hovoy-grepipe.com">sales@hovoy-grepipe.com</a>
        <span>Use product and application pages as the source pages for future leads.</span>
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
