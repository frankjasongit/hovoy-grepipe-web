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
  serviceMedia: string[]
  supplyScope: Array<{ title: string; text: string }>
  selectionNotes: Array<{ title: string; text: string }>
  rfqChecklist: string[]
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
  typicalSystems: Array<{ title: string; text: string }>
  projectDrivers: string[]
  inquiryFocus: string[]
  relatedProducts: string[]
}

export const secondaryNav = [
  { label: 'Products', to: '/products' },
  { label: 'Applications', to: '/applications' },
  { label: 'Engineering', to: '/engineering' },
  { label: 'Why Hovoy', to: '/why-hovoy' },
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
      'Well tubing and casing projects usually focus on corrosive service, handling, installation practicality, and long-term reliability in demanding field environments where standard metallic systems may raise weight or corrosion concerns.',
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
    serviceMedia: ['Produced water', 'Corrosive fluids', 'Water injection support', 'Field utility duty'],
    supplyScope: [
      {
        title: 'Tubing and Casing Supply',
        text: 'Composite well strings aligned to corrosive service, handling conditions, and practical field deployment needs.',
      },
      {
        title: 'Associated Connection Planning',
        text: 'Connection selection can be coordinated around field assembly, maintenance access, and operating environment.',
      },
      {
        title: 'Project Clarification',
        text: 'Inquiry review can cover well environment, service fluid, dimensions, and supporting documentation before quotation.',
      },
    ],
    selectionNotes: [
      {
        title: 'Corrosion Environment',
        text: 'Well-related service often requires stronger attention to chemical exposure, produced water, and long-term material durability.',
      },
      {
        title: 'Handling and Installation',
        text: 'Composite well systems are often evaluated for weight reduction, transport practicality, and field handling efficiency.',
      },
      {
        title: 'Scope Definition',
        text: 'Early clarification of duty, dimensions, accessories, and installation method improves technical review and commercial response.',
      },
    ],
    rfqChecklist: [
      'Well service description and operating environment',
      'Required tubing or casing range',
      'Service media and corrosion concerns',
      'Connection or accessory requirements',
      'Destination market and project schedule',
    ],
    relatedApplications: ['oil-and-gas'],
  },
  {
    slug: 'line-pipe',
    title: 'Line Pipe',
    heroEyebrow: 'Products / Line Pipe',
    summary:
      'Composite line pipe for industrial transport, corrosive process duty, utility networks, and engineered project routing.',
    intro:
      'Line pipe projects typically focus on transport networks, plant utility routing, and engineered pipe systems for corrosive or weight-sensitive service conditions.',
    metaDescription:
      'Review composite line pipe solutions for industrial transport, utility networks, corrosion-resistant process service, and project supply.',
    buyerFocus: [
      'Transport and routing logic across plant or field systems',
      'Corrosion resistance and lifecycle cost discussion',
      'Fittings, spool assemblies, and project package supply',
      'Export packing, delivery planning, and installation sequence for project jobs',
    ],
    highlights: [
      'Line pipe product positioning for transport and process systems',
      'Suitable for dimensional, pressure, and standards-based technical discussion',
      'Connects directly to oil and gas, desalination, and chemical applications',
      'Clarifies line pipe supply apart from well pipe and marine systems',
      'Supports both straight-pipe supply and fabricated package discussion',
    ],
    applications: [
      'Industrial transport lines',
      'Produced water and utility transfer',
      'Utility routing',
      'Water treatment systems',
      'Chemical processing',
    ],
    serviceMedia: ['Process water', 'Saline water', 'Produced water', 'Chemical service', 'Industrial utility fluids'],
    supplyScope: [
      {
        title: 'Straight Pipe Supply',
        text: 'Line pipe can be supplied for transport networks, utility routing, and corrosion-sensitive industrial service.',
      },
      {
        title: 'System Packages',
        text: 'Fittings, spool pieces, and connection planning can be aligned to the route, installation method, and project scope.',
      },
      {
        title: 'Installation-Oriented Supply',
        text: 'Projects can be reviewed around above-ground routing, buried sections, support spacing, field joints, and the mix between prefabrication and site assembly.',
      },
      {
        title: 'Commercial Coordination',
        text: 'Line pipe projects often need clearer communication on dimensions, pressure class, fittings ratio, and export packing requirements.',
      },
    ],
    selectionNotes: [
      {
        title: 'Service Media Fit',
        text: 'Media type, corrosion risk, and plant duty all influence whether line pipe should be configured as a standard supply item or a more application-specific package.',
      },
      {
        title: 'Route Conditions',
        text: 'Above-ground, plant routing, buried service, or utility transfer layouts may change the preferred fittings and support logic.',
      },
      {
        title: 'System Interfaces',
        text: 'Transitions to pumps, tanks, valves, steel headers, or existing plant sections should be clarified early so the fittings package matches the actual tie-in points.',
      },
      {
        title: 'Project Documentation',
        text: 'Line lists, route sketches, and fittings counts help reduce quotation gaps and speed up technical review.',
      },
    ],
    rfqChecklist: [
      'Line service and media description',
      'Diameter range and pressure class',
      'Estimated route length or line list',
      'Tie-in points, equipment interfaces, or support conditions',
      'Required fittings and spool scope',
      'Project location and delivery timing',
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
      'Marine and offshore projects focus on seawater duty, corrosion resistance, weight reduction, installation practicality, and vessel or offshore project constraints.',
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
    serviceMedia: ['Seawater', 'Cooling water', 'Ballast or utility service', 'Corrosive coastal duty'],
    supplyScope: [
      {
        title: 'Marine Piping Supply',
        text: 'Composite marine systems can support shipboard and offshore routing where corrosion resistance and weight reduction are important.',
      },
      {
        title: 'Seawater-Oriented Systems',
        text: 'Marine projects often require pipe, fittings, and support logic for continuous exposure to saline or coastal operating environments.',
      },
      {
        title: 'Project Coordination',
        text: 'Offshore and marine supply discussions often include routing complexity, installation method, and class or project documentation requirements.',
      },
    ],
    selectionNotes: [
      {
        title: 'Weight Reduction',
        text: 'Marine and offshore teams frequently compare composite systems against heavier metallic alternatives where handling and support loads matter.',
      },
      {
        title: 'Seawater Exposure',
        text: 'Continuous saline service makes corrosion resistance and lifecycle reliability a major part of the commercial discussion.',
      },
      {
        title: 'Installation Constraints',
        text: 'Shipboard layouts, offshore modules, and retrofit access conditions all influence product choice and connection strategy.',
      },
    ],
    rfqChecklist: [
      'Shipboard, offshore, or coastal project type',
      'Seawater or utility service description',
      'Pipe size range and operating pressure',
      'Fittings, joints, and installation constraints',
      'Destination yard, country, or project schedule',
    ],
    relatedApplications: ['marine-and-offshore', 'water-treatment-desalination'],
  },
  {
    slug: 'flexible-composite-pipe',
    title: 'Flexible Composite Pipe',
    heroEyebrow: 'Products / Flexible',
    summary:
      'Flexible composite pipe for spoolable transport, oil and gas field service, and installation scenarios where reel-based deployment matters.',
    intro:
      'Flexible composite pipe serves a different market from rigid GRE systems, with project teams focusing on spoolable deployment, RTP/TCP terminology, and fast field installation.',
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
    serviceMedia: ['Produced water', 'Oil and gas transport', 'Field transfer duty', 'Remote utility service'],
    supplyScope: [
      {
        title: 'Spoolable Composite Pipe',
        text: 'Flexible pipe solutions are suited to projects that value reel-based delivery, fast deployment, and reduced field joining complexity.',
      },
      {
        title: 'Field-Oriented Delivery',
        text: 'This product family is relevant where installation speed, remote access, and deployment efficiency matter commercially.',
      },
      {
        title: 'Comparison Support',
        text: 'Buyers often compare flexible systems against rigid alternatives, so inquiry review can focus on installation method and operating duty.',
      },
    ],
    selectionNotes: [
      {
        title: 'Installation Speed',
        text: 'Flexible systems are often selected to reduce field labor, simplify deployment, and improve efficiency in remote or repetitive route conditions.',
      },
      {
        title: 'Spoolable Logistics',
        text: 'Reel-based transport and deployment can be a strong advantage where route length, access, or schedule pressure shape the project plan.',
      },
      {
        title: 'Rigid vs Flexible Choice',
        text: 'Application conditions, route geometry, and maintenance expectations all influence whether a flexible or rigid composite system is the better fit.',
      },
    ],
    rfqChecklist: [
      'Service fluid and operating environment',
      'Approximate route length and deployment conditions',
      'Pressure class and field layout',
      'Preference for spoolable or rigid solution',
      'Project timing and destination market',
    ],
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
      'Transition details to pumps, valves, tanks, and steel interfaces',
    ],
    highlights: [
      'Dedicated fittings and joints product focus',
      'Supports connection and engineering discussion',
      'Useful across well, line, marine, and plant projects',
      'Improves RFQ quality by clarifying full supply scope',
      'Helps avoid under-scoped straight-pipe quotations',
    ],
    applications: ['System routing', 'Plant installation', 'Field assembly', 'Marine systems', 'Skid and module tie-ins'],
    serviceMedia: ['System-wide support', 'Process and utility duty', 'Plant installation', 'Marine routing', 'Tie-in and transition service'],
    supplyScope: [
      {
        title: 'Standard Fittings',
        text: 'Elbows, tees, reducers, flanges, and related items help complete pipe packages for industrial and marine systems.',
      },
      {
        title: 'Transition Components',
        text: 'Projects often require flanged ends, reducers, stub ends, or connection pieces that align composite pipe runs with equipment nozzles and mixed-material tie-in points.',
      },
      {
        title: 'Connection Planning',
        text: 'Jointing methods can be reviewed alongside installation conditions, field assembly requirements, and maintenance expectations.',
      },
      {
        title: 'Package Completion',
        text: 'Including fittings and joints in the RFQ improves scope clarity and helps avoid under-defined straight-pipe-only quotations.',
      },
    ],
    selectionNotes: [
      {
        title: 'System Completeness',
        text: 'Many projects depend on fittings ratio, spool arrangement, and connection logic rather than pipe alone.',
      },
      {
        title: 'Installation Method',
        text: 'Field assembly, shop fabrication, and access limitations often drive different fitting and joint requirements.',
      },
      {
        title: 'Tie-In Conditions',
        text: 'Interface loads, connection count, valve stations, and equipment tie-ins should be clarified before finalizing the fittings scope and transition details.',
      },
      {
        title: 'Commercial Clarity',
        text: 'Fittings scope should be clarified early to align quantities, packaging, and delivery expectations.',
      },
    ],
    rfqChecklist: [
      'Base pipe system and application',
      'Fittings list or estimated quantities',
      'Connection method requirements',
      'Tie-in points, equipment interfaces, or valve stations',
      'Need for shop spools or field assembly',
      'Project destination and packing expectations',
    ],
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
      'Oil and gas projects often compare well products, line pipe, and flexible transport options within the same project scope, especially in corrosive or logistically demanding field environments.',
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
    typicalSystems: [
      {
        title: 'Well Service Systems',
        text: 'Well tubing and casing are relevant where corrosive service, handling, and lifecycle performance affect operating decisions.',
      },
      {
        title: 'Field Line Networks',
        text: 'Line pipe is often selected for field transport, utility routing, and project systems that need corrosion-resistant flow paths.',
      },
      {
        title: 'Flexible Transport Solutions',
        text: 'Flexible composite pipe is relevant where spoolable deployment and faster field installation provide a commercial advantage.',
      },
    ],
    projectDrivers: [
      'Corrosive media and remote operating conditions',
      'Transport and handling efficiency',
      'Comparison between rigid and flexible pipeline concepts',
      'Project-based supply and export coordination',
    ],
    inquiryFocus: [
      'Application type: well, line, or flexible system',
      'Service fluid and operating environment',
      'Pressure class, line scope, and fittings needs',
      'Destination market and project timing',
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
      'Marine projects evaluate materials through the lens of seawater, weight, corrosion, and vessel or offshore routing constraints, especially when maintenance access and onboard space are limited.',
    metaDescription:
      'Review composite pipe applications for marine and offshore environments including seawater systems and corrosion-resistant shipboard routing.',
    concerns: [
      'Seawater corrosion and long service life',
      'Weight constraints on vessel or offshore routing',
      'Application-specific fittings and joint requirements',
      'Project communication for export-oriented clients',
    ],
    advantages: [
      'Composite pipe is attractive where corrosion and weight are persistent constraints',
      'Marine-specific product positioning supports more credible communication',
      'Suitable for standards, project examples, and system-specific discussion',
      'Keeps marine requirements separate from unrelated industrial pipe uses',
    ],
    typicalSystems: [
      {
        title: 'Shipboard Utility Lines',
        text: 'Marine utility systems may prioritize corrosion resistance, lower weight, and practical routing through constrained vessel spaces.',
      },
      {
        title: 'Offshore Support Systems',
        text: 'Offshore projects often require pipe and fittings for harsh environments where saline exposure and maintenance access matter.',
      },
      {
        title: 'Coastal and Seawater Duty',
        text: 'Coastal facilities and seawater-related projects often need pipe systems designed around long-term corrosive exposure.',
      },
    ],
    projectDrivers: [
      'Continuous saline exposure',
      'Weight-sensitive routing and support loads',
      'Vessel or offshore installation constraints',
      'Project documentation and technical clarification',
    ],
    inquiryFocus: [
      'Shipboard, offshore, or coastal use case',
      'Seawater or utility service conditions',
      'Dimensions, pressure class, and fittings scope',
      'Class, yard, or project delivery requirements',
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
      'Long plant routing with multiple equipment interfaces',
    ],
    advantages: [
      'Application pages help project teams understand the service context before comparing products',
      'Composite line pipe can be positioned against corrosion-related metal challenges',
      'Supports both desalination and general treatment utility discussions',
      'Supports both process and utility system inquiry flow',
      'Useful for projects where saline exposure and maintenance reduction matter together',
    ],
    typicalSystems: [
      {
        title: 'Plant Utility Lines',
        text: 'Treatment projects often need corrosion-resistant utility and process support piping across multiple operating zones.',
      },
      {
        title: 'Saline Water Transport',
        text: 'Desalination facilities and saline service systems may benefit from composite line pipe and compatible fittings packages.',
      },
      {
        title: 'Treatment Process Support',
        text: 'Pipe selection often depends on media compatibility, route complexity, and lifecycle maintenance expectations.',
      },
      {
        title: 'Equipment Tie-In Networks',
        text: 'Plants often include pumps, tanks, skids, and filter blocks that require coordinated fittings, transitions, and installation sequencing.',
      },
    ],
    projectDrivers: [
      'Corrosion exposure in saline or treatment duty',
      'Utility system reliability',
      'Compatibility of pipe and fittings packages',
      'Longer lifecycle expectations',
      'Reduced maintenance burden across plant operating zones',
    ],
    inquiryFocus: [
      'Plant type and service media',
      'Line scope and pressure class',
      'Interface points to pumps, tanks, or treatment skids',
      'Straight pipe and fittings requirements',
      'Destination market and project timing',
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
      'Chemical processing projects usually review pipe systems around corrosion risk, media compatibility, maintenance burden, and how the full pipe-and-fittings package performs in plant service.',
    metaDescription:
      'Explore composite pipe solutions for chemical processing and corrosive plant applications requiring long-life piping systems.',
    concerns: [
      'Aggressive media and corrosion risk',
      'System compatibility across pipe and fittings',
      'Application-specific product selection',
      'Shutdown costs linked to maintenance and replacement',
    ],
    advantages: [
      'Composite pipe can be positioned as a corrosion-resistant option for selected process and utility duties',
      'Connects line pipe and fittings pages directly to plant use cases',
      'Improves search intent match for chemical-related traffic',
      'Supports technical review around media compatibility and system completeness',
      'Helps frame lifecycle and maintenance discussion for corrosive service',
    ],
    typicalSystems: [
      {
        title: 'Corrosive Process Lines',
        text: 'Chemical process systems often need materials selected around corrosion, compatibility, and maintenance reduction.',
      },
      {
        title: 'Plant Utility Networks',
        text: 'Composite line pipe and fittings can support utility and secondary process duties in corrosion-sensitive environments.',
      },
      {
        title: 'System Accessory Packages',
        text: 'Fittings, reducers, and flanged transitions are often as important as straight pipe in plant installations.',
      },
      {
        title: 'Maintenance-Sensitive Utility Runs',
        text: 'Secondary chemical utilities and wash systems may also benefit from corrosion-resistant pipe packages where unplanned replacement is costly.',
      },
    ],
    projectDrivers: [
      'Chemical media compatibility',
      'Corrosion-driven maintenance concerns',
      'System completeness across pipe and fittings',
      'Application-specific technical review',
      'Longer service life in aggressive plant environments',
    ],
    inquiryFocus: [
      'Service media and process conditions',
      'Line size range and pressure class',
      'Required fittings and transitions',
      'Operating temperature, routing conditions, or equipment interfaces',
      'Project timeline and destination market',
    ],
    relatedProducts: ['line-pipe', 'fittings-and-joints'],
  },
]

export const faqItems = [
  {
    question: 'What product lines does Hovoy GRE Pipe supply?',
    answer:
      'Hovoy GRE Pipe focuses on GRE, GRP, and FRP pipe systems for well tubing and casing, line pipe, marine and offshore pipe, flexible pipe, and related fittings and joint systems.',
  },
  {
    question: 'Which industries commonly use these composite pipe systems?',
    answer:
      'Typical application areas include oil and gas, marine and offshore service, water treatment and desalination, petrochemical plants, and corrosive chemical process environments.',
  },
  {
    question: 'Should flexible composite pipe be treated as a separate product line?',
    answer:
      'Yes. Flexible pipe competes under its own terms such as spoolable pipe, RTP, and flexible transport systems. It should not be buried inside rigid GRE, GRP, or FRP pipe content.',
  },
  {
    question: 'What information should be included in an RFQ?',
    answer:
      'The most useful RFQs include the application, service media, dimensions, pressure class, fittings scope, destination country, and any drawings or line lists available.',
  },
  {
    question: 'How should project teams choose between rigid line pipe and flexible composite pipe?',
    answer:
      'That decision usually depends on route geometry, installation speed targets, spoolable deployment needs, pressure class, and whether the project benefits more from reel-based installation or rigid fabricated sections.',
  },
  {
    question: 'Can Hovoy support fittings, joints, and spool packages together with pipe supply?',
    answer:
      'Yes. Many projects require more than straight pipe, so fittings, transitions, flanges, reducers, and spool-related scope should be reviewed together with the base pipe requirement.',
  },
  {
    question: 'Which details help speed up technical review for water treatment or desalination projects?',
    answer:
      'Plant type, service media, pressure class, route conditions, equipment tie-in points, and the expected mix of straight pipe and fittings all help clarify the correct line pipe package faster.',
  },
  {
    question: 'What do marine and offshore teams usually need to clarify first?',
    answer:
      'Marine and offshore inquiries usually need to clarify whether the service is shipboard, offshore, or coastal, along with seawater exposure, routing constraints, pipe size range, and fittings or class-related requirements.',
  },
  {
    question: 'Why is a separate manufacturing and quality page useful for industrial clients?',
    answer:
      'Industrial clients often review production logic, inspection discussion, documentation scope, raw material familiarity, and export shipment readiness before order placement, so that information deserves a dedicated page rather than being hidden inside general sales copy.',
  },
]
