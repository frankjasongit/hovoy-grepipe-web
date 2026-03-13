import { BrowserRouter, Link, NavLink, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'
import heroRefinery from './assets/refinery-hero-pexels.jpg'
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
  const location = useLocation()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const updateTopbarState = () => {
      setIsScrolled(window.scrollY > 20)
    }

    updateTopbarState()
    window.addEventListener('scroll', updateTopbarState, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateTopbarState)
    }
  }, [])

  useEffect(() => {
    setOpenMenu(null)
  }, [location.pathname])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const riseTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.hero-copy, .hero-visual, .page-hero-copy, .section-heading, .capability-copy, .contact-panel > div:first-child',
      ),
    )
    const fadeTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.hero-stats > div, .trust-strip p, .pill, .product-card, .sector-card, .capability-card, .highlight-card, .faq-card, .timeline article, .detail-panel, .contact-card',
      ),
    )

    const riseSet = new Set(riseTargets)
    const targets = [...riseTargets, ...fadeTargets]
    const staggerByParent = new Map<HTMLElement, number>()

    targets.forEach((target) => {
      target.classList.remove('motion-rise', 'motion-fade', 'is-visible')
      target.classList.add(riseSet.has(target) ? 'motion-rise' : 'motion-fade')

      const parent = target.parentElement ?? document.body
      const currentIndex = staggerByParent.get(parent) ?? 0

      target.style.setProperty('--reveal-delay', `${Math.min(currentIndex, 6) * 70}ms`)
      staggerByParent.set(parent, currentIndex + 1)
    })

    if (reducedMotion) {
      targets.forEach((target) => target.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    targets.forEach((target) => observer.observe(target))

    return () => {
      observer.disconnect()
    }
  }, [location.pathname])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      return
    }

    const surfaces = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.hero-photo-card, .hero-stats > div, .trust-strip p, .pill, .product-card, .sector-card, .capability-card, .highlight-card, .faq-card, .timeline article, .detail-panel, .contact-card',
      ),
    )

    const cleanups = surfaces.map((surface) => {
      const depth = surface.classList.contains('hero-photo-card') ? 7.5 : 4.2

      const resetSurface = () => {
        surface.style.removeProperty('--surface-tilt-x')
        surface.style.removeProperty('--surface-tilt-y')
        surface.style.removeProperty('--surface-glow-x')
        surface.style.removeProperty('--surface-glow-y')
        surface.style.removeProperty('--surface-scale')
        surface.classList.remove('is-interacting')
      }

      const handleMove = (event: PointerEvent) => {
        if (event.pointerType && event.pointerType !== 'mouse') {
          return
        }

        const rect = surface.getBoundingClientRect()
        const pointerX = (event.clientX - rect.left) / rect.width
        const pointerY = (event.clientY - rect.top) / rect.height
        const rotateX = (0.5 - pointerY) * depth
        const rotateY = (pointerX - 0.5) * depth

        surface.style.setProperty('--surface-tilt-x', `${rotateX.toFixed(2)}deg`)
        surface.style.setProperty('--surface-tilt-y', `${rotateY.toFixed(2)}deg`)
        surface.style.setProperty('--surface-glow-x', `${(pointerX * 100).toFixed(2)}%`)
        surface.style.setProperty('--surface-glow-y', `${(pointerY * 100).toFixed(2)}%`)
        surface.style.setProperty('--surface-scale', surface.classList.contains('hero-photo-card') ? '1.012' : '1.006')
        surface.classList.add('is-interacting')
      }

      surface.addEventListener('pointermove', handleMove)
      surface.addEventListener('pointerleave', resetSurface)
      surface.addEventListener('pointercancel', resetSurface)

      return () => {
        surface.removeEventListener('pointermove', handleMove)
        surface.removeEventListener('pointerleave', resetSurface)
        surface.removeEventListener('pointercancel', resetSurface)
        resetSurface()
      }
    })

    return () => {
      cleanups.forEach((cleanup) => cleanup())
    }
  }, [location.pathname])

  const megaMenus = {
    products: {
      title: 'Product Families',
      text: 'Start with the pipe family that matches the service environment, installation logic, and package scope.',
      links: productPages.map((item) => ({
        title: item.title,
        text: item.summary,
        to: `/products/${item.slug}`,
      })),
      utility: { label: 'View all products', to: '/products' },
    },
    applications: {
      title: 'Application Sectors',
      text: 'Use industry pages when the operating environment is already clear and the product family still needs to be narrowed.',
      links: applicationPages.map((item) => ({
        title: item.title,
        text: item.summary,
        to: `/applications/${item.slug}`,
      })),
      utility: { label: 'View all applications', to: '/applications' },
    },
    engineering: {
      title: 'Engineering And Quality',
      text: 'Technical review often depends on material systems, joint logic, manufacturing discussion, and RFQ preparation.',
      links: [
        {
          title: 'Engineering',
          text: 'Materials, joints, standards, and technical inputs that shape selection and quotation.',
          to: '/engineering',
        },
        {
          title: 'Manufacturing and Quality',
          text: 'Production planning, inspection discussion, documentation scope, and export shipment readiness.',
          to: '/about/manufacturing-quality',
        },
        {
          title: 'Resources',
          text: 'FAQ, RFQ preparation, and buyer guidance for project communication.',
          to: '/resources',
        },
      ],
      utility: { label: 'Open engineering', to: '/engineering' },
    },
    resources: {
      title: 'Resources And RFQ Support',
      text: 'Use resources pages to answer common buyer questions, prepare RFQ inputs, and move to contact with a cleaner project brief.',
      links: [
        {
          title: 'Resources',
          text: 'Resource center for buyer guidance, request preparation, and supporting technical discussion.',
          to: '/resources',
        },
        {
          title: 'FAQ',
          text: 'Common questions on product fit, application logic, and quotation preparation.',
          to: '/resources/faq',
        },
        {
          title: 'Contact',
          text: 'Move directly to project communication when the application and scope are already defined.',
          to: '/contact',
        },
      ],
      utility: { label: 'Open resources', to: '/resources' },
    },
    about: {
      title: 'About Hovoy',
      text: 'Company positioning, manufacturing discussion, and contact paths for export-oriented project supply.',
      links: [
        {
          title: 'About',
          text: 'Product focus, application coverage, project support, and commercial response.',
          to: '/about',
        },
        {
          title: 'Manufacturing and Quality',
          text: 'See how production control and quality review support project delivery.',
          to: '/about/manufacturing-quality',
        },
        {
          title: 'Contact',
          text: 'Move directly into RFQ and project communication with the sales team.',
          to: '/contact',
        },
      ],
      utility: { label: 'Contact Hovoy', to: '/contact' },
    },
  } as const

  const primaryItems = [
    { label: 'Products', key: 'products' as const, to: '/products' },
    { label: 'Applications', key: 'applications' as const, to: '/applications' },
    { label: 'Engineering', key: 'engineering' as const, to: '/engineering' },
    { label: 'Resources', key: 'resources' as const, to: '/resources' },
    { label: 'About', key: 'about' as const, to: '/about' },
  ]

  const activeMenu = openMenu ? megaMenus[openMenu as keyof typeof megaMenus] : null

  return (
    <div className="site-shell">
      <header
        className={isScrolled || openMenu ? 'topbar topbar-scrolled' : 'topbar'}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="topbar-inner">
          <Link className="brand-lockup" to="/">
            <div className="brand-badge">HG</div>
            <div>
              <p className="brand-name">Hovoy Composite Pipe</p>
              <p className="brand-tag">Well, line, marine, flexible, and engineered project supply</p>
            </div>
          </Link>

          <nav className="topnav" aria-label="Primary">
            {primaryItems.map((item) => {
              return (
                <div
                  className="navitem"
                  key={item.label}
                  onMouseEnter={() => setOpenMenu(item.key)}
                  onFocus={() => setOpenMenu(item.key)}
                >
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'navlink navlink-parent navlink-active' : 'navlink navlink-parent'
                    }
                    to={item.to}
                    aria-expanded={openMenu === item.key}
                  >
                    <span>{item.label}</span>
                    <span className="nav-caret" aria-hidden="true">
                      ▾
                    </span>
                  </NavLink>
                </div>
              )
            })}

            <NavLink
              className={({ isActive }) =>
                isActive ? 'button button-primary nav-cta nav-cta-active' : 'button button-primary nav-cta'
              }
              to="/contact"
            >
              Contact
            </NavLink>
          </nav>
        </div>

        {activeMenu ? (
          <div className="mega-menu-shell">
            <div className="mega-menu" role="group" aria-label={activeMenu.title}>
              <div className="mega-menu-intro">
                <p className="eyebrow">Explore</p>
                <h3>{activeMenu.title}</h3>
                <p>{activeMenu.text}</p>
                <Link className="button button-primary mega-menu-button" to={activeMenu.utility.to}>
                  {activeMenu.utility.label}
                </Link>
              </div>
              <div className="mega-menu-links">
                {activeMenu.links.map((link) => (
                  <Link className="mega-menu-card" key={link.to} to={link.to}>
                    <strong>{link.title}</strong>
                    <span>{link.text}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <main className="page-shell" key={location.pathname}>
        {children}
      </main>

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
  const quickAccessLinks = [
    {
      title: 'Well Tubing and Casing',
      text: 'For corrosive well environments, field handling, and tubing or casing discussions.',
      to: '/products/well-tubing-casing',
    },
    {
      title: 'Line Pipe',
      text: 'For plant routing, produced water, utility networks, and corrosion-sensitive transport lines.',
      to: '/products/line-pipe',
    },
    {
      title: 'Marine and Offshore Pipe',
      text: 'For shipboard utilities, seawater systems, and offshore routing constraints.',
      to: '/products/marine-offshore-pipe',
    },
    {
      title: 'Flexible Composite Pipe',
      text: 'For spoolable deployment, RTP-style field transport, and fast installation scenarios.',
      to: '/products/flexible-composite-pipe',
    },
    {
      title: 'Engineering',
      text: 'For materials, joints, standards, and RFQ preparation before technical review.',
      to: '/engineering',
    },
    {
      title: 'Manufacturing and Quality',
      text: 'For inspection discussion, documentation logic, and export shipment readiness.',
      to: '/about/manufacturing-quality',
    },
  ]

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

        <div className="hero-visual">
          <figure className="hero-photo-card">
            <img
              className="hero-photo"
              src={heroRefinery}
              alt="Aerial view of a refinery and industrial processing plant"
            />
            <div className="hero-photo-shade" />
            <div className="hero-photo-panel">
              <span>Industrial Project Context</span>
              <strong>Supply scope built around operating environment, package completeness, and project delivery.</strong>
              <small>Well systems, line pipe, marine service, flexible deployment, and full package coordination for export projects.</small>
            </div>
          </figure>
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
            Product selection is only one part of the supply decision. Clients also need clear
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
            <p>Provide a dedicated place for testing, compliance, manufacturing control, and documentation logic.</p>
          </article>
        </div>
      </section>

      <section className="section section-grid">
        <div className="section-heading">
          <p className="eyebrow">Quick Access</p>
          <h2>Start from the page that matches your project scope.</h2>
          <p>
            Project teams usually arrive with a specific need in mind. Use these direct links
            to jump into the right product, engineering, or quality page without sorting through
            unrelated content.
          </p>
        </div>

        <div className="sector-grid">
          {quickAccessLinks.map((item) => (
            <article className="sector-card" key={item.to}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Link className="text-link" to={item.to}>
                Open page
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-grid">
        <div className="section-heading">
          <p className="eyebrow">Project Process</p>
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
            Our team supports clients looking for well tubing and casing, line pipe, marine piping,
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
  const selectionLogic = [
    {
      title: 'Start With Service Duty',
      text: 'Separate well service, plant transport, marine duty, and spoolable field deployment before comparing products on price or dimensions.',
    },
    {
      title: 'Check Installation Logic',
      text: 'Rigid systems, spool packages, and flexible deployment each suit different route conditions, field access, and tie-in requirements.',
    },
    {
      title: 'Define Package Scope',
      text: 'Many projects need more than straight pipe, so fittings, reducers, flanges, and shop-fabricated sections should be clarified early.',
    },
  ]

  const productRoutes = [
    {
      title: 'Well Tubing and Casing',
      text: 'For corrosive well environments, field handling, and tubing or casing supply discussion.',
      to: '/products/well-tubing-casing',
    },
    {
      title: 'Line Pipe',
      text: 'For plant routing, produced water, utility transfer, and corrosion-sensitive transport systems.',
      to: '/products/line-pipe',
    },
    {
      title: 'Marine and Offshore Pipe',
      text: 'For seawater service, shipboard routing, and offshore projects where corrosion and weight matter together.',
      to: '/products/marine-offshore-pipe',
    },
    {
      title: 'Flexible Composite Pipe',
      text: 'For spoolable installation, remote field deployment, and RTP-style transport scenarios.',
      to: '/products/flexible-composite-pipe',
    },
    {
      title: 'Fittings and Joints',
      text: 'For elbows, tees, reducers, flanges, and transition details that complete the package.',
      to: '/products/fittings-and-joints',
    },
  ]

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
      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Selection Approach</p>
          <h2>Product selection usually narrows down in three steps.</h2>
        </div>
        <div className="detail-card-grid">
          {selectionLogic.map((item) => (
            <article className="detail-panel" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Choose a Route</p>
          <h2>Go directly to the product family that matches your project.</h2>
        </div>
        <div className="sector-grid">
          {productRoutes.map((item) => (
            <article className="sector-card" key={item.to}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Link className="text-link" to={item.to}>
                Open product page
              </Link>
            </article>
          ))}
        </div>
      </section>

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

      <CtaSection
        title="Need help deciding which product family fits the project?"
        text="Send the service media, installation method, pressure class, and route conditions so we can suggest the most relevant product path before formal quotation."
      />
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
            <h3>Typical client requirements</h3>
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
          <p className="eyebrow">Service Profile</p>
          <h2>Typical service media and operating contexts.</h2>
        </div>
        <div className="pill-grid">
          {page.serviceMedia.map((item) => (
            <span className="pill" key={item}>
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Supply Scope</p>
          <h2>What Hovoy can offer for this product line.</h2>
        </div>
        <div className="detail-card-grid">
          {page.supplyScope.map((item) => (
            <article className="detail-panel" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Selection Considerations</p>
          <h2>Points that usually shape technical review and quotation.</h2>
        </div>
        <div className="detail-card-grid">
          {page.selectionNotes.map((item) => (
            <article className="detail-panel" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Common Applications</p>
          <h2>Typical uses for this product family.</h2>
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
          <p className="eyebrow">RFQ Checklist</p>
          <h2>Information recommended before requesting a quotation.</h2>
        </div>
        <article className="detail-panel">
          <ul className="detail-list">
            {page.rfqChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
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
  const applicationLogic = [
    {
      title: 'Corrosion And Media',
      text: 'Application pages help project teams start from service media and the severity of the operating environment.',
    },
    {
      title: 'Installation Context',
      text: 'Onshore plant routing, offshore modules, water treatment blocks, and remote field lines all create different selection priorities.',
    },
    {
      title: 'Commercial Outcome',
      text: 'A stronger application definition usually leads to a cleaner product shortlist, a more complete fittings scope, and faster RFQ handling.',
    },
  ]

  const applicationRoutes = [
    {
      title: 'Oil and Gas',
      text: 'Start here for well systems, field line networks, and flexible deployment in corrosive or remote service.',
      to: '/applications/oil-and-gas',
    },
    {
      title: 'Marine and Offshore',
      text: 'Use this path for seawater duty, shipboard routing, and offshore support systems.',
      to: '/applications/marine-and-offshore',
    },
    {
      title: 'Water Treatment and Desalination',
      text: 'For saline utility systems, treatment plants, and equipment tie-in networks.',
      to: '/applications/water-treatment-desalination',
    },
    {
      title: 'Chemical Processing',
      text: 'For corrosive plant environments, process lines, and maintenance-sensitive utility systems.',
      to: '/applications/chemical-processing',
    },
  ]

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
      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Application Approach</p>
          <h2>Industry pages should explain where a composite system is relevant.</h2>
        </div>
        <div className="detail-card-grid">
          {applicationLogic.map((item) => (
            <article className="detail-panel" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Industry Paths</p>
          <h2>Choose the sector that matches the operating environment.</h2>
        </div>
        <div className="sector-grid">
          {applicationRoutes.map((item) => (
            <article className="sector-card" key={item.to}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Link className="text-link" to={item.to}>
                Open application page
              </Link>
            </article>
          ))}
        </div>
      </section>

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

      <CtaSection
        title="Already know the application but not the product family?"
        text="Send the service environment, media, pressure class, and installation context so we can align the right product line and fittings scope to the application."
      />
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
            <p className="eyebrow">Application Overview</p>
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

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Typical Systems</p>
          <h2>Where these application requirements usually appear.</h2>
        </div>
        <div className="detail-card-grid">
          {page.typicalSystems.map((item) => (
            <article className="detail-panel" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Project Priorities</p>
          <h2>Commercial and technical priorities in this sector.</h2>
        </div>
        <article className="detail-panel">
          <ul className="detail-list">
            {page.projectDrivers.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Inquiry Requirements</p>
          <h2>Information that helps speed up technical review.</h2>
        </div>
        <article className="detail-panel">
          <ul className="detail-list">
            {page.inquiryFocus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <CtaSection
        title="Discuss application-specific product selection with Hovoy."
        text="If you already know the service media, pressure class, routing scope, or installation environment, send those details with your inquiry for faster review."
      />
    </PageHero>
  )
}

function EngineeringPage() {
  const engineeringTopics = [
    {
      title: 'Material Systems By Duty',
      text: 'Different service conditions may require different composite system logic. Buyers usually compare media resistance, operating environment, handling considerations, and lifecycle expectations before final selection.',
    },
    {
      title: 'Connection And Installation Logic',
      text: 'Joint choice should reflect installation method, field access, maintenance planning, and the balance between shop fabrication and site assembly.',
    },
    {
      title: 'Documentation Support',
      text: 'Technical clarification often depends on line lists, drawings, pressure class requirements, fittings ratios, and destination-market documentation expectations.',
    },
  ]

  const documentationSupport = [
    'Application summary and service media description',
    'Diameter range, pressure class, and estimated line scope',
    'Fittings, jointing, and spool requirements',
    'Project drawings, line lists, or scope notes when available',
    'Destination country, project schedule, and delivery priorities',
  ]

  const byProductFamily = [
    {
      title: 'Well Systems',
      text: 'Focus on corrosive well environments, handling conditions, and the practical fit of tubing, casing, and related accessories.',
    },
    {
      title: 'Line Pipe Systems',
      text: 'Review transport duty, route conditions, utility service, fittings scope, and the balance between straight pipe and fabricated packages.',
    },
    {
      title: 'Marine And Offshore Systems',
      text: 'Discuss seawater duty, weight reduction, routing constraints, and marine-specific project or class requirements.',
    },
    {
      title: 'Flexible Composite Pipe',
      text: 'Clarify spoolable deployment conditions, route length, installation speed targets, and whether flexible or rigid systems are better suited.',
    },
  ]

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
      description="Product performance depends on more than pipe type alone. Hovoy supports project teams with application-focused guidance on material systems, connection methods, standards, and project documentation."
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
            Project teams need clear access to standards, testing, manufacturing controls, and quality
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

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Technical Review</p>
          <h2>Topics that usually drive engineering conversations.</h2>
        </div>
        <div className="detail-card-grid">
          {engineeringTopics.map((item) => (
            <article className="detail-panel" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">By Product Family</p>
          <h2>Engineering priorities change by system type.</h2>
        </div>
        <div className="detail-card-grid">
          {byProductFamily.map((item) => (
            <article className="detail-panel" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">RFQ Inputs</p>
          <h2>Technical information that helps us respond faster.</h2>
        </div>
        <article className="detail-panel">
          <ul className="detail-list">
            {documentationSupport.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
    </PageHero>
  )
}

function ResourcesPage() {
  const resourceGroups = [
    {
      title: 'Product Scope Guidance',
      text: 'Buyers often start by confirming whether a project is better suited to well tubing and casing, rigid line pipe, marine systems, or flexible composite pipe.',
    },
    {
      title: 'Technical Clarification',
      text: 'Pressure class, service media, route conditions, fittings ratio, and tie-in points all affect how the system should be reviewed before quotation.',
    },
    {
      title: 'Commercial Readiness',
      text: 'A stronger RFQ package usually includes destination market, packing requirements, schedule expectations, and the level of shop fabrication required.',
    },
  ]

  const documentRequests = [
    'Product overviews by family and application',
    'Data sheet or dimensional planning discussions',
    'Jointing and fittings scope clarification',
    'Standards, testing, and quality-related discussion points',
    'Project packing, export, and delivery coordination inputs',
  ]

  const rfqPreparation = [
    'Application summary and service media',
    'Diameter range, pressure class, and estimated quantities',
    'Line list, route sketch, or general arrangement if available',
    'Required fittings, transitions, or spool assemblies',
    'Project timing, destination country, and documentation needs',
  ]

  usePageMeta({
    title: 'Resources | FAQ, Downloads Planning, and Buyer Guidance',
    description:
      'See Hovoy resources for FAQ content, data sheet planning, RFQ guidance, and technical information for composite pipe projects.',
    path: '/resources/',
  })

  return (
    <PageHero
      eyebrow="Resources"
      title="Technical resources and project guidance for composite pipe projects."
      description="This section helps project teams prepare cleaner RFQs, identify the right product family, and organize the technical information needed for faster review."
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
          <p>Product overviews, data-sheet discussions, and supporting documentation can be provided against live project requirements.</p>
        </article>
        <article className="capability-card">
          <h3>RFQ Guidance</h3>
          <p>Guidance on application details, dimensions, pressure class, and fittings scope helps improve inquiry quality.</p>
        </article>
      </div>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Resource Focus</p>
          <h2>How this section supports project communication.</h2>
        </div>
        <div className="detail-card-grid">
          {resourceGroups.map((item) => (
            <article className="detail-panel" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Common Requests</p>
          <h2>Information commonly requested before order placement.</h2>
        </div>
        <article className="detail-panel">
          <ul className="detail-list">
            {documentRequests.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">RFQ Preparation</p>
          <h2>Send these details to speed up technical and commercial review.</h2>
        </div>
        <article className="detail-panel">
          <ul className="detail-list">
            {rfqPreparation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <CtaSection
        title="Need project-specific documents or selection support?"
        text="Send your application details, line scope, and destination market so we can align the right product family, documentation scope, and quotation inputs."
      />
    </PageHero>
  )
}

function FaqPage() {
  const faqSupportLinks = [
    { title: 'Compare Product Families', text: 'See which system fits well service, line transport, marine duty, or flexible deployment.', to: '/products' },
    { title: 'Review Applications', text: 'Start from oil and gas, marine, desalination, or chemical service if the industry use case is already clear.', to: '/applications' },
    { title: 'Prepare Technical Review', text: 'Use the engineering page to align materials, joints, standards, and RFQ inputs before sending documents.', to: '/engineering' },
    { title: 'Send RFQ', text: 'Move directly to contact if the application, pressure class, and scope are already defined.', to: '/contact' },
  ]

  usePageMeta({
      title: 'FAQ | Composite Pipe Questions For Industrial Projects',
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

        <section className="section section-grid page-section">
          <div className="section-heading">
            <p className="eyebrow">Next Step</p>
            <h2>Continue from FAQ to the right product or inquiry page.</h2>
          </div>
          <div className="detail-card-grid">
            {faqSupportLinks.map((item) => (
              <article className="detail-panel" key={item.to}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link className="text-link" to={item.to}>
                  Open page
                </Link>
              </article>
            ))}
          </div>
        </section>
      </PageHero>
    </>
  )
}

function AboutPage() {
  usePageMeta({
    title: 'About Hovoy | Composite Pipe Supplier For Industrial, Marine, and Energy Projects',
    description:
      'Learn about Hovoy Composite Pipe, our product focus, export-oriented supply capability, and support for industrial, marine, and energy pipeline projects.',
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
          <p>Technical clarification, quotation review, and export coordination help projects move from inquiry to delivery.</p>
        </article>
        <article>
          <span>04</span>
          <strong>Commercial Response</strong>
          <p>Product pages, application pages, and contact channels are aligned to support clearer and faster RFQ communication.</p>
        </article>
      </div>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">How We Support Projects</p>
          <h2>Supply discussions are organized around application, scope, and delivery logic.</h2>
        </div>
        <div className="detail-grid">
          <article className="detail-panel">
            <h3>Application-Led Review</h3>
            <p>
              We separate well, line, marine, and flexible systems so clients can discuss the right
              product family instead of sorting through unrelated categories.
            </p>
          </article>
          <article className="detail-panel">
            <h3>Export Coordination</h3>
            <p>
              Commercial review can include packing expectations, delivery timing, documentation
              needs, and the balance between straight pipe and fabricated scope.
            </p>
          </article>
          <article className="detail-panel">
            <h3>RFQ Efficiency</h3>
            <p>
              Clearer product pages and engineering guidance help reduce missing information so
              technical and quotation review can move faster.
            </p>
          </article>
        </div>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Quality And Manufacturing</p>
          <h2>Review how manufacturing control and quality discussion fit into project support.</h2>
        </div>
        <article className="detail-panel">
          <h3>Manufacturing and quality page</h3>
          <p>
            For clients reviewing export supply, standards discussion, inspection logic, and
            documentation expectations, we maintain a dedicated page focused on manufacturing and
            quality support.
          </p>
          <Link className="text-link" to="/about/manufacturing-quality">
            View manufacturing and quality page
          </Link>
        </article>
      </section>
    </PageHero>
  )
}

function ManufacturingQualityPage() {
  const qualityPillars = [
    'Material consistency and traceable production flow',
    'Dimensional and scope review before shipment',
    'Inspection discussion aligned to project expectations',
    'Documentation support for export and project jobs',
  ]

  const processTopics = [
    {
      title: 'Production Planning',
      text: 'Manufacturing review starts from product family, service conditions, dimensions, fittings ratio, and whether the project needs straight pipe only or a broader package with spools and accessories.',
    },
    {
      title: 'Quality Control Logic',
      text: 'Inspection focus typically follows project requirements for dimensions, visual checks, package completeness, and documentation expected by EPC contractors, distributors, or overseas project teams.',
    },
    {
      title: 'Shipment Readiness',
      text: 'Export jobs often require clearer packing logic, marking, documentation sets, and shipment sequencing so the delivered scope matches the site installation plan.',
    },
  ]

  const buyerChecks = [
    'Applicable product family and service description',
    'Dimensions, pressure class, and package scope',
    'Required fittings, transitions, or spool assemblies',
    'Inspection or documentation expectations',
    'Destination market, delivery sequence, and packing notes',
  ]

  usePageMeta({
    title: 'Manufacturing and Quality | Composite Pipe Project Support',
    description:
      'Review Hovoy manufacturing and quality support for composite pipe projects including production planning, inspection discussion, documentation, and export shipment readiness.',
    path: '/about/manufacturing-quality/',
  })

  return (
    <PageHero
      eyebrow="About / Manufacturing and Quality"
      title="Manufacturing and quality support for export-oriented composite pipe projects."
      description="Industrial projects often need more than product pages alone. This section explains how production planning, inspection discussion, and shipment readiness fit into project supply."
    >
      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Quality Focus</p>
          <h2>Topics that usually matter during supplier review.</h2>
        </div>
        <div className="pill-grid">
          {qualityPillars.map((item) => (
            <span className="pill" key={item}>
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Manufacturing Review</p>
          <h2>How production and quality conversations are usually structured.</h2>
        </div>
        <div className="detail-card-grid">
          {processTopics.map((item) => (
            <article className="detail-panel" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Before Supplier Review</p>
          <h2>Information that helps align production and inspection discussion.</h2>
        </div>
        <article className="detail-panel">
          <ul className="detail-list">
            {buyerChecks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <CtaSection
        title="Need production, inspection, or documentation clarification?"
        text="Send the project scope, destination market, and required documentation level so we can align manufacturing discussion with the actual order requirements."
      />
    </PageHero>
  )
}

function ContactPage() {
  const inquiryRoutes = [
    {
      title: 'Product Selection',
      text: 'Tell us whether the request is for well tubing and casing, line pipe, marine systems, flexible composite pipe, or fittings and joints.',
    },
    {
      title: 'Technical Scope',
      text: 'Share service media, pressure class, dimensions, route conditions, and the fittings or tie-in scope that affects system selection.',
    },
    {
      title: 'Commercial Scope',
      text: 'Clarify destination country, delivery timing, packing expectations, and whether you need straight pipe only or a broader package with spools and accessories.',
    },
  ]

  const rfqChecklist = [
    'Application sector and service media',
    'Product family or shortlist under review',
    'Diameter range, pressure class, and estimated quantities',
    'Line list, route sketch, or general arrangement if available',
    'Fittings, flanges, reducers, or transition details',
    'Destination country, target delivery window, and documentation needs',
  ]

  const supportLinks = [
    { title: 'Browse product families', to: '/products' },
    { title: 'Review application pages', to: '/applications' },
    { title: 'Check engineering guidance', to: '/engineering' },
    { title: 'Read FAQ', to: '/resources/faq' },
  ]

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
      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Inquiry Path</p>
          <h2>What helps us respond faster and more accurately.</h2>
        </div>
        <div className="detail-card-grid">
          {inquiryRoutes.map((item) => (
            <article className="detail-panel" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

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
          <h3>Recommended RFQ information</h3>
          <ul className="detail-list">
            {rfqChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Before Contacting Us</p>
          <h2>Use these pages if you still need to narrow the inquiry.</h2>
        </div>
        <div className="detail-grid">
          {supportLinks.map((item) => (
            <article className="detail-panel" key={item.to}>
              <h3>{item.title}</h3>
              <Link className="text-link" to={item.to}>
                Open page
              </Link>
            </article>
          ))}
        </div>
      </section>
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
          <Route path="/about/manufacturing-quality" element={<ManufacturingQualityPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </SiteLayout>
    </BrowserRouter>
  )
}

export default App
