export const siteUrl = 'https://hovoy-grepipe.com'

export type ProductPage = {
  slug: string
  title: string
  heroEyebrow: string
  summary: string
  intro: string
  metaDescription: string
  buyerFocus: string[]
  highlights: string[]
  applications: string[]
  relatedApplications: string[]
}

export type ApplicationPage = {
  slug: string
  title: string
  heroEyebrow: string
  summary: string
  intro: string
  metaDescription: string
  concerns: string[]
  advantages: string[]
  relatedProducts: string[]
}

export const secondaryNav = [
  { label: 'Products', to: '/products' },
  { label: 'Applications', to: '/applications' },
  { label: 'Engineering', to: '/engineering' },
  { label: 'Resources', to: '/resources' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const productPages: ProductPage[] = [
  {
    slug: 'well-tubing-casing',
    title: 'Well Tubing and Casing',
    heroEyebrow: 'Products / Well',
    summary:
      'Composite well tubing and casing for corrosive production environments where weight, corrosion, and lifecycle cost matter.',
    intro:
      'Well tubing and casing buyers usually care about corrosive service, handling, installation practicality, and long-term reliability in demanding field environments. This page separates that demand from general line pipe or marine pipe traffic.',
    metaDescription:
      'Explore composite well tubing and casing systems for corrosive service, field installation efficiency, and engineered well applications.',
    buyerFocus: [
      'Corrosion resistance in aggressive well environments',
      'Handling and installation efficiency versus metal alternatives',
      'Project-specific supply logic rather than generic stock listing',
    ],
    highlights: [
      'Field-oriented composite well product positioning',
      'Lower weight handling logic for operational practicality',
      'Product scope aligned to well-service operating conditions',
      'Technical information can be matched to project requirements',
    ],
    applications: ['Oil and gas wells', 'Produced water handling', 'Corrosive field service'],
    relatedApplications: ['oil-and-gas'],
  },
  {
    slug: 'line-pipe',
    title: 'Line Pipe',
    heroEyebrow: 'Products / Line Pipe',
    summary:
      'Composite line pipe for industrial transport, corrosive process duty, utility networks, and engineered project routing.',
    intro:
      'Line pipe buyers typically focus on transport networks, plant utility routing, and engineered pipe systems for corrosive or weight-sensitive service conditions.',
    metaDescription:
      'Review composite line pipe solutions for industrial transport, utility networks, corrosion-resistant process service, and project supply.',
    buyerFocus: [
      'Transport and routing logic across plant or field systems',
      'Corrosion resistance and lifecycle cost discussion',
      'Fittings, spool assemblies, and project package supply',
    ],
    highlights: [
      'Line pipe product positioning for transport and process systems',
      'Suitable for dimensional, pressure, and standards-based technical discussion',
      'Connects directly to oil and gas, desalination, and chemical applications',
      'Clarifies line pipe supply apart from well pipe and marine systems',
    ],
    applications: [
      'Industrial transport lines',
      'Utility routing',
      'Water treatment systems',
      'Chemical processing',
    ],
    relatedApplications: ['oil-and-gas', 'water-treatment-desalination', 'chemical-processing'],
  },
  {
    slug: 'marine-offshore-pipe',
    title: 'Marine and Offshore Pipe',
    heroEyebrow: 'Products / Marine',
    summary:
      'Composite marine and offshore pipe systems for seawater duty, shipboard utility lines, and offshore corrosion-sensitive environments.',
    intro:
      'Marine and offshore buyers focus on seawater duty, corrosion resistance, weight reduction, installation practicality, and vessel or offshore project constraints.',
    metaDescription:
      'Explore marine and offshore composite pipe systems for seawater duty, shipboard utility service, and corrosion-resistant offshore applications.',
    buyerFocus: [
      'Seawater and saline corrosion resistance',
      'Weight reduction for shipboard and offshore routing',
      'Project and standards discussion aligned to marine use',
    ],
    highlights: [
      'Dedicated marine and offshore product positioning',
      'Suitable for shipboard and offshore system discussion',
      'Clear separation from line pipe and well-service requirements',
      'Supports export and project-oriented commercial communication',
    ],
    applications: ['Shipboard utilities', 'Seawater systems', 'Offshore platforms', 'Coastal projects'],
    relatedApplications: ['marine-and-offshore', 'water-treatment-desalination'],
  },
  {
    slug: 'flexible-composite-pipe',
    title: 'Flexible Composite Pipe',
    heroEyebrow: 'Products / Flexible',
    summary:
      'Flexible composite pipe for spoolable transport, oil and gas field service, and installation scenarios where reel-based deployment matters.',
    intro:
      'Flexible composite pipe serves a different market from rigid GRE systems, with buyers focusing on spoolable deployment, RTP/TCP terminology, and fast field installation.',
    metaDescription:
      'Discover flexible composite pipe systems for spoolable transport, field deployment, and oil and gas service applications.',
    buyerFocus: [
      'Spoolable deployment and installation speed',
      'Oil and gas transport scenarios',
      'Comparison versus rigid pipe systems',
    ],
    highlights: [
      'Dedicated flexible pipe offering for spoolable transport duty',
      'Supports RTP/TCP terminology and product comparison',
      'Useful for oil and gas and remote installation scenarios',
      'Clearly separated from rigid composite pipe systems',
    ],
    applications: ['Oil and gas field transport', 'Remote field deployment', 'Reel-based installation'],
    relatedApplications: ['oil-and-gas'],
  },
  {
    slug: 'fittings-and-joints',
    title: 'Fittings and Joints',
    heroEyebrow: 'Products / Fittings',
    summary:
      'Composite fittings, joint systems, and project connection solutions that complete the commercial supply package around pipe.',
    intro:
      'Fittings and connection systems are essential to complete project supply. Many RFQs depend as much on elbows, tees, reducers, flanges, and jointing logic as on straight pipe.',
    metaDescription:
      'Review composite fittings and joint systems including elbows, tees, flanges, reducers, and project-driven connection solutions.',
    buyerFocus: [
      'Complete system supply instead of straight pipe only',
      'Connection logic matched to installation method',
      'Commercial support for project routing and spool design',
    ],
    highlights: [
      'Dedicated fittings and joints product focus',
      'Supports connection and engineering discussion',
      'Useful across well, line, marine, and plant projects',
      'Improves RFQ quality by clarifying full supply scope',
    ],
    applications: ['System routing', 'Plant installation', 'Field assembly', 'Marine systems'],
    relatedApplications: ['oil-and-gas', 'marine-and-offshore', 'chemical-processing'],
  },
]

export const applicationPages: ApplicationPage[] = [
  {
    slug: 'oil-and-gas',
    title: 'Oil and Gas',
    heroEyebrow: 'Applications / Oil and Gas',
    summary:
      'Composite pipe systems for oil and gas transport, corrosive field service, well environments, and spoolable deployment scenarios.',
    intro:
      'Oil and gas buyers often compare well products, line pipe, and flexible transport options within the same project scope, especially in corrosive or logistically demanding field environments.',
    metaDescription:
      'Explore composite pipe applications for oil and gas including well systems, line pipe, and flexible composite transport solutions.',
    concerns: [
      'Corrosive service and field reliability',
      'Installation practicality in remote conditions',
      'Product differentiation between rigid and flexible systems',
      'Commercial fit for project-driven supply',
    ],
    advantages: [
      'Composite solutions can reduce corrosion-related maintenance pressure',
      'Weight advantages can simplify transport and handling',
      'Well, line, and flexible systems can be compared more clearly by application',
      'Application-focused content helps improve RFQ quality and technical review',
    ],
    relatedProducts: ['well-tubing-casing', 'line-pipe', 'flexible-composite-pipe', 'fittings-and-joints'],
  },
  {
    slug: 'marine-and-offshore',
    title: 'Marine and Offshore',
    heroEyebrow: 'Applications / Marine',
    summary:
      'Composite marine and offshore piping for seawater duty, corrosion-sensitive utility service, and project environments where weight matters.',
    intro:
      'Marine buyers evaluate materials through the lens of seawater, weight, corrosion, and vessel or offshore routing constraints. That logic deserves an industry page separate from land-based industrial applications.',
    metaDescription:
      'Review composite pipe applications for marine and offshore environments including seawater systems and corrosion-resistant shipboard routing.',
    concerns: [
      'Seawater corrosion and long service life',
      'Weight constraints on vessel or offshore routing',
      'Application-specific fittings and joint requirements',
      'Project communication for export-oriented buyers',
    ],
    advantages: [
      'Composite pipe is attractive where corrosion and weight are persistent constraints',
      'Marine-specific product positioning supports more credible communication',
      'Suitable for standards, project examples, and system-specific discussion',
      'Keeps marine requirements separate from unrelated industrial pipe uses',
    ],
    relatedProducts: ['marine-offshore-pipe', 'fittings-and-joints', 'line-pipe'],
  },
  {
    slug: 'water-treatment-desalination',
    title: 'Water Treatment and Desalination',
    heroEyebrow: 'Applications / Water',
    summary:
      'Composite pipe applications for treatment plants, desalination systems, corrosive utility duty, and saline water transport.',
    intro:
      'Water treatment and desalination projects often begin with plant duty, corrosion environment, and saline service requirements rather than material type alone.',
    metaDescription:
      'Learn how composite pipe systems fit water treatment and desalination applications requiring corrosion resistance and utility system reliability.',
    concerns: [
      'Corrosion in saline and treatment environments',
      'Utility system reliability and lifecycle cost',
      'Line pipe and fittings package compatibility',
    ],
    advantages: [
      'Application pages let buyers understand the service context before comparing products',
      'Composite line pipe can be positioned against corrosion-related metal challenges',
      'The content can expand into more specific desalination and treatment scenarios',
      'Supports both process and utility system inquiry flow',
    ],
    relatedProducts: ['line-pipe', 'marine-offshore-pipe', 'fittings-and-joints'],
  },
  {
    slug: 'chemical-processing',
    title: 'Chemical Processing',
    heroEyebrow: 'Applications / Chemical',
    summary:
      'Composite piping applications for chemical media, corrosive process systems, and plant environments where lifecycle durability matters.',
    intro:
      'Chemical processing buyers need a clear explanation of why composite piping makes sense for corrosive process duty. This page should become the sector hub for that conversation and point to the most relevant product families.',
    metaDescription:
      'Explore composite pipe solutions for chemical processing and corrosive plant applications requiring long-life piping systems.',
    concerns: [
      'Aggressive media and corrosion risk',
      'System compatibility across pipe and fittings',
      'Application-specific product selection',
    ],
    advantages: [
      'Industry pages help frame composite pipe as a solution to corrosion-sensitive process duty',
      'Connects line pipe and fittings pages directly to plant use cases',
      'Improves search intent match for chemical-related traffic',
      'Creates space for future media and standards content',
    ],
    relatedProducts: ['line-pipe', 'fittings-and-joints'],
  },
]

export const faqItems = [
  {
    question: 'What product lines does Hovoy Composite Pipe supply?',
    answer:
      'Hovoy Composite Pipe focuses on well tubing and casing, line pipe, marine and offshore pipe, flexible composite pipe, and related fittings and joint systems.',
  },
  {
    question: 'Which industries commonly use these composite pipe systems?',
    answer:
      'Typical application areas include oil and gas, marine and offshore service, water treatment and desalination, and corrosive chemical process environments.',
  },
  {
    question: 'Should flexible composite pipe be treated as a separate product line?',
    answer:
      'Yes. Flexible composite pipe competes under its own terms such as spoolable pipe, RTP, and flexible transport systems. It should not be buried inside rigid GRE product content.',
  },
  {
    question: 'What information should be included in an RFQ?',
    answer:
      'The most useful RFQs include the application, service media, dimensions, pressure class, fittings scope, destination country, and any drawings or line lists available.',
  },
]
