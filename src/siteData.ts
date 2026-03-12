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
      'Separate page architecture for well-related search intent',
      'Commercial structure that can later absorb technical specifications',
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
      'Line pipe pages should attract buyers looking for transport networks, plant utility routing, and engineered pipe systems. This is one of the strongest industrial search categories and needs its own keyword and content structure.',
    metaDescription:
      'Review composite line pipe solutions for industrial transport, utility networks, corrosion-resistant process service, and project supply.',
    buyerFocus: [
      'Transport and routing logic across plant or field systems',
      'Corrosion resistance and lifecycle cost discussion',
      'Fittings, spool assemblies, and project package supply',
    ],
    highlights: [
      'Dedicated line pipe product positioning for industrial search traffic',
      'Supports future pages for dimensions, pressure ranges, and standards',
      'Can connect directly to oil and gas, desalination, and chemical pages',
      'Helps separate line pipe intent from well pipe and marine buyers',
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
      'Marine and offshore buyers evaluate products differently from land-based industrial buyers. They care about seawater, corrosion, weight, installation practicality, and ship or offshore project constraints. This page isolates that demand clearly.',
    metaDescription:
      'Explore marine and offshore composite pipe systems for seawater duty, shipboard utility service, and corrosion-resistant offshore applications.',
    buyerFocus: [
      'Seawater and saline corrosion resistance',
      'Weight reduction for shipboard and offshore routing',
      'Project and standards discussion aligned to marine use',
    ],
    highlights: [
      'Marine and offshore pipe is a distinct SEO and commercial category',
      'Supports future content for shipboard systems and offshore environments',
      'Separates marine buyers from line pipe and well pipe traffic',
      'Fits export and project-oriented sales communication',
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
      'Flexible composite pipe competes in a different market from rigid GRE systems. Buyers search around spoolable pipe, RTP, TCP, and flexible composite transport solutions, so this product line needs its own route and terminology.',
    metaDescription:
      'Discover flexible composite pipe systems for spoolable transport, field deployment, and oil and gas service applications.',
    buyerFocus: [
      'Spoolable deployment and installation speed',
      'Oil and gas transport scenarios',
      'Comparison versus rigid pipe systems',
    ],
    highlights: [
      'Own page for flexible composite pipe and spoolable search intent',
      'Can later support RTP/TCP terminology and comparison content',
      'Useful for oil and gas and remote installation scenarios',
      'Avoids burying flexible pipe under rigid GRE content',
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
      'Fittings and connection systems are essential to project conversion. They need a dedicated page because RFQs often depend on elbows, tees, reducers, flanges, and jointing logic rather than straight pipe alone.',
    metaDescription:
      'Review composite fittings and joint systems including elbows, tees, flanges, reducers, and project-driven connection solutions.',
    buyerFocus: [
      'Complete system supply instead of straight pipe only',
      'Connection logic matched to installation method',
      'Commercial support for project routing and spool design',
    ],
    highlights: [
      'Dedicated conversion page for fittings-related searches',
      'Supports future connection and engineering content',
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
      'Oil and gas buyers usually compare well products, line pipe, and flexible transport options under one sector umbrella. This page acts as the industry landing page that connects those separate product families.',
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
      'Dedicated pages help buyers compare well, line, and flexible systems clearly',
      'Application-first content improves RFQ quality and search visibility',
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
      'Marine-specific page structure supports more credible positioning',
      'This route can later absorb standards and project examples',
      'Separates marine traffic from unrelated industrial pipe searches',
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
      'Water treatment and desalination projects often search by plant type and corrosion context rather than by pipe material first. This page helps catch that application traffic and route it into the right product families.',
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
      'This route can later grow into desalination-specific keyword pages',
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
    question: 'Why should Hovoy separate well pipe, line pipe, marine pipe, and flexible pipe into different pages?',
    answer:
      'Because those buyer groups search differently, compare different standards, and ask different RFQ questions. Separate pages create better SEO targeting and stronger commercial clarity.',
  },
  {
    question: 'Why is a single homepage not enough for this industry?',
    answer:
      'A single homepage cannot effectively rank for product-specific and application-specific search intent. Industrial competitors usually separate product families, industry pages, engineering pages, and resources.',
  },
  {
    question: 'Should flexible composite pipe be treated as a separate product line?',
    answer:
      'Yes. Flexible composite pipe competes under its own terms such as spoolable pipe, RTP, and flexible transport systems. It should not be buried inside rigid GRE product content.',
  },
  {
    question: 'What content should be added after the structure phase?',
    answer:
      'The highest-value next content is standards, material systems, joint methods, downloadable data sheets, and stronger RFQ guidance for each product and application page.',
  },
]
