import { BrowserRouter, Link, NavLink, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import {
  createContext,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
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

export type MetaSnapshot = Partial<MetaConfig>
export const MetaContext = createContext<MetaSnapshot | null>(null)

type KeywordPage = {
  slug: 'gre-pipe' | 'grp-pipe' | 'frp-pipe'
  eyebrow: string
  title: string
  description: string
  metaTitle: string
  metaDescription: string
  summary: string
  fit: string[]
  focus: Array<{ title: string; text: string }>
  related: string[]
}

const keywordPages: KeywordPage[] = [
  {
    slug: 'gre-pipe',
    eyebrow: 'Material Guide / GRE Pipe',
    title: 'GRE pipe supply for corrosive industrial, marine, and oil and gas projects.',
    description:
      'Explore GRE pipe options for line pipe, marine systems, well service, fittings, and export-oriented industrial projects.',
    metaTitle: 'GRE Pipe Supplier | Hovoy GRE Pipe',
    metaDescription:
      'Explore Hovoy GRE pipe supply for line pipe, marine pipe, well service, fittings, and export-oriented industrial projects.',
    summary:
      'Clients looking for GRE pipe often need a supplier that can discuss application fit, fittings, and project scope clearly.',
    fit: [
      'Line pipe and utility networks in corrosive service',
      'Marine and offshore piping where weight and corrosion matter together',
      'Industrial RFQs that need more than straight pipe only',
    ],
    focus: [
      {
        title: 'Where Hovoy Fits',
        text: 'Hovoy GRE Pipe is better positioned for projects that need application discussion, fittings scope, export coordination, and technical clarification before quotation.',
      },
      {
        title: 'What Clients Usually Need',
        text: 'GRE pipe enquiries often include line lists, pressure class, fittings, transitions, and destination-market documentation rather than just a diameter and quantity.',
      },
      {
        title: 'How To Proceed',
        text: 'Review the product pages and contact Hovoy for line pipe, marine pipe, or well-related GRE applications.',
      },
    ],
    related: ['/products/line-pipe', '/products/marine-offshore-pipe', '/contact'],
  },
  {
    slug: 'grp-pipe',
    eyebrow: 'Material Guide / GRP Pipe',
    title: 'GRP pipe solutions for water treatment, desalination, utility, and project routing.',
    description:
      'Review GRP pipe solutions for utility systems, desalination, water treatment, and corrosion-sensitive industrial routing.',
    metaTitle: 'GRP Pipe Supplier | Hovoy GRE Pipe',
    metaDescription:
      'Review Hovoy GRP pipe solutions for water treatment, desalination, utility routing, and export-oriented industrial projects.',
    summary:
      'Clients looking for GRP pipe usually focus on utility, water treatment, desalination, and corrosion-sensitive industrial routing where lifecycle performance and package completeness matter.',
    fit: [
      'Water treatment and desalination utility networks',
      'Industrial routes where corrosion resistance and service life affect lifecycle cost',
      'Projects that require fittings and tie-in discussion together with pipe supply',
    ],
    focus: [
      {
        title: 'Where Hovoy Fits',
        text: 'Hovoy fits GRP pipe projects that need product discussion, package thinking, and export communication rather than only a stock quotation.',
      },
      {
        title: 'What Clients Usually Need',
        text: 'GRP pipe projects usually require support on route conditions, equipment tie-ins, fittings ratios, and documentation that supports the final order package.',
      },
      {
        title: 'How To Proceed',
        text: 'Review the line pipe and water treatment pages, then contact Hovoy with the project scope for quotation review.',
      },
    ],
    related: ['/products/line-pipe', '/applications/water-treatment-desalination', '/contact'],
  },
  {
    slug: 'frp-pipe',
    eyebrow: 'Material Guide / FRP Pipe',
    title: 'FRP pipe supply for chemical, utility, marine, and corrosion-sensitive plant service.',
    description:
      'Explore FRP pipe solutions for chemical service, corrosive process environments, plant utilities, and export-oriented supply.',
    metaTitle: 'FRP Pipe Supplier | Hovoy GRE Pipe',
    metaDescription:
      'Explore Hovoy FRP pipe supply for chemical service, plant utility routing, marine systems, fittings, and project-oriented industrial RFQs.',
    summary:
      'Clients looking for FRP pipe are often evaluating chemical plants, corrosive utilities, and broader industrial routing where materials, fittings, and project communication all affect supplier selection.',
    fit: [
      'Corrosive process and utility lines in chemical plants',
      'Industrial projects comparing FRP pipe against metal for service-life reasons',
      'Overseas jobs where documentation and package clarity matter before order placement',
    ],
    focus: [
      {
        title: 'Where Hovoy Fits',
        text: 'Hovoy is suited to FRP pipe projects where the client wants clearer communication on application, fittings, and delivery coordination rather than generic product claims.',
      },
      {
        title: 'What Clients Usually Need',
        text: 'FRP pipe enquiries usually require discussion around service media, temperature, line size, fittings scope, and how the package fits the installation environment.',
      },
      {
        title: 'How To Proceed',
        text: 'Review the chemical processing and line pipe pages, then contact Hovoy for a project-specific FRP discussion.',
      },
    ],
    related: ['/applications/chemical-processing', '/products/line-pipe', '/contact'],
  },
]

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
  const metaSnapshot = useContext(MetaContext)

  if (metaSnapshot) {
    metaSnapshot.title = title
    metaSnapshot.description = description
    metaSnapshot.path = path
  }

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

function SiteLayout({ children }: { children: ReactNode }) {
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
        '.hero-stats > div, .hero-proof-card, .trust-strip p, .pill, .product-card, .sector-card, .capability-card, .highlight-card, .faq-card, .timeline article, .detail-panel, .contact-card',
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
        '.hero-photo-card, .hero-stats > div, .hero-proof-card, .trust-strip p, .pill, .product-card, .sector-card, .capability-card, .highlight-card, .faq-card, .timeline article, .detail-panel, .contact-card',
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
      links: [
        ...productPages.map((item) => ({
          title: item.title,
          text: item.summary,
          to: `/products/${item.slug}`,
        })),
        {
          title: 'GRE / GRP / FRP Material Guides',
          text: 'Review material-family pages when the project starts with GRE, GRP, or FRP selection before the application is fully narrowed.',
          to: '/gre-pipe',
        },
      ],
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
          text: 'FAQ, RFQ preparation, and project guidance for technical and commercial communication.',
          to: '/resources',
        },
      ],
      utility: { label: 'Explore engineering support', to: '/engineering' },
    },
    resources: {
      title: 'Resources And RFQ Support',
      text: 'Use resources pages to answer common project questions, prepare RFQ inputs, and move to contact with a cleaner project brief.',
      links: [
        {
          title: 'Resources',
          text: 'Resource center for project guidance, request preparation, and supporting technical discussion.',
          to: '/resources',
        },
        {
          title: 'Downloads',
          text: 'Documentation focus, data request logic, and project material that can support supplier review.',
          to: '/resources/downloads',
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
          title: 'Why Hovoy',
          text: 'See the reasons clients choose Hovoy for GRE, GRP, FRP, and flexible pipe projects.',
          to: '/why-hovoy',
        },
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
          title: 'GRE / GRP / FRP Material Guides',
          text: 'Material-family pages covering GRE, GRP, and FRP options before moving into product, application, or quotation review.',
          to: '/gre-pipe',
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
              <p className="brand-name">Hovoy GRE Pipe</p>
              <p className="brand-tag">GRE, GRP, and FRP pipe systems for project supply</p>
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
          <p className="brand-name">Hovoy GRE Pipe</p>
          <p className="footer-note">
            Hovoy GRE Pipe supplies GRE, GRP, and FRP pipe systems for well tubing and casing,
            line pipe, marine piping, flexible pipe, fittings, and project-driven industrial applications.
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
  const commercialProof = [
    {
      title: '20+ Years In The Pipe Industry',
      text: 'Hovoy brings more than twenty years of industry experience across GRE, GRP, and FRP pipe supply for industrial, marine, and energy projects.',
    },
    {
      title: 'Strong Material And Process Familiarity',
      text: 'Clients often need suppliers who understand raw materials, reinforcement logic, fittings scope, winding processes, curing, and production coordination rather than only catalogue language.',
    },
    {
      title: 'Overseas Petrochemical Project Exposure',
      text: 'Our team is familiar with working alongside overseas petrochemical and industrial project requirements where documentation, communication, and delivery coordination matter.',
    },
    {
      title: 'Project-Oriented Package Supply',
      text: 'We support pipe, fittings, joints, and RFQ clarification together so the quotation is closer to the actual installation scope.',
    },
  ]

  const projectEntryRoutes = [
    {
      title: 'Start With Product Families',
      text: 'Compare well service, line pipe, marine systems, flexible pipe, and fittings before narrowing the technical path.',
      to: '/products',
    },
    {
      title: 'Start With Applications',
      text: 'Review oil and gas, offshore, desalination, and chemical processing environments before choosing the product family.',
      to: '/applications',
    },
    {
      title: 'Review Quality And Documents',
      text: 'Open manufacturing, quality, and document support when the project is already in supplier review.',
      to: '/resources/downloads',
    },
    {
      title: 'Send A Project RFQ',
      text: 'Move directly to contact when the application, dimensions, pressure class, and scope are already known.',
      to: '/contact',
    },
  ]

  const supportRoutes = [
    {
      title: 'Engineering Guidance',
      text: 'Review material systems, joint methods, and RFQ preparation support before formal technical review.',
      to: '/engineering',
    },
    {
      title: 'Manufacturing And Quality',
      text: 'See production planning, inspection support, shipment readiness, and documentation logic.',
      to: '/about/manufacturing-quality',
    },
    {
      title: 'Downloads',
      text: 'Request product family briefs, quality material, and RFQ support documents tied to the project stage.',
      to: '/resources/downloads',
    },
    {
      title: 'Contact Hovoy',
      text: 'Move directly into product selection, quotation support, or supplier-review discussion.',
      to: '/contact',
    },
  ]

  const heroProofEntries = [
    {
      title: 'Why Hovoy',
      text: 'See the business reasons clients shortlist Hovoy in a crowded GRE, GRP, and FRP pipe market.',
      to: '/why-hovoy',
      label: 'Core positioning',
    },
    {
      title: 'Downloads',
      text: 'Open document entry points for product briefs, RFQ preparation, and quality-related material.',
      to: '/resources/downloads',
      label: 'Document access',
    },
    {
      title: 'Manufacturing and Quality',
      text: 'Review production logic, inspection discussion, shipment readiness, and export-oriented support.',
      to: '/about/manufacturing-quality',
      label: 'Proof content',
    },
  ]

  usePageMeta({
    title: 'GRE, GRP, and FRP Pipe Supplier | Hovoy GRE Pipe',
    description:
      'Hovoy GRE Pipe supplies GRE, GRP, and FRP pipe systems for well tubing and casing, line pipe, marine and offshore pipe, flexible pipe, fittings, and export-oriented industrial projects.',
    path: '/',
  })

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Hovoy GRE Pipe',
    alternateName: 'Hovoy Composite Pipe',
    url: siteUrl,
    email: 'chinahovoy@yahoo.com',
    description:
      'Hovoy GRE Pipe supplies GRE, GRP, and FRP pipe systems for well tubing and casing, line pipe, marine pipe, flexible pipe, and engineered project support.',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">GRE / GRP / FRP Pipe Systems</p>
          <h1>GRE, GRP, and FRP pipe supplier for industrial, marine, and energy projects.</h1>
          <p className="hero-text">
            Hovoy supports well tubing and casing, line pipe, marine and offshore pipe, flexible
            composite pipe, and fittings packages for corrosive service, utility routing, seawater
            systems, and export-oriented industrial supply.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/contact">
              Request Project Review
            </Link>
            <Link className="button button-secondary" to="/products">
              Explore Product Families
            </Link>
            <Link className="button button-secondary" to="/applications">
              Explore Applications
            </Link>
          </div>
          <dl className="hero-stats">
            <div>
              <dt>Industry Experience</dt>
              <dd>20+ years in GRE, GRP, and FRP pipe supply</dd>
            </div>
            <div>
              <dt>Product Coverage</dt>
              <dd>Well, line, marine, flexible pipe, and fittings systems</dd>
            </div>
            <div>
              <dt>Project Fit</dt>
              <dd>Petrochemical, marine, desalination, and chemical-service supply</dd>
            </div>
          </dl>

          <div className="hero-proof-grid" aria-label="Primary proof paths">
            {heroProofEntries.map((item) => (
              <Link className="hero-proof-card" key={item.to} to={item.to}>
                <span>{item.label}</span>
                <strong>{item.title}</strong>
                <small>{item.text}</small>
              </Link>
            ))}
          </div>
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
              <strong>Build the inquiry around service conditions, route logic, fittings scope, and delivery needs.</strong>
              <small>That structure makes it easier for project teams to compare product families, request documents, and move into quotation without losing context.</small>
            </div>
          </figure>
        </div>
      </section>

      <section className="trust-strip" aria-label="Industrial positioning">
        <p>Well service systems</p>
        <p>Produced-water and utility lines</p>
        <p>Marine and offshore routing</p>
        <p>Spoolable field deployment</p>
        <p>Engineering-led project support</p>
      </section>

      <section className="section section-grid">
        <div className="section-heading">
          <p className="eyebrow">Project Entry Routes</p>
          <h2>Start from the commercial or technical path that matches the project stage.</h2>
          <p>
            Strong industrial sites do not force every visitor through the same path. Use the
            route below that best matches where the inquiry currently stands.
          </p>
        </div>

        <div className="sector-grid">
          {projectEntryRoutes.map((item) => (
            <article className="sector-card" key={item.to}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Link className="text-link" to={item.to}>
                Open route
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-grid">
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">Product Families</p>
            <h2>Five primary product routes for different operating environments.</h2>
          </div>
          <p>
            Product pages should help project teams quickly separate well service, line transport, marine
            duty, flexible deployment, and fittings scope instead of treating everything as one
            generic composite pipe category.
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
                Explore {item.title}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-grid">
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">Application Sectors</p>
            <h2>Application-first routes for engineers solving a service problem before choosing a product.</h2>
          </div>
          <p>
            Engineers often arrive with an operating environment in mind, not a final material choice.
            Application pages should bridge that gap by connecting service conditions to the right
            product family, fittings scope, and documentation path.
          </p>
        </div>

        <div className="sector-grid">
          {applicationPages.map((item) => (
            <article className="sector-card" key={item.slug}>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <Link className="text-link" to={`/applications/${item.slug}`}>
                Explore {item.title} applications
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section capability-band">
        <div className="capability-copy">
          <p className="eyebrow">Commercial Proof</p>
          <h2>Show engineering teams why Hovoy is easier to work with than a generic pipe supplier.</h2>
          <p>
            The strongest industrial sites combine technical familiarity, manufacturing discussion,
            export coordination, and package-completeness thinking in one clear story.
          </p>
        </div>

        <div className="capability-grid">
          {commercialProof.slice(0, 3).map((item) => (
            <article className="capability-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-grid">
        <div className="section-heading">
          <p className="eyebrow">Support Paths</p>
          <h2>Keep document support, engineering guidance, and contact routes one click away.</h2>
          <p>
            Good browsing experience in industrial B2B means the visitor can always move from a
            product or application page into engineering help, documentation, or direct contact.
          </p>
        </div>

        <div className="sector-grid">
          {supportRoutes.map((item) => (
            <article className="sector-card" key={item.to}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Link className="text-link" to={item.to}>
                Explore {item.title}
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
          <a href="mailto:chinahovoy@yahoo.com">chinahovoy@yahoo.com</a>
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
    title: 'GRE, GRP, and FRP Pipe Products | Well, Line, Marine, Flexible Pipe',
    description:
      'Explore Hovoy GRE, GRP, and FRP pipe products including well tubing and casing, line pipe, marine and offshore pipe, flexible composite pipe, and fittings and joints.',
    path: '/products/',
  })

  return (
    <PageHero
      eyebrow="Products"
      title="GRE, GRP, and FRP pipe products for well service, line pipe, marine systems, and flexible pipe projects."
      description="Compare Hovoy product families for well tubing and casing, line pipe, marine and offshore pipe, flexible composite pipe, and fittings and joints."
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
                Explore {item.title}
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
              Explore {item.title}
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

  const productSalesModules: Record<
    string,
    {
      fitProjects: string[]
      whyHovoy: Array<{ title: string; text: string }>
      packageScope: string[]
      nextActionTitle: string
      nextActionText: string
    }
  > = {
    'well-tubing-casing': {
      fitProjects: [
        'Corrosive well service where metallic replacement frequency is a concern',
        'Field jobs where lighter handling and installation practicality affect total project cost',
        'Export projects that need tubing or casing discussion together with connection and accessory clarification',
      ],
      whyHovoy: [
        {
          title: 'Material And Process Familiarity',
          text: 'Well projects move faster when the supplier understands corrosion-related service conditions, material selection logic, and the practical impact of manufacturing and accessory scope.',
        },
        {
          title: 'Project-Led RFQ Handling',
          text: 'Hovoy focuses on the actual well environment, tubing or casing range, accessories, and destination-market requirements before quotation.',
        },
        {
          title: 'Export Coordination',
          text: 'Overseas oil and gas projects often need clearer packing, documentation, and delivery communication than stock-only suppliers can provide.',
        },
      ],
      packageScope: [
        'Tubing or casing range matched to corrosive service',
        'Connection and accessory clarification before quotation',
        'Export packing and project delivery communication',
      ],
      nextActionTitle: 'Need a better-structured tubing or casing RFQ?',
      nextActionText:
        'Send the well service description, diameter range, corrosion concerns, accessory scope, and project destination so Hovoy can review the job as a real project package rather than a generic pipe request.',
    },
    'line-pipe': {
      fitProjects: [
        'Petrochemical, utility, and produced-water routes where corrosion resistance affects lifecycle cost',
        'Projects that need straight pipe plus fittings, transitions, and spool logic together',
        'Overseas industrial jobs that require line lists, route sketches, and export delivery coordination',
      ],
      whyHovoy: [
        {
          title: 'Package Thinking, Not Straight Pipe Only',
          text: 'Line pipe enquiries often fail when the supplier quotes pipe without understanding fittings ratio, tie-ins, spool scope, or installation sequence.',
        },
        {
          title: 'Experience With Industrial Project Communication',
          text: 'Hovoy is positioned around EPC, distributor, and end-user RFQ communication where route conditions and package completeness need to be clarified early.',
        },
        {
          title: 'Useful For Petrochemical And Utility Work',
          text: 'This is where material familiarity, process understanding, and practical delivery coordination matter more than generic brochure language.',
        },
      ],
      packageScope: [
        'Straight pipe plus fittings and transition review',
        'Support around line lists, route sketches, and equipment tie-ins',
        'Commercial coordination for packing, delivery, and documentation',
      ],
      nextActionTitle: 'Send a line pipe RFQ with route and fittings scope.',
      nextActionText:
        'If the job includes plant routing, water transfer, produced water, or petrochemical utility lines, send the line list, diameter range, pressure class, fittings estimate, and destination market so the quotation covers the real scope.',
    },
    'marine-offshore-pipe': {
      fitProjects: [
        'Shipboard and offshore systems where seawater exposure and weight reduction must be addressed together',
        'Marine projects that need fittings, routing logic, and export communication instead of pipe-only quotes',
        'Coastal or offshore jobs where documentation and delivery planning affect yard or installation schedules',
      ],
      whyHovoy: [
        {
          title: 'Marine-Focused Product Discussion',
          text: 'Marine jobs require clearer treatment of seawater exposure, routing complexity, support loads, and the mix between straight pipe and connection scope.',
        },
        {
          title: 'Practical Export Coordination',
          text: 'Shipyard and offshore deliveries often depend on cleaner documentation, packing sequence, and communication around fittings and tie-in details.',
        },
        {
          title: 'Project Familiarity Over Generic Sales Copy',
          text: 'Hovoy is building its marine offer around real project concerns: corrosion, weight, route constraints, and package completeness.',
        },
      ],
      packageScope: [
        'Marine pipe and fittings for seawater and utility service',
        'Routing-oriented connection and transition clarification',
        'Export delivery coordination for shipyard and offshore jobs',
      ],
      nextActionTitle: 'Need marine pipe review for shipboard or offshore work?',
      nextActionText:
        'Send the service duty, size range, fittings and joint scope, route constraints, and project destination so Hovoy can align the marine package to the actual installation environment.',
    },
    'flexible-composite-pipe': {
      fitProjects: [
        'Remote field routes where spoolable deployment can reduce installation time and field joining',
        'Oil and gas transport scenarios comparing flexible pipe with rigid GRE or GRP systems',
        'Projects that need faster deployment logic alongside export communication and RFQ clarification',
      ],
      whyHovoy: [
        {
          title: 'Flexible Pipe Treated As Its Own Market',
          text: 'Hovoy does not bury flexible pipe inside generic composite content. It is positioned as a separate project path with its own installation and commercial logic.',
        },
        {
          title: 'Useful For Rigid Vs Flexible Comparison',
          text: 'Clients often need to compare spoolable deployment, route geometry, and fittings scope against rigid fabricated sections before making a decision.',
        },
        {
          title: 'Project-Specific Supply Discussion',
          text: 'Flexible pipe projects move faster when the supplier starts from route length, deployment conditions, pressure class, and destination market instead of only reel size or diameter.',
        },
      ],
      packageScope: [
        'Flexible pipe scope aligned to route length and deployment logic',
        'Discussion around reel-based installation versus rigid section alternatives',
        'Commercial coordination for export delivery and site deployment planning',
      ],
      nextActionTitle: 'Need to compare flexible pipe against rigid pipe for the same route?',
      nextActionText:
        'Send the route length, fluid, pressure class, deployment conditions, and destination market so Hovoy can help decide whether a flexible or rigid solution better fits the project.',
    },
  }

  if (!page) {
    return <Navigate to="/products" replace />
  }

  const productModule = productSalesModules[page.slug]

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: page.title,
    description: page.metaDescription,
    category: page.heroEyebrow.replace('Products / ', ''),
    brand: {
      '@type': 'Brand',
      name: 'Hovoy GRE Pipe',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Hovoy GRE Pipe',
      url: siteUrl,
    },
    url: `${siteUrl}/products/${page.slug}/`,
    keywords: [...page.applications, ...page.serviceMedia].join(', '),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: `${siteUrl}/products/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: page.title,
        item: `${siteUrl}/products/${page.slug}/`,
      },
    ],
  }

  usePageMeta({
    title: `${page.title} | GRE, GRP, and FRP Pipe Supply | Hovoy`,
    description: page.metaDescription,
    path: `/products/${page.slug}/`,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="page-hero product-page-top">
        <nav aria-label="Breadcrumb" className="breadcrumb-list">
          <Link className="breadcrumb-link" to="/">
            Home
          </Link>
          <span className="breadcrumb-separator">/</span>
          <Link className="breadcrumb-link" to="/products">
            Products
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{page.title}</span>
        </nav>

        <div className="product-overview">
          <div className="product-overview-copy">
            <p className="eyebrow">{page.heroEyebrow}</p>
            <h1>{page.title}</h1>
            <p>{page.summary}</p>
            <p className="product-overview-intro">{page.intro}</p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/contact">
                Request Product Review
              </Link>
              <Link className="button button-secondary" to="/applications">
                Browse Applications
              </Link>
            </div>
          </div>

          <aside className="product-overview-rail">
            <article className="rail-card">
              <p className="eyebrow">Engineering Focus</p>
              <ul className="detail-list">
                {page.engineeringFocus.slice(0, 4).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="rail-card">
              <p className="eyebrow">Typical Service Media</p>
              <div className="mini-pill-grid">
                {page.serviceMedia.slice(0, 5).map((item) => (
                  <span className="pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
            <article className="rail-card rail-card-dark">
              <p>Need quotation support?</p>
              <strong>chinahovoy@yahoo.com</strong>
              <span>
                Send media, pressure class, dimensions, fittings scope, and destination market for
                a faster review.
              </span>
              <Link className="button button-primary contact-button" to="/contact">
                Contact Hovoy
              </Link>
            </article>
          </aside>
        </div>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">At A Glance</p>
            <h2>Use this page to evaluate fit, scope, and quotation readiness.</h2>
          </div>
          <p>{page.intro}</p>
        </div>

        <div className="detail-grid">
          <article className="detail-panel">
            <h3>Typical client requirements</h3>
            <ul className="detail-list">
              {page.engineeringFocus.map((item) => (
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
          <p className="eyebrow">Supply Scope</p>
          <h2>What Hovoy can support for this product family.</h2>
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
          <h2>Technical and commercial points that often shape supplier review.</h2>
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
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">Project Fit</p>
            <h2>Where this product family usually fits best.</h2>
          </div>
          <p>
            Product pages should help project teams confirm operating context, package scope, and related
            applications before they ask for a quotation.
          </p>
        </div>

        <div className="detail-grid">
          <article className="detail-panel">
            <h3>Typical Applications</h3>
            <div className="mini-pill-grid">
              {page.applications.map((item) => (
                <span className="pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className="detail-panel">
            <h3>Service Media</h3>
            <div className="mini-pill-grid">
              {page.serviceMedia.map((item) => (
                <span className="pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      {productModule ? (
        <section className="section section-grid page-section">
          <div className="section-heading section-heading-split">
            <div>
              <p className="eyebrow">Best Fit Projects</p>
              <h2>Project conditions where this product family is often selected.</h2>
            </div>
            <p>
              These are the operating conditions and package needs where clients often evaluate
              Hovoy as a supplier.
            </p>
          </div>
          <div className="detail-grid">
            <article className="detail-panel">
              <h3>Project Fit</h3>
              <ul className="detail-list">
                {productModule.fitProjects.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="detail-panel">
              <h3>Typical Package Scope</h3>
              <ul className="detail-list">
                {productModule.packageScope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      ) : null}

      <section className="section section-grid page-section">
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">Inquiry Readiness</p>
            <h2>Give engineers the information they need before sending an RFQ.</h2>
          </div>
          <p>
            Strong product pages reduce back-and-forth by combining commercial reasons to shortlist
            Hovoy with a clear list of project information needed for quotation review.
          </p>
        </div>

        <div className="detail-grid">
          <article className="detail-panel">
            <h3>RFQ Checklist</h3>
            <ul className="detail-list">
              {page.rfqChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="detail-panel detail-panel-accent">
            <h3>{productModule?.nextActionTitle ?? 'Request technical review or quotation support.'}</h3>
            <p>
              {productModule?.nextActionText ??
                'Share the application, media, pressure class, dimensions, fittings scope, and destination market to help us respond more accurately.'}
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/contact">
                Contact Hovoy
              </Link>
              <Link className="button button-secondary" to="/resources/downloads">
                Review documents
              </Link>
            </div>
          </article>
        </div>
      </section>

      {productModule ? (
        <section className="section section-grid page-section">
          <div className="section-heading">
            <p className="eyebrow">Why Hovoy On This Product</p>
            <h2>Reasons clients review Hovoy for this product family.</h2>
          </div>
          <div className="detail-card-grid">
            {productModule.whyHovoy.map((item) => (
              <article className="detail-panel" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Related Applications</p>
          <h2>Application pages commonly reviewed together with this product family.</h2>
        </div>
        <div className="sector-grid">
          {applicationPages
            .filter((item) => page.relatedApplications.includes(item.slug))
            .map((item) => (
              <article className="sector-card" key={item.slug}>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <Link className="text-link" to={`/applications/${item.slug}`}>
                  Explore {item.title}
                </Link>
              </article>
            ))}
        </div>
      </section>

      <CtaSection
        title={productModule?.nextActionTitle ?? 'Request technical review or quotation support for this product line.'}
        text={
          productModule?.nextActionText ??
          'Share the application, media, pressure class, dimensions, fittings scope, and destination market to help us respond more accurately.'
        }
      />
    </>
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
    title: 'Composite Pipe Applications | Oil and Gas, Marine, Desalination, Chemical',
    description:
      'Explore composite pipe applications for oil and gas, marine and offshore, water treatment and desalination, and chemical processing projects.',
    path: '/applications/',
  })

  return (
    <PageHero
      eyebrow="Applications"
      title="Composite pipe applications for oil and gas, marine, desalination, and chemical processing."
      description="Review Hovoy application pages for corrosive service, seawater systems, utility routing, treatment plants, and process piping projects."
    >
      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Application Approach</p>
          <h2>How composite systems fit major operating environments.</h2>
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
                Explore {item.title}
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
              Explore {item.title}
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
    title: `${page.title} Composite Pipe Applications | Hovoy GRE Pipe`,
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
                  Explore {item.title}
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
      text: 'Different service conditions may require different GRE, GRP, FRP, or flexible pipe logic. Project teams usually compare media resistance, operating environment, handling considerations, and lifecycle expectations before final selection.',
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
    title: 'Engineering | GRE, GRP, FRP Pipe Materials, Joints, and Quality',
    description:
      'Review Hovoy engineering support for GRE, GRP, and FRP pipe systems including material selection, joint methods, quality control, standards, and RFQ preparation.',
    path: '/engineering/',
  })

  return (
    <PageHero
      eyebrow="Engineering"
      title="Engineering support for GRE, GRP, FRP, and flexible composite pipe projects."
      description="Review material systems, joint methods, standards, quality control, and project documentation support for composite pipe selection and RFQ preparation."
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
        text: 'Project teams often start by confirming whether a job is better suited to GRE or GRP line pipe, FRP process piping, marine piping, or flexible pipe supply.',
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

  const documentationTypes = [
    {
      title: 'Product Overview Packs',
      text: 'Use these when the project team first needs to compare well pipe, line pipe, marine pipe, flexible pipe, and fittings at a commercial level.',
    },
    {
      title: 'Data Sheet And Scope Review',
      text: 'Useful once the project already has diameter range, pressure class, and route conditions and needs cleaner technical alignment.',
    },
    {
      title: 'Quality And Manufacturing Material',
      text: 'Relevant when the client starts reviewing production logic, inspection discussion, shipment readiness, and export documentation support.',
    },
    {
      title: 'RFQ Preparation Material',
      text: 'Useful when the client still needs help structuring a stronger inquiry before quotation, especially around fittings ratio and installation scope.',
    },
  ]

  usePageMeta({
    title: 'Resources | GRE, GRP, and FRP Pipe FAQ, Downloads, and RFQ Guidance',
    description:
      'See Hovoy resources for GRE, GRP, and FRP pipe FAQ content, downloads, RFQ guidance, and technical information for industrial pipe projects.',
    path: '/resources/',
  })

  return (
    <PageHero
      eyebrow="Resources"
      title="GRE, GRP, and FRP pipe resources, downloads, and RFQ guidance."
      description="Use Hovoy resources to compare product families, prepare RFQs, request technical documents, and organize application details for faster review."
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
          <Link className="text-link" to="/resources/downloads">
            Open downloads page
          </Link>
        </article>
        <article className="capability-card">
          <h3>RFQ Guidance</h3>
          <p>Guidance on application details, dimensions, pressure class, and fittings scope helps improve inquiry quality.</p>
        </article>
      </div>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Resource Focus</p>
          <h2>How these resources support product selection and RFQ preparation.</h2>
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
          <p className="eyebrow">Documentation Paths</p>
          <h2>What kinds of project documents are usually requested.</h2>
        </div>
        <div className="detail-card-grid">
          {documentationTypes.map((item) => (
            <article className="detail-panel" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
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

function DownloadsPage() {
  const downloadPaths = [
    {
      title: 'Product Family Briefs',
      text: 'Requested when clients need a quick internal comparison between well tubing and casing, line pipe, marine pipe, flexible pipe, and fittings.',
    },
    {
      title: 'Project Data Review',
      text: 'Requested when the inquiry already includes pressure class, dimensions, route conditions, and a preliminary fittings scope.',
    },
    {
      title: 'Manufacturing And Quality Material',
      text: 'Requested when the supplier review has moved beyond brochure language and needs production, inspection, and shipment-readiness discussion.',
    },
    {
      title: 'Commercial Support Material',
      text: 'Requested when the project needs clearer RFQ structure, export packing logic, or documentation planning before order placement.',
    },
  ]

  const requestChecklist = [
    'Product family under review or shortlist',
    'Application, service media, and operating environment',
    'Diameter range, pressure class, and expected quantity',
    'Line list, route sketch, or fitting scope when available',
    'Destination market and target delivery timing',
  ]

  const fileEntries = [
    {
      title: 'Product Family Overview',
      status: 'Available on request',
      text: 'Use this entry when the client needs a commercial-level overview of well tubing and casing, line pipe, marine pipe, flexible pipe, and fittings.',
      to: '/contact',
      cta: 'Request via contact',
    },
    {
      title: 'RFQ Preparation Checklist',
      status: 'Open page now',
      text: 'Use this entry when the project still needs help organizing scope, line lists, fittings ratio, and documentation expectations before quotation.',
      to: '/resources',
      cta: 'Open resource page',
    },
    {
      title: 'Manufacturing And Quality Brief',
      status: 'Available on request',
      text: 'Use this entry when the client is reviewing production logic, inspection discussion, packing, and shipment readiness before order placement.',
      to: '/about/manufacturing-quality',
      cta: 'Open quality page',
    },
    {
      title: 'Project Technical Review Path',
      status: 'Open page now',
      text: 'Use this entry when material family, joint methods, and technical clarification should be aligned before requesting deeper project documents.',
      to: '/engineering',
      cta: 'Explore engineering support',
    },
  ]

  usePageMeta({
    title: 'Downloads | Project Documents And Data Support | Hovoy GRE Pipe',
    description:
      'Review Hovoy downloads and documentation support for GRE, GRP, FRP, and flexible pipe projects including product briefs, project data review, and quality-related material.',
    path: '/resources/downloads/',
  })

  return (
    <PageHero
      eyebrow="Resources / Downloads"
      title="Composite pipe downloads and project document support for RFQs."
      description="Request Hovoy product briefs, manufacturing and quality material, and RFQ support documents for GRE, GRP, FRP, and flexible composite pipe projects."
    >
      <section className="section section-grid page-section">
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">Documentation Support</p>
            <h2>Request the document type that matches the stage of the RFQ.</h2>
          </div>
          <p>
            Clients often need different files at different stages, from initial product overviews
            to manufacturing, quality, and quotation support documents.
          </p>
        </div>
        <div className="detail-card-grid">
          {downloadPaths.map((item) => (
            <article className="detail-panel" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">File Entry Points</p>
          <h2>Use these entry points even when the final file set is project-specific.</h2>
        </div>
        <div className="detail-card-grid">
          {fileEntries.map((item) => (
            <article className="detail-panel" key={item.title}>
              <p className="eyebrow detail-panel-tag">{item.status}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Link className="text-link" to={item.to}>
                {item.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Before Requesting Documents</p>
          <h2>Information that helps Hovoy send the right material faster.</h2>
        </div>
        <article className="detail-panel">
          <ul className="detail-list">
            {requestChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Related Pages</p>
          <h2>Use these pages before requesting project documents.</h2>
        </div>
        <div className="sector-grid">
          <article className="sector-card">
            <h3>Why Hovoy</h3>
            <p>Review the commercial reasons project teams shortlist Hovoy for GRE, GRP, and FRP pipe projects.</p>
            <Link className="text-link" to="/why-hovoy">
              Explore why Hovoy
            </Link>
          </article>
          <article className="sector-card">
            <h3>Engineering</h3>
            <p>Use the engineering page when the document request depends on material, joints, or technical review scope.</p>
            <Link className="text-link" to="/engineering">
              Explore engineering support
            </Link>
          </article>
          <article className="sector-card">
            <h3>Contact</h3>
            <p>Move directly to Hovoy if the product family and project context are already clear.</p>
            <Link className="text-link" to="/contact">
              Contact Hovoy
            </Link>
          </article>
        </div>
      </section>

      <CtaSection
        title="Need documents tied to a real RFQ instead of generic brochures?"
        text="Send the product family, application, line scope, pressure class, and destination market so Hovoy can align the right project documents and support material."
      />
    </PageHero>
  )
}

function KeywordPageView({ page }: { page: KeywordPage }) {
  const relatedPages = [
    ...productPages
      .filter((item) => page.related.includes(`/products/${item.slug}`))
      .map((item) => ({
        title: item.title,
        text: item.summary,
        to: `/products/${item.slug}`,
      })),
    ...applicationPages
      .filter((item) => page.related.includes(`/applications/${item.slug}`))
      .map((item) => ({
        title: item.title,
        text: item.summary,
        to: `/applications/${item.slug}`,
      })),
    ...(page.related.includes('/contact')
      ? [
          {
            title: 'Contact Hovoy',
            text: 'Move directly to project communication when the material family and application path are already clear.',
            to: '/contact',
          },
        ]
      : []),
  ]

  usePageMeta({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/${page.slug}/`,
  })

  return (
    <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description}>
      <section className="section section-grid page-section">
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">Material Overview</p>
            <h2>How this material family fits real project requirements.</h2>
          </div>
          <p>{page.summary}</p>
        </div>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Best Fit Projects</p>
          <h2>Projects where this material family is commonly reviewed.</h2>
        </div>
        <article className="detail-panel">
          <ul className="detail-list">
            {page.fit.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Project Requirements</p>
          <h2>What project teams usually need when comparing this material family.</h2>
        </div>
        <div className="detail-card-grid">
          {page.focus.map((item) => (
            <article className="detail-panel" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Continue By Project Need</p>
          <h2>Continue to the product, application, or contact page that fits the project.</h2>
        </div>
        <div className="sector-grid">
          {relatedPages.map((item) => (
            <article className="sector-card" key={item.to}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Link className="text-link" to={item.to}>
                Explore {item.title}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <CtaSection
        title="Need support selecting the right GRE, GRP, or FRP pipe solution?"
        text="Send the material family, application, media, dimensions, and fittings scope so Hovoy can review the inquiry and recommend the most suitable next step."
      />
    </PageHero>
  )
}

function KeywordLandingPage({
  slug,
}: {
  slug: KeywordPage['slug']
}) {
  const page = keywordPages.find((item) => item.slug === slug)

  if (!page) {
    return <Navigate to="/" replace />
  }

  return <KeywordPageView page={page} />
}

function FaqPage() {
  const faqSupportLinks = [
    { title: 'Compare Product Families', text: 'See which system fits well service, line transport, marine duty, or flexible deployment.', to: '/products' },
    { title: 'Review Applications', text: 'Start from oil and gas, marine, desalination, or chemical service if the industry use case is already clear.', to: '/applications' },
    { title: 'Prepare Technical Review', text: 'Use the engineering page to align materials, joints, standards, and RFQ inputs before sending documents.', to: '/engineering' },
    { title: 'Send RFQ', text: 'Move directly to contact if the application, pressure class, and scope are already defined.', to: '/contact' },
  ]

  usePageMeta({
    title: 'FAQ | GRE, GRP, and FRP Pipe Questions for Industrial Projects',
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
        title="Frequently asked questions about GRE, GRP, FRP, and flexible pipe supply."
        description="Review common questions on product fit, application areas, and inquiry preparation for well, line, marine, and flexible pipe systems."
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
                  Explore {item.title}
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
    title: 'About Hovoy | GRE, GRP, and FRP Pipe Supplier For Industrial Projects',
    description:
      'Learn about Hovoy GRE Pipe, our 20+ years of industry experience, product focus, export-oriented supply capability, and support for industrial, marine, and energy pipeline projects.',
    path: '/about/',
  })

  return (
    <PageHero
      eyebrow="About"
      title="About Hovoy GRE Pipe and our composite pipe supply experience."
      description="Learn how Hovoy supports GRE, GRP, and FRP pipe projects across well service, line pipe, marine and offshore systems, flexible pipe, and fittings supply."
    >
      <div className="timeline">
        <article>
          <span>01</span>
          <strong>20+ Years Of Industry Experience</strong>
          <p>Our team brings long-term industry experience across GRE, GRP, FRP, and flexible pipe products for industrial and marine projects.</p>
        </article>
        <article>
          <span>02</span>
          <strong>Material And Process Familiarity</strong>
          <p>We understand raw materials, production flow, fittings scope, and manufacturing coordination behind project supply.</p>
        </article>
        <article>
          <span>03</span>
          <strong>Application Coverage</strong>
          <p>We support oil and gas, marine, desalination, water treatment, petrochemical, and corrosive process applications.</p>
        </article>
        <article>
          <span>04</span>
          <strong>Overseas Project Coordination</strong>
          <p>Technical clarification, quotation review, and export communication help overseas industrial projects move from inquiry to delivery.</p>
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
              GRE, GRP, FRP, or flexible product family instead of sorting through unrelated categories.
            </p>
          </article>
          <article className="detail-panel">
            <h3>Process And Scope Familiarity</h3>
            <p>
              Commercial review benefits when the supplier understands raw materials, manufacturing
              flow, fittings logic, and the balance between straight pipe and fabricated scope.
            </p>
          </article>
          <article className="detail-panel">
            <h3>Overseas Project Communication</h3>
            <p>
              Clearer product pages and engineering guidance help reduce missing information so
              petrochemical and industrial project communication can move faster across borders.
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
            Explore manufacturing and quality support
          </Link>
        </article>
      </section>
    </PageHero>
  )
}

function WhyHovoyPage() {
  const proofPoints = [
    {
      title: '20+ Years Of Industry Experience',
      text: 'Hovoy is not positioning itself as a startup brochure site. The business case is built around long-term familiarity with GRE, GRP, FRP, and flexible pipe supply for industrial and marine projects.',
    },
    {
      title: 'Raw Material And Process Familiarity',
      text: 'Clients in this market often prefer suppliers who understand reinforcement logic, winding and curing processes, fittings scope, and how manufacturing decisions affect delivery and performance.',
    },
    {
      title: 'Overseas Petrochemical Project Exposure',
      text: 'Hovoy is familiar with international project communication where petrochemical and industrial clients expect clearer RFQ handling, documentation logic, and export coordination.',
    },
    {
      title: 'Project Package Thinking',
      text: 'Many competitors still behave like straight-pipe traders. Hovoy is differentiating around package completeness: pipe, fittings, joint logic, and quotation clarification together.',
    },
  ]

  const targetClients = [
    'EPC contractors that need clearer RFQ handling before quotation',
    'Distributors looking for a supplier who can discuss products by application, not just by SKU',
    'End users that need support on line scope, fittings, service media, and export coordination',
  ]

  const conversionPaths = [
    {
      title: 'Material Coverage',
      text: 'Hovoy presents GRE, GRP, and FRP pipe capabilities clearly while keeping flexible composite pipe positioned as a separate product path.',
    },
    {
      title: 'Commercial Clarity',
      text: 'Visitors should quickly understand why Hovoy is easier to work with through industry experience, process familiarity, project communication, and broader package support.',
    },
    {
      title: 'Project Priorities',
      text: 'Many projects begin with line pipe, marine pipe, fittings packages, and corrosive-service industrial projects where package completeness matters.',
    },
  ]

  usePageMeta({
    title: 'Why Hovoy | GRE, GRP, FRP Pipe Supplier Advantages',
    description:
      'See why clients choose Hovoy GRE Pipe for GRE, GRP, FRP, and flexible pipe projects: 20+ years of experience, process familiarity, overseas petrochemical exposure, and project package coordination.',
    path: '/why-hovoy/',
  })

  return (
    <PageHero
      eyebrow="Why Hovoy"
      title="Why engineers specify Hovoy for GRE, GRP, and FRP pipe projects."
      description="See why industrial clients choose Hovoy for GRE, GRP, FRP, and flexible pipe projects, from industry experience and process familiarity to export coordination and package support."
    >
      <section className="section section-grid page-section">
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">Core Differentiators</p>
            <h2>Selection reasons that should appear before price discussion.</h2>
          </div>
          <p>
            In this market, many suppliers can say they offer GRE or FRP pipe. Fewer can explain
            why their process familiarity, RFQ handling, and export coordination reduce friction
            for actual project teams.
          </p>
        </div>
        <div className="detail-card-grid">
          {proofPoints.map((item) => (
            <article className="detail-panel" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Who We Serve Best</p>
          <h2>Client types that fit the Hovoy model.</h2>
        </div>
        <article className="detail-panel">
          <ul className="detail-list">
            {targetClients.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Market Position</p>
          <h2>How Hovoy presents its value to industrial and project teams.</h2>
        </div>
        <div className="detail-card-grid">
          {conversionPaths.map((item) => (
            <article className="detail-panel" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Next Step</p>
          <h2>Move from brand positioning to a product or RFQ page.</h2>
        </div>
        <div className="sector-grid">
          <article className="sector-card">
            <h3>Line Pipe</h3>
            <p>Best for petrochemical, utility, produced-water, and industrial transfer projects.</p>
            <Link className="text-link" to="/products/line-pipe">
              Explore line pipe solutions
            </Link>
          </article>
          <article className="sector-card">
            <h3>Marine and Offshore Pipe</h3>
            <p>Best for seawater, shipboard routing, offshore utility systems, and export package support.</p>
            <Link className="text-link" to="/products/marine-offshore-pipe">
              Explore marine and offshore pipe
            </Link>
          </article>
          <article className="sector-card">
            <h3>Contact Hovoy</h3>
            <p>Send the application, product family, fittings scope, and destination market for a faster review.</p>
            <Link className="text-link" to="/contact">
              Contact Hovoy
            </Link>
          </article>
        </div>
      </section>

      <CtaSection
        title="Need a supplier who understands products, process, and project scope together?"
        text="Send your project details to Hovoy with product family, media, dimensions, fittings scope, and destination market so we can review the commercial and technical fit more accurately."
      />
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

  const projectChecks = [
    'Applicable product family and service description',
    'Dimensions, pressure class, and package scope',
    'Required fittings, transitions, or spool assemblies',
    'Inspection or documentation expectations',
    'Destination market, delivery sequence, and packing notes',
  ]

  usePageMeta({
    title: 'Manufacturing and Quality | GRE, GRP, and FRP Pipe Project Support',
    description:
      'Review Hovoy manufacturing and quality support for GRE, GRP, and FRP pipe projects including production planning, inspection discussion, documentation, and export shipment readiness.',
    path: '/about/manufacturing-quality/',
  })

  return (
    <PageHero
      eyebrow="About / Manufacturing and Quality"
      title="Manufacturing and quality support for GRE, GRP, and FRP pipe supply."
      description="Review Hovoy production planning, inspection discussion, documentation support, and shipment readiness for GRE, GRP, and FRP pipe projects."
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
            {projectChecks.map((item) => (
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

function SmartRFQForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    application: '',
    media: '',
    pressure: '',
    dimensions: '',
    fittingsScope: '',
    destination: '',
    name: '',
    email: '',
    company: '',
    additionalNotes: ''
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const nextStep = () => setStep((s) => s + 1)
  const prevStep = () => setStep((s) => s - 1)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Formatting a mailto link with the structured data
    const subject = encodeURIComponent(`Smart RFQ from ${formData.company || formData.name}`)
    const body = encodeURIComponent(`
Application: ${formData.application}
Media & Temp: ${formData.media}
Pressure Class: ${formData.pressure}
Dimensions/Route: ${formData.dimensions}
Fittings Scope: ${formData.fittingsScope}
Destination: ${formData.destination}

Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}

Notes: ${formData.additionalNotes}
    `)
    window.location.href = `mailto:chinahovoy@yahoo.com?subject=${subject}&body=${body}`
  }

  return (
    <div className="smart-rfq-container">
      <div className="rfq-progress">
        <div className={`step-indicator ${step >= 1 ? 'active' : ''}`}>1. Application</div>
        <div className={`step-indicator ${step >= 2 ? 'active' : ''}`}>2. Technical</div>
        <div className={`step-indicator ${step >= 3 ? 'active' : ''}`}>3. Commercial</div>
        <div className={`step-indicator ${step >= 4 ? 'active' : ''}`}>4. Contact</div>
      </div>

      <form className="rfq-form" onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="form-step slide-in">
            <h3>1. Primary Application</h3>
            <p>Select the main operating environment for your project.</p>
            <div className="radio-grid">
              {['Oil & Gas (Well/Line)', 'Marine & Offshore', 'Water Treatment / Desalination', 'Chemical Processing', 'Other'].map(app => (
                <label key={app} className={`radio-card ${formData.application === app ? 'selected' : ''}`}>
                  <input type="radio" name="application" value={app} checked={formData.application === app} onChange={handleChange} />
                  <span>{app}</span>
                </label>
              ))}
            </div>
            <div className="form-actions right">
              <button type="button" className="button button-primary" onClick={nextStep} disabled={!formData.application}>Next Step</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-step slide-in">
            <h3>2. Technical Parameters</h3>
            <p>Provide basic service conditions to help us align the right material system.</p>
            <div className="input-group">
              <label htmlFor="media">Service Media & Temperature</label>
              <input type="text" id="media" name="media" placeholder="e.g., Raw seawater at 45°C" value={formData.media} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="pressure">Pressure Class Requirements</label>
              <input type="text" id="pressure" name="pressure" placeholder="e.g., 16 Bar / 232 PSI" value={formData.pressure} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="dimensions">Diameter Range & Route Scope</label>
              <input type="text" id="dimensions" name="dimensions" placeholder="e.g., DN200 - DN600, Approx 2km straight pipe" value={formData.dimensions} onChange={handleChange} required />
            </div>
            <div className="form-actions space-between">
              <button type="button" className="button button-secondary" onClick={prevStep}>Back</button>
              <button type="button" className="button button-primary" onClick={nextStep} disabled={!formData.media || !formData.pressure || !formData.dimensions}>Next Step</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-step slide-in">
            <h3>3. Package Scope & Logistics</h3>
            <p>Help us understand the completeness of the package required.</p>
            <div className="input-group">
              <label htmlFor="fittingsScope">Fittings & Transition Scope</label>
              <select id="fittingsScope" name="fittingsScope" value={formData.fittingsScope} onChange={handleChange} required>
                <option value="" disabled>Select scope level...</option>
                <option value="Straight pipe only">Straight pipe only</option>
                <option value="Pipe + Standard Fittings (Elbows, Tees, Flanges)">Pipe + Standard Fittings (Elbows, Tees, Flanges)</option>
                <option value="Complete Spool Prefabrication Required">Complete Spool Prefabrication Required</option>
                <option value="Unsure / Need Engineering Support">Unsure / Need Engineering Support</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="destination">Destination Country / Project Location</label>
              <input type="text" id="destination" name="destination" placeholder="e.g., UAE, Saudi Arabia, Singapore" value={formData.destination} onChange={handleChange} required />
            </div>
            <div className="form-actions space-between">
              <button type="button" className="button button-secondary" onClick={prevStep}>Back</button>
              <button type="button" className="button button-primary" onClick={nextStep} disabled={!formData.fittingsScope || !formData.destination}>Next Step</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="form-step slide-in">
            <h3>4. Contact Details</h3>
            <p>Where should we send the technical review and quotation?</p>
            <div className="input-grid">
              <div className="input-group">
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label htmlFor="company">Company Name</label>
                <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} required />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="email">Work Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="additionalNotes">Additional Project Notes (Optional)</label>
              <textarea id="additionalNotes" name="additionalNotes" rows={3} value={formData.additionalNotes} onChange={handleChange}></textarea>
            </div>
            <div className="form-actions space-between">
              <button type="button" className="button button-secondary" onClick={prevStep}>Back</button>
              <button type="submit" className="button button-primary" disabled={!formData.name || !formData.email || !formData.company}>Submit RFQ</button>
            </div>
          </div>
        )}
      </form>
    </div>
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

  const supportLinks = [
    { title: 'Browse product families', to: '/products' },
    { title: 'Review application pages', to: '/applications' },
    { title: 'Check engineering guidance', to: '/engineering' },
    { title: 'Read FAQ', to: '/resources/faq' },
  ]

  const inquiryTypes = [
    {
      title: 'Product RFQ',
      text: 'For project teams who already know the product family and need quotation support for pipe, fittings, and project package scope.',
    },
    {
      title: 'Technical Review',
      text: 'For projects that still need support on material family, joints, operating conditions, or rigid-versus-flexible selection.',
    },
    {
      title: 'Document Request',
      text: 'For clients requesting product overviews, manufacturing discussion, RFQ preparation support, or supplier-review material.',
    },
    {
      title: 'Commercial Coordination',
      text: 'For export packing, delivery timing, documentation, and package-completeness discussions before order placement.',
    },
  ]

  const contactFlow = [
    {
      title: '1. Define the route',
      text: 'Start from product family, application, or document need so the request reaches the right review path immediately.',
    },
    {
      title: '2. Add project facts',
      text: 'Include media, dimensions, pressure class, line scope, fittings estimate, and destination market where possible.',
    },
    {
      title: '3. Request the next action',
      text: 'Tell us whether you need quotation, technical clarification, file support, or supplier-review discussion.',
    },
  ]

  const contactEntries = [
    {
      title: 'Request quotation support',
      text: 'Use this path for live RFQs covering pipe, fittings, route conditions, and delivery scope.',
      to: '/contact',
      cta: 'Use inquiry email',
    },
    {
      title: 'Request project documents',
      text: 'Use this path when the next step is product overviews, RFQ preparation support, or manufacturing-related material.',
      to: '/resources/downloads',
      cta: 'Open downloads',
    },
    {
      title: 'Narrow the product family first',
      text: 'Use this path if the project still needs help choosing between well, line, marine, or flexible pipe.',
      to: '/products',
      cta: 'Open products',
    },
  ]

  usePageMeta({
    title: 'Contact Hovoy | RFQ For GRE, GRP, and FRP Pipe Systems',
    description:
      'Contact Hovoy GRE Pipe for RFQs related to well tubing and casing, line pipe, marine pipe, flexible pipe, fittings, and engineered project support.',
    path: '/contact/',
  })

  return (
    <PageHero
      eyebrow="Contact"
      title="Contact Hovoy for GRE, GRP, and FRP pipe RFQs and technical review."
      description="Send product scope, service media, dimensions, pressure class, fittings requirements, and destination market for faster quotation and technical review."
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

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Choose The Right Contact Route</p>
          <h2>Choose the contact route that matches the stage of your project.</h2>
        </div>
        <div className="detail-card-grid">
          {inquiryTypes.map((item) => (
            <article className="detail-panel" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="detail-grid">
        <article className="detail-panel rfq-panel-container">
          <p className="eyebrow" style={{marginBottom: '1rem'}}>Smart RFQ Builder</p>
          <h2>Build a complete engineering package request.</h2>
          <SmartRFQForm />
        </article>
      </div>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Contact Flow</p>
          <h2>Use this sequence to improve response quality.</h2>
        </div>
        <div className="detail-card-grid">
          {contactFlow.map((item) => (
            <article className="detail-panel" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Quick Contact Entries</p>
          <h2>Move into the right next step without losing the project context.</h2>
        </div>
        <div className="detail-card-grid">
          {contactEntries.map((item) => (
            <article className="detail-panel" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Link className="text-link" to={item.to}>
                {item.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

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
                Explore {item.title}
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
    title: 'Page Not Found | Hovoy GRE Pipe',
    description: 'The requested Hovoy GRE Pipe page was not found.',
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
  children: ReactNode
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
        <a href="mailto:chinahovoy@yahoo.com">chinahovoy@yahoo.com</a>
        <span>Share product scope, application details, dimensions, pressure class, and destination market.</span>
        <Link className="button button-primary contact-button" to="/contact">
          Contact Hovoy
        </Link>
      </div>
    </section>
  )
}

export function AppRoutes() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/applications/:slug" element={<ApplicationDetailPage />} />
        <Route path="/engineering" element={<EngineeringPage />} />
        <Route path="/why-hovoy" element={<WhyHovoyPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/resources/downloads" element={<DownloadsPage />} />
        <Route path="/resources/faq" element={<FaqPage />} />
        <Route path="/gre-pipe" element={<KeywordLandingPage slug="gre-pipe" />} />
        <Route path="/grp-pipe" element={<KeywordLandingPage slug="grp-pipe" />} />
        <Route path="/frp-pipe" element={<KeywordLandingPage slug="frp-pipe" />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/about/manufacturing-quality" element={<ManufacturingQualityPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SiteLayout>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
