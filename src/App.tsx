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
  siteUrl,
} from './siteData'

type MetaConfig = {
  title: string
  description: string
  path: string
}

export type MetaSnapshot = Partial<MetaConfig>
export const MetaContext = createContext<MetaSnapshot | null>(null)

const primaryInquiryEmail = 'sales@hovoy-grepipe.com'
const secondaryInquiryEmail = 'chinahovoy@yahoo.com'

const footerColumns = [
  {
    title: 'Product Lines',
    links: [
      { label: 'Line Pipe', to: '/products/line-pipe' },
      { label: 'Well Tubing and Casing', to: '/products/well-tubing-casing' },
      { label: 'Marine and Offshore Pipe', to: '/products/marine-offshore-pipe' },
      { label: 'Flexible Composite Pipe', to: '/products/flexible-composite-pipe' },
      { label: 'Fittings and Joints', to: '/products/fittings-and-joints' },
    ],
  },
  {
    title: 'Applications and Support',
    links: [
      { label: 'Oil and Gas', to: '/applications/oil-and-gas' },
      { label: 'Marine and Offshore', to: '/applications/marine-and-offshore' },
      { label: 'Water Treatment and Desalination', to: '/applications/water-treatment-desalination' },
      { label: 'Chemical Processing', to: '/applications/chemical-processing' },
      { label: 'Downloads', to: '/resources/downloads' },
      { label: 'FAQ', to: '/resources/faq' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Why Hovoy', to: '/why-hovoy' },
      { label: 'Manufacturing and Quality', to: '/manufacturing-quality' },
      { label: 'Engineering', to: '/engineering' },
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
  },
]

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

type ProductLandingChoiceCard = {
  imageSrc: string
  imageAlt: string
  title: string
  description: string
  filterId: string
}

type ProductLandingFilter = {
  id: string
  label: string
}

type ProductLandingProductCard = {
  id: string
  category: string
  categoryLabel: string
  badgeClassName: string
  imageClassName: string
  imageSrc?: string
  imageAlt?: string
  placeholder: string
  title: string
  description: string
  tags: string[]
}

type ProductLandingConfig = {
  heroTitle: string
  heroSubtitle: string
  whyChoose: string[]
  sectionEyebrow?: string
  sectionTitle?: string
  choiceCards: ProductLandingChoiceCard[]
  filters: ProductLandingFilter[]
  productCards: ProductLandingProductCard[]
  customizationTitle: string
  customizationIntro: string
  customizationFeatures: string[]
  contactTitle: string
  contactText: string
}

const productLandingConfigs: Record<(typeof productPages)[number]['slug'], ProductLandingConfig> = {
  'line-pipe': {
    heroTitle: 'GRE Line Pipe Solutions',
    heroSubtitle:
      'Composite line pipe for corrosive process, utility, water, and energy service where pressure class, resin system, jointing route, and fittings package all need clear definition.',
    whyChoose: [
      'GRE line pipe is used where corrosive media, saline water, or aggressive plant service make long-term corrosion resistance and lower maintenance exposure more important in the final material decision.',
      'Project discussions usually need pipe body, jointing system, fittings scope, and installation environment reviewed together so that pressure class, routing, and package supply are aligned before quotation.',
    ],
    sectionEyebrow: 'Selection Paths',
    sectionTitle: 'Typical service paths for GRE line pipe.',
    choiceCards: [
      {
        imageSrc: '/line-applications/oilfield.jpg',
        imageAlt: 'Oil field application scene',
        title: 'High Pressure Applications',
        description:
          'Oil and gas field lines or industrial services that need higher pressure routes, engineered connection methods, and stricter material-system review.',
        filterId: 'pressure',
      },
      {
        imageSrc: '/line-applications/water-treatment.jpg',
        imageAlt: 'Water treatment plant application scene',
        title: 'Water Treatment and Utility',
        description:
          'Process water, desalination, and utility transfer lines where efficient standard GRE routes and package completeness matter.',
        filterId: 'anhydride',
      },
      {
        imageSrc: '/line-applications/chemical-plant.jpg',
        imageAlt: 'Chemical processing plant application scene',
        title: 'Chemical Processing',
        description:
          'Corrosive media service where amine-cured or conductive product routes may be required by the operating environment.',
        filterId: 'amine',
      },
    ],
    filters: [
      { id: 'all', label: 'All Products' },
      { id: 'anhydride', label: 'Anhydride Cured' },
      { id: 'amine', label: 'Amine Cured' },
      { id: 'conductive', label: 'Conductive' },
      { id: 'pressure', label: 'By Pressure' },
    ],
    productCards: [
      {
        id: 'standard-gre',
        category: 'anhydride',
        categoryLabel: 'Anhydride Cured',
        badgeClassName: 'line-badge-info',
        imageClassName: 'line-product-image-info',
        placeholder: 'Product Image\nGRE Line Pipe',
        title: 'Standard GRE Line Pipe',
        description:
          'General purpose process and utility transport. Pressure, diameter, and temperature ranges to be filled from approved product tables.',
        tags: ['Process Water', 'Utility'],
      },
      {
        id: 'amine-cured',
        category: 'amine pressure',
        categoryLabel: 'Amine Cured',
        badgeClassName: 'line-badge-warning',
        imageClassName: 'line-product-image-warning',
        placeholder: 'Product Image\nHigh Temp GRE',
        title: 'Amine Cured Line Pipe',
        description:
          'For higher temperature service and more severe chemical environments where amine-cured resin systems are the preferred route.',
        tags: ['Chemical', 'High Temp'],
      },
      {
        id: 'conductive',
        category: 'conductive pressure',
        categoryLabel: 'Conductive',
        badgeClassName: 'line-badge-accent',
        imageClassName: 'line-product-image-accent',
        placeholder: 'Product Image\nAnti-Static GRE',
        title: 'Conductive Line Pipe',
        description:
          'Conductive and anti-static product route for specialized safety requirements or project specifications in hazardous areas.',
        tags: ['Anti-Static', 'Oil & Gas'],
      },
      {
        id: 'fittings',
        category: 'all',
        categoryLabel: 'Accessories',
        badgeClassName: 'line-badge-success',
        imageClassName: 'line-product-image-success',
        placeholder: 'Product Image\nFittings & Flanges',
        title: 'Fittings and Transitions',
        description:
          'Elbows, tees, reducers, flanges, couplings, and steel transitions for complete line pipe system packages.',
        tags: ['DSJ Thread', 'Flanged'],
      },
    ],
    customizationTitle: 'Fully Customizable to Your Project Requirements',
    customizationIntro:
      'Every aspect of our GRE line pipe can be customized to match your exact specifications, from resin systems and pressure classes to connection methods and delivery schedules.',
    customizationFeatures: [
      'Resin system selection',
      'Pressure class customization',
      'Connection method options',
      'Length and diameter specs',
      'Fittings package design',
      'Export packing requirements',
    ],
    contactTitle: 'Need help selecting the right product?',
    contactText:
      'Our engineering team can review your project requirements and recommend the optimal GRE line pipe route.',
  },
  'well-tubing-casing': {
    heroTitle: 'Composite Well Tubing and Casing',
    heroSubtitle:
      'Corrosion-resistant composite well tubing and casing for production environments where pressure class, collapse resistance, handling efficiency, and long-term reliability all matter.',
    whyChoose: [
      'Well tubing and casing projects are usually driven by corrosive service, pressure class, collapse resistance, installation practicality, and lifecycle reliability in aggressive field environments where metallic options can raise weight and corrosion concerns.',
      'Composite well products help project teams review series class, service fluid, dimensions, and connection planning together instead of treating the pipe body and well accessories as separate decisions.',
    ],
    sectionEyebrow: 'Selection Paths',
    sectionTitle: 'How to choose the right well product route.',
    choiceCards: [
      {
        imageSrc: '/line-applications/oilfield.jpg',
        imageAlt: 'Oil field production scene',
        title: 'Standard Production Strings',
        description:
          'Used where corrosive production duty needs a practical tubing series with moderate pressure class and field handling advantages.',
        filterId: '1500',
      },
      {
        imageSrc: '/product-media/line-pipe/site-acid-anhydride.jpg',
        imageAlt: 'Composite pipe route scene',
        title: 'Intermediate and Heavy-Duty Wells',
        description:
          'Useful where higher burst, tensile, and collapse requirements push the well string toward stronger HW series routes.',
        filterId: '2500',
      },
      {
        imageSrc: '/product-media/line-pipe/site-buried.jpg',
        imageAlt: 'Field installation route',
        title: 'Connections and Field Handling',
        description:
          'Projects that depend on field handling efficiency, lighter strings, and clearer connection planning should define accessories early.',
        filterId: '3000',
      },
    ],
    filters: [
      { id: 'all', label: 'All Products' },
      { id: '1500', label: 'HW-1500' },
      { id: '2000', label: 'HW-2000' },
      { id: '2500', label: 'HW-2500' },
      { id: '3000', label: 'HW-3000' },
    ],
    productCards: [
      {
        id: 'hw-1500',
        category: '1500',
        categoryLabel: 'HW-1500',
        badgeClassName: 'line-badge-info',
        imageClassName: 'line-product-image-info',
        placeholder: 'Product Image\nHW-1500',
        title: 'HW-1500 Well Tubing',
        description:
          'Acid-anhydride tubing series for 1 1/2 to 4 1/2 inch well service with burst pressure around 4000 to 4200 psig, suited to standard corrosive production duty.',
        tags: ['1 1/2-4 1/2 in.', '4200 psig'],
      },
      {
        id: 'hw-2000',
        category: '2000',
        categoryLabel: 'HW-2000',
        badgeClassName: 'line-badge-success',
        imageClassName: 'line-product-image-success',
        placeholder: 'Product Image\nHW-2000',
        title: 'HW-2000 Well Tubing',
        description:
          'Intermediate well tubing route for 1 1/2 to 4 1/2 inch service where higher tensile and collapse values are required beyond the basic production class.',
        tags: ['1 1/2-4 1/2 in.', '5000-5400 psig'],
      },
      {
        id: 'hw-2500',
        category: '2500',
        categoryLabel: 'HW-2500',
        badgeClassName: 'line-badge-warning',
        imageClassName: 'line-product-image-warning',
        placeholder: 'Product Image\nHW-2500',
        title: 'HW-2500 Well Tubing',
        description:
          'Heavy-duty tubing series for stronger burst and collapse envelopes, with 1 1/2 to 4 1/2 inch options and pressure classes around 6800 to 7500 psig.',
        tags: ['1 1/2-4 1/2 in.', '6800-7500 psig'],
      },
      {
        id: 'hw-3000',
        category: '3000',
        categoryLabel: 'HW-3000',
        badgeClassName: 'line-badge-accent',
        imageClassName: 'line-product-image-accent',
        placeholder: 'Product Image\nHW-3000',
        title: 'HW-3000 Well Tubing and Connections',
        description:
          'High-class tubing route for well service that needs the strongest burst and collapse performance in the current source table, together with connection and accessory review.',
        tags: ['1 1/2-2 7/8 in.', '8000-8500 psig'],
      },
    ],
    customizationTitle: 'Built Around Actual Well Service Conditions',
    customizationIntro:
      'Well tubing and casing discussions should follow the real field environment, including service fluid, pressure class, size range, collapse requirements, connection logic, and handling conditions.',
    customizationFeatures: [
      'HW series selection',
      'Burst and collapse review',
      'Tubing size selection',
      'Connection planning',
      'Corrosion-duty review',
      'Accessory clarification',
    ],
    contactTitle: 'Need a well tubing or casing review?',
    contactText:
      'Share the service environment, requested size range, target pressure class, connection needs, and project location so Hovoy can align the right HW series to the field duty.',
  },
  'marine-offshore-pipe': {
    heroTitle: 'Marine and Offshore Pipe Systems',
    heroSubtitle:
      'Composite marine piping for shipboard seawater systems, ballast and utility service, and offshore projects where corrosion resistance and weight reduction both matter.',
    whyChoose: [
      'Marine and offshore systems are usually selected around shipboard seawater duty, ballast or utility routing, module constraints, corrosion resistance, and lifecycle performance in saline environments.',
      'Composite marine pipe reduces weight, supports bonded joint systems for many marine routes, and can be discussed in conductive or non-conductive configurations depending on the service requirement.',
    ],
    sectionEyebrow: 'Selection Paths',
    sectionTitle: 'How to choose the right marine pipe route.',
    choiceCards: [
      {
        imageSrc: '/application-scenes/ship-engine-room.jpg',
        imageAlt: 'Shipboard piping scene',
        title: 'Shipboard Seawater Systems',
        description:
          'Used where onboard seawater cooling, ballast, utility, or service lines need corrosion-resistant composite pipe and practical routing support.',
        filterId: 'shipboard',
      },
      {
        imageSrc: '/application-scenes/desalination-plant.jpg',
        imageAlt: 'Coastal desalination plant scene',
        title: 'Ballast, Cooling, and Utility Duty',
        description:
          'Applied where saline exposure, cooling water, ballast service, or coastal utility duty shapes the material and connection decision.',
        filterId: 'seawater',
      },
      {
        imageSrc: '/application-scenes/offshore-platform.jpg',
        imageAlt: 'Offshore platform scene',
        title: 'Offshore Support Systems',
        description:
          'For offshore modules, platforms, and support installations where corrosion resistance, lighter weight, and fittings completeness all matter.',
        filterId: 'offshore',
      },
    ],
    filters: [
      { id: 'all', label: 'All Products' },
      { id: 'shipboard', label: 'Shipboard' },
      { id: 'seawater', label: 'Seawater Duty' },
      { id: 'conductive', label: 'Conductive' },
      { id: 'offshore', label: 'Offshore' },
    ],
    productCards: [
      {
        id: 'shipboard-pipe',
        category: 'shipboard seawater',
        categoryLabel: 'Shipboard',
        badgeClassName: 'line-badge-info',
        imageClassName: 'line-product-image-info',
        placeholder: 'Product Image\nShipboard Pipe',
        title: 'Shipboard Seawater Pipe',
        description:
          'Marine composite pipe for onboard seawater cooling, ballast, and utility systems where routing practicality and lower weight remain important.',
        tags: ['Seawater', 'Shipboard'],
      },
      {
        id: 'bonded-marine-pipe',
        category: 'seawater shipboard',
        categoryLabel: 'Bonded Joints',
        badgeClassName: 'line-badge-success',
        imageClassName: 'line-product-image-success',
        placeholder: 'Product Image\nBonded Marine Pipe',
        title: 'Bonded-Joint Marine Pipe',
        description:
          'Marine route built around adhesive-bonded joint systems used across many shipboard seawater, ballast, and utility applications.',
        tags: ['Bonded Joints', 'Marine'],
      },
      {
        id: 'conductive-marine-pipe',
        category: 'shipboard seawater conductive offshore',
        categoryLabel: 'Conductive',
        badgeClassName: 'line-badge-warning',
        imageClassName: 'line-product-image-warning',
        placeholder: 'Product Image\nConductive Marine Pipe',
        title: 'Conductive Marine Pipe',
        description:
          'Conductive marine configuration for projects where static-control or hazardous-area requirements are part of the specification.',
        tags: ['Conductive', 'Hazardous Areas'],
      },
      {
        id: 'offshore-pipe',
        category: 'offshore',
        categoryLabel: 'Offshore',
        badgeClassName: 'line-badge-accent',
        imageClassName: 'line-product-image-accent',
        placeholder: 'Product Image\nOffshore Pipe',
        title: 'Offshore Support Pipe',
        description:
          'Composite route for offshore installations that need corrosion resistance, package completeness, and practical delivery planning.',
        tags: ['Offshore', 'Corrosion'],
      },
      {
        id: 'marine-fittings',
        category: 'shipboard seawater offshore conductive',
        categoryLabel: 'Accessories',
        badgeClassName: 'line-badge-info',
        imageClassName: 'line-product-image-info',
        placeholder: 'Product Image\nMarine Fittings',
        title: 'Marine Fittings and Transitions',
        description:
          'Marine elbows, tees, flanges, and transition details used to complete shipboard and offshore piping packages.',
        tags: ['Fittings', 'Transitions'],
      },
    ],
    customizationTitle: 'Marine Packages Need More Than Straight Pipe',
    customizationIntro:
      'Marine projects are usually defined by shipboard routing, seawater duty, bonded joint preference, conductive requirements where specified, fittings count, and export delivery requirements.',
    customizationFeatures: [
      'Shipboard seawater review',
      'Ballast and utility routing',
      'Bonded joint discussion',
      'Conductive option review',
      'Seawater-duty review',
      'Offshore package discussion',
    ],
    contactTitle: 'Need marine or offshore pipe support?',
    contactText:
      'Send the service duty, shipboard or offshore context, conductive requirement if any, fittings scope, route constraints, and project destination so Hovoy can review the right marine product route.',
  },
  'flexible-composite-pipe': {
    heroTitle: 'Flexible Composite Pipe Routes',
    heroSubtitle:
      'Spoolable composite pipe for oil and gas transport, remote field deployment, and route conditions where reel-based installation can change the project logic.',
    whyChoose: [
      'Flexible composite pipe serves a different market from rigid GRE systems. The main discussion is usually about route length, deployment speed, reel handling, and whether field labor can be reduced.',
      'Project teams often compare flexible and rigid routes side by side, so the product page should make spoolable deployment, installation logic, and field constraints easy to scan.',
    ],
    sectionEyebrow: 'Selection Paths',
    sectionTitle: 'How to choose the right flexible pipe route.',
    choiceCards: [
      {
        imageSrc: '/line-applications/oilfield.jpg',
        imageAlt: 'Oil field deployment scene',
        title: 'Remote Field Deployment',
        description:
          'Used where remote oil and gas routes depend on faster installation and easier transport into the field.',
        filterId: 'field',
      },
      {
        imageSrc: '/product-media/line-pipe/site-buried.jpg',
        imageAlt: 'Field line route scene',
        title: 'Fast Installation Routes',
        description:
          'Projects that benefit from reel-based deployment and reduced joining activity should review flexible routes early.',
        filterId: 'spoolable',
      },
      {
        imageSrc: '/application-scenes/process-piping.jpg',
        imageAlt: 'Industrial piping comparison scene',
        title: 'Rigid vs Flexible Comparison',
        description:
          'Useful where teams need to compare spoolable deployment against rigid GRE or GRP alternatives on the same route.',
        filterId: 'comparison',
      },
    ],
    filters: [
      { id: 'all', label: 'All Products' },
      { id: 'spoolable', label: 'Spoolable' },
      { id: 'field', label: 'Field Service' },
      { id: 'comparison', label: 'Comparison' },
    ],
    productCards: [
      {
        id: 'rtp',
        category: 'spoolable field',
        categoryLabel: 'Spoolable',
        badgeClassName: 'line-badge-info',
        imageClassName: 'line-product-image-info',
        placeholder: 'Product Image\nRTP / TCP',
        title: 'Spoolable Composite Pipe',
        description:
          'Flexible pipe route for reel-based deployment, fast field installation, and reduced joining complexity.',
        tags: ['Spoolable', 'Fast Install'],
      },
      {
        id: 'field-transport',
        category: 'field',
        categoryLabel: 'Field Service',
        badgeClassName: 'line-badge-success',
        imageClassName: 'line-product-image-success',
        placeholder: 'Product Image\nField Transport',
        title: 'Field Transport Line',
        description:
          'Transport route for remote field duty where deployment speed and route access drive the product decision.',
        tags: ['Oil & Gas', 'Remote'],
      },
      {
        id: 'reel-deployment',
        category: 'spoolable',
        categoryLabel: 'Reel Deployment',
        badgeClassName: 'line-badge-warning',
        imageClassName: 'line-product-image-warning',
        placeholder: 'Product Image\nReel Deployment',
        title: 'Reel-Based Deployment Systems',
        description:
          'Flexible route discussed around reel handling, deployment logistics, and field schedule pressure.',
        tags: ['Reel', 'Deployment'],
      },
      {
        id: 'comparison-support',
        category: 'comparison',
        categoryLabel: 'Comparison',
        badgeClassName: 'line-badge-accent',
        imageClassName: 'line-product-image-accent',
        placeholder: 'Product Image\nRigid vs Flexible',
        title: 'Rigid vs Flexible Comparison Support',
        description:
          'Selection route for projects deciding between flexible pipe and rigid composite systems on the same line.',
        tags: ['Comparison', 'Route Logic'],
      },
    ],
    customizationTitle: 'Flexible Pipe Projects Start With Route Logic',
    customizationIntro:
      'Flexible pipe selection depends on route length, deployment method, pressure class, access conditions, and whether a rigid or spoolable route is commercially stronger.',
    customizationFeatures: [
      'Route-length review',
      'Spool and reel planning',
      'Field deployment discussion',
      'Pressure-class alignment',
      'Rigid vs flexible comparison',
      'Export and logistics support',
    ],
    contactTitle: 'Need to compare flexible and rigid routes?',
    contactText:
      'Share the fluid, route length, pressure class, and field deployment conditions so Hovoy can help decide whether a flexible system fits the project.',
  },
  'fittings-and-joints': {
    heroTitle: 'Composite Fittings and Joint Systems',
    heroSubtitle:
      'Elbows, tees, reducers, flanges, transitions, and jointing logic that turn straight pipe supply into a complete project package.',
    whyChoose: [
      'Many RFQs fail at the fittings stage, not the straight-pipe stage. The connection method, fittings ratio, and tie-in details often shape commercial scope as much as the pipe itself.',
      'A dedicated fittings and joints page should help clients scan the standard items, transition points, and package-completion logic without burying those details under generic pipe copy.',
    ],
    sectionEyebrow: 'Selection Paths',
    sectionTitle: 'How to choose the right fittings route.',
    choiceCards: [
      {
        imageSrc: '/application-scenes/process-piping.jpg',
        imageAlt: 'Industrial process piping scene',
        title: 'Standard Fittings Families',
        description:
          'Used where elbows, tees, reducers, and branch fittings define the real package scope inside plant pipework.',
        filterId: 'standard',
      },
      {
        imageSrc: '/product-media/line-pipe/flange-assembly.jpg',
        imageAlt: 'Composite flange assembly detail',
        title: 'Jointing and Connection Routes',
        description:
          'Projects that depend on flanged, coupling, bonded, or connection-sensitive items should review jointing routes before the RFQ is finalized.',
        filterId: 'joints',
      },
      {
        imageSrc: '/line-applications/water-treatment.jpg',
        imageAlt: 'Water treatment plant scene',
        title: 'Transitions and Package Completion',
        description:
          'Useful where the RFQ needs transitions, tie-ins, and complete fittings scope rather than a partial material count.',
        filterId: 'package',
      },
    ],
    filters: [
      { id: 'all', label: 'All Products' },
      { id: 'standard', label: 'Fittings' },
      { id: 'joints', label: 'Joints' },
      { id: 'flanges', label: 'Flanges' },
      { id: 'transitions', label: 'Transitions' },
      { id: 'package', label: 'Package Scope' },
    ],
    productCards: [
      {
        id: 'elbows-tees-reducers',
        category: 'standard package',
        categoryLabel: 'Fittings',
        badgeClassName: 'line-badge-info',
        imageClassName: 'line-product-image-info',
        imageSrc: '/product-media/line-pipe/fittings-display.jpg',
        imageAlt: 'Composite fittings display',
        placeholder: 'Product Image\nElbows & Tees',
        title: 'Elbows, Tees, and Reducers',
        description:
          'Standard composite fittings used to build process, utility, marine, and field routing packages beyond straight pipe only.',
        tags: ['Elbows', 'Tees', 'Reducers'],
      },
      {
        id: 'flanges',
        category: 'flanges standard joints',
        categoryLabel: 'Flanges',
        badgeClassName: 'line-badge-success',
        imageClassName: 'line-product-image-success',
        imageSrc: '/product-media/line-pipe/flange-detail.jpg',
        imageAlt: 'Composite flange detail',
        placeholder: 'Product Image\nFlanges',
        title: 'Flanges and Stub Ends',
        description:
          'Flanged ends, stub-end routes, and connection details for valve stations, equipment interfaces, and maintenance access.',
        tags: ['Flanges', 'Stub Ends'],
      },
      {
        id: 'couplings-joints',
        category: 'joints package',
        categoryLabel: 'Joints',
        badgeClassName: 'line-badge-warning',
        imageClassName: 'line-product-image-warning',
        imageSrc: '/product-media/line-pipe/flange-assembly.jpg',
        imageAlt: 'Composite joint assembly',
        placeholder: 'Product Image\nJoint Assembly',
        title: 'Couplings and Joint Components',
        description:
          'Joint-related components used where assembly route, maintenance access, or installation method make the connection logic part of the core product scope.',
        tags: ['Couplings', 'Jointing'],
      },
      {
        id: 'transitions',
        category: 'transitions package',
        categoryLabel: 'Transitions',
        badgeClassName: 'line-badge-accent',
        imageClassName: 'line-product-image-accent',
        placeholder: 'Product Image\nTransitions',
        title: 'Steel Transitions and Tie-Ins',
        description:
          'Transition components for mixed-material systems, equipment nozzles, and real plant tie-in conditions.',
        tags: ['Steel Tie-In', 'Mixed Material'],
      },
      {
        id: 'spools',
        category: 'package joints transitions',
        categoryLabel: 'Package',
        badgeClassName: 'line-badge-info',
        imageClassName: 'line-product-image-info',
        placeholder: 'Product Image\nSpools',
        title: 'Shop Spools and Package Completion',
        description:
          'Fabricated spool discussions and package-completion items that keep RFQs from stopping at straight pipe only.',
        tags: ['Spools', 'Package'],
      },
    ],
    customizationTitle: 'Fittings Scope Should Be Defined Early',
    customizationIntro:
      'Projects become easier to quote when the fittings list, tie-in points, jointing route, and transition details are clarified before the commercial package is built.',
    customizationFeatures: [
      'Fittings list review',
      'Elbow and tee classification',
      'Flange and stub-end planning',
      'Transition clarification',
      'Jointing route discussion',
      'Tie-in planning',
      'Shop spool scope',
      'Packing and quantity alignment',
    ],
    contactTitle: 'Need help completing the fittings scope?',
    contactText:
      'Send the base pipe system, fittings list, tie-in points, and preferred connection route so Hovoy can review the complete package requirement.',
  },
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
  const currentYear = new Date().getFullYear()

  return (
    <div className="site-shell">
      <header
        className={isScrolled || openMenu ? 'topbar topbar-scrolled' : 'topbar'}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="topbar-inner">
          <Link className="brand-lockup" to="/">
            <div className="brand-badge">HO</div>
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

      <footer className="footer footer-expanded">
        <div className="footer-grid">
          <section className="footer-brand-panel">
            <div className="footer-brand-lockup">
              <div className="brand-badge footer-brand-badge">HO</div>
              <div>
                <p className="brand-name">Hovoy GRE Pipe</p>
                <p className="brand-tag">Composite piping systems for project supply</p>
              </div>
            </div>
            <p className="footer-note">
              Hovoy GRE Pipe supplies GRE, GRP, and FRP pipe systems for well tubing and
              casing, line pipe, marine piping, flexible pipe, fittings, and project-driven
              industrial applications.
            </p>
            <div className="footer-email-stack">
              <a href={`mailto:${primaryInquiryEmail}`}>{primaryInquiryEmail}</a>
              <a href={`mailto:${secondaryInquiryEmail}`}>{secondaryInquiryEmail}</a>
            </div>
            <div className="footer-brand-actions">
              <Link className="button button-primary footer-action" to="/contact">
                Request RFQ
              </Link>
              <Link className="button button-secondary footer-action" to="/resources/downloads">
                Downloads
              </Link>
            </div>
          </section>

          {footerColumns.map((column) => (
            <nav className="footer-column" key={column.title} aria-label={column.title}>
              <p className="footer-heading">{column.title}</p>
              <div className="footer-link-list">
                {column.links.map((item) => (
                  <Link className="footer-link" key={item.to} to={item.to}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          ))}
        </div>

        <div className="footer-base">
          <p className="footer-base-copy">© {currentYear} Hovoy GRE Pipe. All rights reserved.</p>
          <div className="footer-base-links">
            <Link className="footer-link footer-link-compact" to="/contact">
              Contact
            </Link>
            <Link className="footer-link footer-link-compact" to="/resources/downloads">
              Downloads
            </Link>
            <a className="footer-link footer-link-compact" href="/sitemap.xml">
              Sitemap
            </a>
          </div>
        </div>
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
      title: 'Product Lines',
      text: 'Review well, line, marine, flexible pipe, and fittings systems before narrowing the technical route.',
      to: '/products',
    },
    {
      title: 'Application Sectors',
      text: 'Start from oil and gas, marine, desalination, and chemical processing when the operating environment is already clear.',
      to: '/applications',
    },
    {
      title: 'Quality and Documentation',
      text: 'Open manufacturing, inspection, and document support when the project is already in supplier review.',
      to: '/resources/downloads',
    },
    {
      title: 'Request RFQ',
      text: 'Move directly to contact when the application, dimensions, pressure class, and scope are already defined.',
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
      title: 'Company Profile',
      text: 'Review how Hovoy positions composite pipe supply for industrial, marine, and energy projects.',
      to: '/about',
      label: 'Company',
    },
    {
      title: 'Manufacturing and Quality',
      text: 'See production planning, inspection support, shipment readiness, and export-oriented quality discussion.',
      to: '/about/manufacturing-quality',
      label: 'Quality',
    },
    {
      title: 'Downloads and RFQ Support',
      text: 'Open document entry points for product briefs, RFQ preparation, and quality-related material.',
      to: '/resources/downloads',
      label: 'Documents',
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
    email: primaryInquiryEmail,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: primaryInquiryEmail,
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: secondaryInquiryEmail,
      },
    ],
    description:
      'Hovoy GRE Pipe supplies GRE, GRP, and FRP pipe systems for well tubing and casing, line pipe, marine pipe, flexible pipe, and engineered project support.',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <section className="hero home-hero" id="top">
        <div className="hero-copy home-hero-copy">
          <p className="eyebrow">Industrial Composite Pipe Systems</p>
          <h1>Composite pipe systems for oil, water, marine, and process projects.</h1>
          <p className="hero-text">
            Hovoy supplies GRE, GRP, and FRP pipe systems for well tubing and casing, line pipe,
            marine and offshore service, flexible composite pipe, and fittings packages for
            corrosive industrial, utility, and energy projects.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/contact">
              Request RFQ
            </Link>
            <Link className="button button-secondary" to="/products">
              View Product Lines
            </Link>
            <Link className="button button-secondary" to="/applications">
              View Applications
            </Link>
          </div>
          <dl className="hero-stats home-hero-stats">
            <div>
              <dt>Industry Profile</dt>
              <dd>20+ years in composite pipe supply</dd>
            </div>
            <div>
              <dt>Product Coverage</dt>
              <dd>Well, line, marine, flexible pipe, and fittings systems</dd>
            </div>
            <div>
              <dt>Project Sectors</dt>
              <dd>Oil and gas, marine, desalination, and chemical-service supply</dd>
            </div>
          </dl>

          <div className="hero-proof-grid home-hero-proof-grid" aria-label="Primary proof paths">
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
          <figure className="hero-photo-card home-hero-photo-card">
            <img
              className="hero-photo"
              src={heroRefinery}
              alt="Aerial view of a refinery and industrial processing plant"
            />
            <div className="hero-photo-shade" />
            <div className="hero-photo-panel">
              <span>Industrial Supply Context</span>
              <strong>Support composite pipe projects with clearer product paths, application fit, and package scope.</strong>
              <small>Industrial buyers expect product definition, application logic, document support, and direct RFQ access without losing the engineering context.</small>
            </div>
          </figure>
        </div>
      </section>

      <section className="trust-strip home-trust-strip" aria-label="Industrial positioning">
        <p>Well service systems</p>
        <p>Utility and process lines</p>
        <p>Shipboard and offshore pipe</p>
        <p>Flexible field deployment</p>
        <p>Quality and RFQ support</p>
      </section>

      <section className="section section-grid home-section">
        <div className="section-heading">
          <p className="eyebrow">Project Entry Routes</p>
          <h2>Start from the route that matches the project stage.</h2>
          <p>
            A stronger industrial homepage should make product, application, quality, and RFQ
            routes visible without forcing every visitor through the same path.
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

      <section className="section section-grid home-section">
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

      <section className="section section-grid home-section">
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

      <section className="section capability-band home-capability-band">
        <div className="capability-copy">
          <p className="eyebrow">Company Profile</p>
          <h2>Show project teams why Hovoy is easier to review than a generic pipe supplier.</h2>
          <p>
            Strong industrial sites combine technical familiarity, manufacturing discussion,
            export coordination, and package-completeness thinking in one clear company profile.
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

      <section className="section section-grid home-section">
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

      <section className="section section-grid home-section">
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
          <p>Inquiry Email</p>
          <div className="email-stack">
            <a href={`mailto:${primaryInquiryEmail}`}>{primaryInquiryEmail}</a>
            <a href={`mailto:${secondaryInquiryEmail}`}>{secondaryInquiryEmail}</a>
          </div>
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
  const isTraditionalProductLine = page?.slug === 'line-pipe'

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
        'Process, utility, and produced-water routes where corrosion resistance and long service life matter together',
        'Industrial packages that need straight pipe, fittings, transitions, and tie-in planning in one quotation path',
        'Projects with mixed above-ground and buried routing where installation logic affects the final scope',
      ],
      whyHovoy: [
        {
          title: 'Pipe, fittings, and transitions reviewed together',
          text: 'Many line pipe jobs fail at quotation stage when fittings scope, tie-ins, and fabricated items are separated from the straight-pipe discussion. Hovoy is positioned around the full route, not only the pipe count.',
        },
        {
          title: 'Industrial project communication built around the actual route',
          text: 'Line pipe RFQs usually move faster when route conditions, support assumptions, equipment interfaces, and delivery constraints are clarified before the commercial offer is issued.',
        },
        {
          title: 'Useful across utility, desalination, and corrosive process work',
          text: 'This product family is relevant where project teams need a supplier that can discuss service media, connection logic, and export-oriented package support with more depth than a simple catalogue listing.',
        },
      ],
      packageScope: [
        'Straight pipe together with elbows, tees, flanges, reducers, and transition items',
        'Support around line lists, route sketches, pressure classes, and equipment tie-ins',
        'Packing, delivery, and documentation coordination for industrial export projects',
      ],
      nextActionTitle: 'Request a line pipe quotation with route and fittings scope.',
      nextActionText:
        'Share the service media, diameter range, pressure class, route length or line list, fittings estimate, and destination market so the quotation can be built around the real operating scope.',
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

  const landingConfig = productLandingConfigs[page.slug]

  if (landingConfig) {
    return (
      <ProductLandingPage
        breadcrumbSchema={breadcrumbSchema}
        config={landingConfig}
        page={page}
        productSchema={productSchema}
      />
    )
  }

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
            <h1>{page.heroTitle ?? page.title}</h1>
            <p>{page.summary}</p>
            <p className="product-overview-intro">{page.intro}</p>
            {page.heroHighlights?.length ? (
              <div className="mini-pill-grid product-hero-highlights">
                {page.heroHighlights.map((item) => (
                  <span className="pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
            <div className="hero-actions">
              <Link className="button button-primary" to="/contact">
                Request RFQ
              </Link>
              <Link className="button button-secondary" to="/resources/downloads">
                Review Downloads
              </Link>
            </div>
          </div>

          <aside className="product-overview-rail">
            {page.heroImage ? (
              <figure className="rail-card product-hero-visual">
                <img src={page.heroImage.src} alt={page.heroImage.alt} />
                <figcaption>
                  <strong>{page.heroImage.title}</strong>
                  {page.heroImage.text ? <span>{page.heroImage.text}</span> : null}
                </figcaption>
              </figure>
            ) : page.heroPlaceholder ? (
              <article className="rail-card placeholder-card">
                <p className="eyebrow">Hero Visual</p>
                <strong>{page.heroPlaceholder.title}</strong>
                <span>{page.heroPlaceholder.text}</span>
              </article>
            ) : null}
            <article className="rail-card">
              <p className="eyebrow">{page.technicalSnapshot?.length ? 'Quick Specs' : 'Engineering Focus'}</p>
              {page.technicalSnapshot?.length ? (
                <dl className="snapshot-list">
                  {page.technicalSnapshot.map((item) => (
                    <div key={item.label}>
                      <dt>{item.label}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <ul className="detail-list">
                  {page.engineeringFocus.slice(0, 4).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
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
              <div className="email-stack email-stack-compact">
                <a href={`mailto:${primaryInquiryEmail}`}>{primaryInquiryEmail}</a>
                <a href={`mailto:${secondaryInquiryEmail}`}>{secondaryInquiryEmail}</a>
              </div>
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

      {page.productRange?.length ? (
        <section className="section section-grid page-section">
          <div className="section-heading">
            <p className="eyebrow">Product Range</p>
            <h2>Technical range and specification boundaries</h2>
          </div>
          <dl className={`spec-table ${isTraditionalProductLine ? 'spec-table-heavy' : ''}`}>
            {page.productRange.map((item) => (
              <div className="spec-row" key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {page.productSeries?.length ? (
        <section className="section section-grid page-section">
          <div className="section-heading">
            <p className="eyebrow">Product Series</p>
            <h2>Traditional product routes within this line pipe family.</h2>
          </div>
          <div className="detail-card-grid">
            {page.productSeries.map((item) => (
              <article className="detail-panel" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {page.standards?.length ? (
        <section className="section section-grid page-section">
          <div className="section-heading">
            <p className="eyebrow">Standards</p>
            <h2>Standards and technical basis used to define the product line.</h2>
          </div>
          <div className="pill-grid">
            {page.standards.map((item) => (
              <span className="pill" key={item}>
                {item}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section section-grid page-section">
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">Product Description</p>
            <h2>
              {isTraditionalProductLine
                ? 'Basic description and technical basis of the product line.'
                : 'Performance capabilities and primary operating scenarios'}
            </h2>
          </div>
          <p>{page.intro}</p>
        </div>

        <div className="detail-grid">
          <article className="detail-panel">
            <h3>{isTraditionalProductLine ? 'Core engineering parameters' : 'Core engineering parameters'}</h3>
            <ul className="detail-list">
              {page.engineeringFocus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="detail-panel">
            <h3>{isTraditionalProductLine ? 'Key evaluation criteria' : 'Key evaluation criteria'}</h3>
            <ul className="detail-list">
              {page.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {page.technicalConfiguration?.length ? (
        <section className="section section-grid page-section">
          <div className="section-heading">
            <p className="eyebrow">Product Characteristics</p>
            <h2>
              {isTraditionalProductLine
                ? 'Product characteristics that should be explained on a traditional line pipe page.'
                : 'Primary pathways for verifying technical and commercial viability'}
            </h2>
          </div>
          <div className="detail-card-grid">
            {(page.productCharacteristics?.length ? page.productCharacteristics.map((item) => ({ title: item, text: '' })) : page.technicalConfiguration).map((item) => (
              <article className="detail-panel" key={item.title}>
                <h3>{item.title}</h3>
                {'text' in item && item.text ? <p>{item.text}</p> : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section section-grid page-section">
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">Application Fit</p>
            <h2>
              {isTraditionalProductLine
                ? 'Applications and service media commonly matched to this product line.'
                : 'Critical operating environments and matched service media'}
            </h2>
          </div>
          <p>
            {isTraditionalProductLine
              ? 'Traditional product-line pages should make it easy to scan the main operating environments before the client asks for a quotation.'
              : 'Aligning composite specifications with exact field conditions—including media composition, pressure surges, and external loads—ensures long-term structural integrity.'}
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

      {page.jointingMethods?.length ? (
        <section className="section section-grid page-section">
          <div className="section-heading">
            <p className="eyebrow">Jointing And Fittings</p>
            <h2>
              {isTraditionalProductLine
                ? 'Connection systems that should be treated as part of the product line.'
                : 'Integrated connection design and fitting packages'}
            </h2>
          </div>
          <div className="detail-grid">
            <div className="detail-card-grid">
              {page.jointingMethods.map((item) => (
                <article className="detail-panel" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
            {page.jointingPlaceholder ? (
              <article className="detail-panel placeholder-card placeholder-card-large">
                <p className="eyebrow">Connection Diagram</p>
                <strong>{page.jointingPlaceholder.title}</strong>
                <span>{page.jointingPlaceholder.text}</span>
              </article>
            ) : null}
          </div>
        </section>
      ) : null}

      {page.fittingsAccessories?.length ? (
        <section className="section section-grid page-section">
          <div className="section-heading">
            <p className="eyebrow">Fittings And Accessories</p>
            <h2>Standard fittings and package items linked to this product line.</h2>
          </div>
          <div className="pill-grid">
            {page.fittingsAccessories.map((item) => (
              <span className="pill" key={item}>
                {item}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Supply Scope</p>
          <h2>
            {isTraditionalProductLine
              ? 'What can be supplied under this product line.'
              : 'Comprehensive project scope capabilities'}
          </h2>
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
          <p className="eyebrow">Project Inputs</p>
          <h2>
            {isTraditionalProductLine
              ? 'Project variables that should be confirmed before quotation.'
              : 'Essential technical variables for accurate system design'}
          </h2>
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

      {page.availableDocumentation?.length ? (
        <section className="section section-grid page-section">
          <div className="section-heading">
            <p className="eyebrow">Available Documentation</p>
            <h2>
              {isTraditionalProductLine
                ? 'Documents traditionally expected on a line pipe product page.'
                : 'Standard engineering deliverables and technical documentation'}
            </h2>
          </div>
          <div className="detail-card-grid">
            {page.availableDocumentation.map((item) => (
              <article className="detail-panel" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {page.documentationItems?.length || page.downloadsPlaceholder ? (
        <section className="section section-grid page-section">
          <div className="section-heading section-heading-split">
            <div>
              <p className="eyebrow">Downloads</p>
              <h2>Reserved structure for datasheets, range tables, and jointing documents.</h2>
            </div>
            <p>
              Keep this section traditional: product datasheet, range table, connection details,
              fittings list, and RFQ support documents.
            </p>
          </div>
          <div className="detail-grid">
            <article className="detail-panel">
              <h3>Planned document set</h3>
              <ul className="detail-list">
                {page.documentationItems?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            {page.downloadsPlaceholder ? (
              <article className="detail-panel placeholder-card placeholder-card-large">
                <p className="eyebrow">Download Module</p>
                <strong>{page.downloadsPlaceholder.title}</strong>
                <span>{page.downloadsPlaceholder.text}</span>
              </article>
            ) : null}
          </div>
        </section>
      ) : null}

      {page.manufacturingCapabilities?.length ? (
        <section className="section section-grid page-section">
          <div className="section-heading">
            <p className="eyebrow">Manufacturing And Quality</p>
            <h2>Factory and test capability that should sit behind the product line.</h2>
          </div>
          <div className="detail-grid">
            <article className="detail-panel">
              <h3>Capability focus</h3>
              <ul className="detail-list">
                {page.manufacturingCapabilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="detail-panel placeholder-card placeholder-card-large">
              <p className="eyebrow">Factory Proof Placeholder</p>
              <strong>Testing and production image block</strong>
              <span>Reserve this module for Tg testing, hydrostatic pressure testing, thread tooling, shipment, and workshop photos.</span>
            </article>
          </div>
        </section>
      ) : null}

      {productModule && !isTraditionalProductLine ? (
        <section className="section section-grid page-section">
          <div className="section-heading section-heading-split">
            <div>
              <p className="eyebrow">Project Conditions</p>
              <h2>
                {isTraditionalProductLine
                  ? 'Project conditions that commonly trigger this product route.'
                  : 'Operational scenarios driving material selection'}
              </h2>
            </div>
            <p>
              {isTraditionalProductLine
                ? 'Keep this section practical: route conditions, installation logic, fittings ratio, and export delivery scope.'
                : 'Understanding the complete pipeline routing, support spacing constraints, and tie-in complexity dictates the transition from raw pipe supply to integrated system engineering.'}
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
            <p className="eyebrow">RFQ Inputs</p>
            <h2>
              {isTraditionalProductLine
                ? 'Technical inputs traditionally needed before issuing a quotation.'
                : 'Core prerequisites for preliminary design and costing'}
            </h2>
          </div>
          <p>
            {isTraditionalProductLine
              ? 'Traditional product-line pages should make the RFQ path obvious: media, pressure class, temperature, diameter range, route length, fittings scope, and destination market.'
              : 'To accelerate bid cycles, please specify process media, design pressure/temperature, isometric data, transition joints, and logistical requirements.'}
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

      {productModule && !isTraditionalProductLine ? (
        <section className="section section-grid page-section">
          <div className="section-heading">
            <p className="eyebrow">The Hovoy Advantage</p>
            <h2>
              {isTraditionalProductLine
                ? 'Commercial reasons to keep the line pipe discussion with Hovoy.'
                : 'Value engineering and executional certainty'}
            </h2>
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
          <p className="eyebrow">Related Contexts</p>
          <h2>
            {isTraditionalProductLine
              ? 'Application pages that should sit below the product line.'
              : 'Intersecting operational sectors and relevant applications'}
          </h2>
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

function ProductLandingPage({
  page,
  productSchema,
  breadcrumbSchema,
  config,
}: {
  page: (typeof productPages)[number]
  productSchema: Record<string, unknown>
  breadcrumbSchema: Record<string, unknown>
  config: ProductLandingConfig
}) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredProducts =
    activeFilter === 'all'
      ? config.productCards
      : config.productCards.filter((item) => item.category.includes(activeFilter))

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId)
    const grid = document.getElementById('line-pipe-product-grid')
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

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

        <section className="line-landing-hero">
          <div className="line-landing-hero-copy">
            <p className="eyebrow">{page.heroEyebrow}</p>
            <h1>{config.heroTitle}</h1>
            <p className="line-landing-subtitle">{config.heroSubtitle}</p>
            <div className="line-landing-actions">
              <Link className="line-btn line-btn-primary" to="/contact">
                Get Custom Quote
              </Link>
              <Link className="line-btn line-btn-secondary" to="/resources/downloads">
                Download Catalog
              </Link>
            </div>
          </div>
        </section>
      </section>

      <section className="section section-grid page-section">
        <section className="line-landing-why">
          <h2>Product Overview</h2>
          {config.whyChoose.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">{config.sectionEyebrow ?? 'Selection Paths'}</p>
          <h2>{config.sectionTitle ?? 'How to choose the right pipe for your project.'}</h2>
        </div>
        <div className="line-choice-grid">
          {config.choiceCards.map((item) => (
            <article className="line-choice-card" key={item.title}>
              <div className="line-choice-media">
                <img alt={item.imageAlt} className="line-choice-image" src={item.imageSrc} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button
                className="line-small-button"
                onClick={() => handleFilterChange(item.filterId)}
                type="button"
              >
                View Options
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-grid page-section" id="line-pipe-product-grid">
        <div className="section-heading">
          <p className="eyebrow">Our Product Range</p>
          <h2>Available product families and package items.</h2>
        </div>
        <div className="line-filter-bar">
          {config.filters.map((item) => (
            <button
              key={item.id}
              className={`line-filter-button ${activeFilter === item.id ? 'is-active' : ''}`}
              onClick={() => handleFilterChange(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="line-product-grid">
          {filteredProducts.map((item) => (
            <article className="line-product-card" key={item.id}>
              <div className={`line-product-image ${item.imageClassName}`}>
                <span className={`line-category-badge ${item.badgeClassName}`}>
                  {item.categoryLabel}
                </span>
                {item.imageSrc ? (
                  <img
                    alt={item.imageAlt ?? item.title}
                    className="line-product-photo"
                    src={item.imageSrc}
                  />
                ) : (
                  <div className="line-product-placeholder">
                    {item.placeholder.split('\n').map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="line-product-info">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="line-product-tags">
                  {item.tags.map((tag) => (
                    <span className="line-product-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-grid page-section">
        <section className="line-customization">
          <h2>{config.customizationTitle}</h2>
          <p className="line-customization-intro">{config.customizationIntro}</p>
          <div className="line-feature-grid">
            {config.customizationFeatures.map((item) => (
              <div className="line-feature-item" key={item}>
                <span className="line-feature-check">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <Link className="line-btn line-btn-light" to="/contact">
            Discuss Custom Requirements
          </Link>
        </section>
      </section>

      <section className="section section-grid page-section">
        <section className="line-contact-cta">
          <h3>{config.contactTitle}</h3>
          <p>{config.contactText}</p>
          <div className="line-contact-actions">
            <Link className="line-btn line-btn-solid" to="/contact">
              Contact Engineering
            </Link>
            <Link className="line-btn line-btn-outline" to="/resources/downloads">
              Download Selection Guide
            </Link>
          </div>
        </section>
      </section>
    </>
  )
}

function ApplicationsPage() {
  const applicationAdvantages = [
    {
      title: 'Corrosion Resistance',
      text: 'Composite pipe is often reviewed where seawater, saline service, produced water, or corrosive process media create long-term maintenance pressure on metallic systems.',
    },
    {
      title: 'Lower Structural Weight',
      text: 'Reduced structural weight can simplify handling, offshore lifting, route installation, and package planning compared with heavier metallic systems.',
    },
    {
      title: 'Service Life And Maintenance',
      text: 'The material route is commonly considered where lifecycle performance, corrosion control, and reduced replacement exposure matter together.',
    },
  ]

  const applicationRoutes = [
    {
      badge: 'Oil & Gas',
      imageSrc: '/line-applications/oilfield.jpg',
      imageAlt: 'Oil and gas field application scene',
      title: 'Oil and Gas',
      text: 'Used for well service, field transfer, produced water handling, and corrosive onshore systems where pipe body, jointing route, and fittings all need to be reviewed together.',
      applications: [
        'Produced water transfer lines',
        'Field gathering and utility networks',
        'Well tubing and casing support routes',
        'Corrosion-sensitive process water service',
        'Remote or modular package supply',
      ],
      to: '/applications/oil-and-gas',
      linkLabel: 'Explore Oil and Gas',
    },
    {
      badge: 'Marine',
      imageSrc: '/application-scenes/ship-engine-room.jpg',
      imageAlt: 'Marine shipboard piping scene',
      title: 'Marine and Offshore',
      text: 'Reviewed for shipboard seawater duty, ballast and cooling lines, bonded joint systems, and offshore utility routes where corrosion resistance and lower installation weight are both relevant.',
      applications: [
        'Shipboard seawater cooling lines',
        'Ballast and utility pipework',
        'Marine fire main support routes',
        'Offshore module utility systems',
        'Conductive marine pipe discussions',
      ],
      to: '/applications/marine-and-offshore',
      linkLabel: 'Explore Marine and Offshore',
    },
    {
      badge: 'Water',
      imageSrc: '/line-applications/water-treatment.jpg',
      imageAlt: 'Water treatment plant application scene',
      title: 'Water Treatment and Desalination',
      text: 'Suited to treatment blocks, desalination support, brine and saline utility routes, and plant systems where corrosion control and package completeness both affect the final specification.',
      applications: [
        'Reverse osmosis plant pipework',
        'Brine and saline utility lines',
        'Process water distribution',
        'Seawater intake-related systems',
        'Treatment equipment tie-in networks',
      ],
      to: '/applications/water-treatment-desalination',
      linkLabel: 'Explore Water Treatment',
    },
    {
      badge: 'Chemical',
      imageSrc: '/line-applications/chemical-plant.jpg',
      imageAlt: 'Chemical processing plant application scene',
      title: 'Chemical Processing',
      text: 'Chosen for corrosive plant service, chemical transfer, and maintenance-sensitive utility routes where resin system, pressure class, and service media all shape material selection.',
      applications: [
        'Corrosive process transfer lines',
        'Chemical plant utility systems',
        'Acid and caustic support service',
        'Process cooling and circulation routes',
        'Waste and by-product handling',
      ],
      to: '/applications/chemical-processing',
      linkLabel: 'Explore Chemical Processing',
    },
  ]

  const materialComparison = [
    {
      criterion: 'Corrosion performance',
      gre: 'Strong fit in seawater, saline, and many corrosive industrial services',
      steel: 'Usually depends on coating, lining, or corrosion allowance strategy',
      hdpe: 'Useful in many utility duties, but not chosen for every industrial envelope',
    },
    {
      criterion: 'Weight and handling',
      gre: 'Lower structural weight than steel, useful for offshore and routed installs',
      steel: 'Highest structural weight during handling and support planning',
      hdpe: 'Very light for utility-focused handling and transport',
    },
    {
      criterion: 'Pressure and temperature route',
      gre: 'Can be aligned to industrial pressure class and service-temperature targets',
      steel: 'Broad mechanical envelope when corrosion protection is acceptable',
      hdpe: 'Often selected for lower pressure and lower temperature utility service',
    },
    {
      criterion: 'Jointing and package scope',
      gre: 'Bonded, threaded, flanged, laminated, and fittings package routes',
      steel: 'Welded, flanged, and mechanical joining routes',
      hdpe: 'Fusion and mechanical joining routes',
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
      description="Review major service environments, compare typical material routes, and move into the application page that matches your operating conditions."
    >
      <section className="section section-grid page-section">
        <div className="applications-hero-actions">
          <Link className="line-btn line-btn-solid" to="/contact">
            Request Project Review
          </Link>
          <Link className="line-btn line-btn-outline" to="/products">
            Browse Product Families
          </Link>
        </div>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Why Composite Pipe</p>
          <h2>Why these systems are commonly reviewed in corrosive service.</h2>
        </div>
        <div className="applications-advantage-grid">
          {applicationAdvantages.map((item) => (
            <article className="applications-advantage-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Industries We Serve</p>
          <h2>Choose the application environment that matches the service conditions.</h2>
        </div>
        <div className="applications-industry-stack">
          {applicationRoutes.map((item) => (
            <article className="applications-industry-card" key={item.to}>
              <div className="applications-industry-media">
                <img alt={item.imageAlt} src={item.imageSrc} />
                <span className="applications-industry-badge">{item.badge}</span>
              </div>
              <div className="applications-industry-copy">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <ul className="applications-use-list">
                  {item.applications.map((application) => (
                    <li key={application}>{application}</li>
                  ))}
                </ul>
                <Link className="text-link" to={item.to}>
                  {item.linkLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Material Comparison</p>
          <h2>Indicative material comparison by common project concerns.</h2>
          <p>
            This comparison is intended as a general selection view. Final material choice
            should still follow service media, pressure class, temperature, route conditions,
            and project specification.
          </p>
        </div>
        <div className="applications-comparison-wrap">
          <table className="applications-comparison-table">
            <thead>
              <tr>
                <th>Selection Point</th>
                <th>GRE / GRP / FRP</th>
                <th>Carbon Steel</th>
                <th>HDPE</th>
              </tr>
            </thead>
            <tbody>
              {materialComparison.map((row) => (
                <tr key={row.criterion}>
                  <th>{row.criterion}</th>
                  <td>{row.gre}</td>
                  <td>{row.steel}</td>
                  <td>{row.hdpe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <CtaSection
        title="Need help matching the application to the product family?"
        text="Send the service media, pressure class, temperature, route conditions, and fittings scope so we can review the most suitable product line for the project."
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
            <p className="eyebrow">Sector Demands</p>
            <h2>Operational challenges and specialized material requirements</h2>
          </div>
          <p>{page.intro}</p>
        </div>

        <div className="detail-grid">
          <article className="detail-panel">
            <h3>Primary performance drivers</h3>
            <ul className="detail-list">
              {page.concerns.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="detail-panel">
            <h3>Composite engineering rationale</h3>
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
          <p className="eyebrow">Integrated Systems</p>
          <h2>Engineered product families for this operating environment</h2>
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
          <p className="eyebrow">System Deployments</p>
          <h2>Critical assets and integrated packages utilizing composites</h2>
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
          <p className="eyebrow">Execution Focus</p>
          <h2>Strategic imperatives for supply scope and project delivery</h2>
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
          <p className="eyebrow">RFQ Parameters</p>
          <h2>Essential data points for system design and preliminary costing</h2>
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
          <p className="eyebrow">Discipline Focus</p>
          <h2>Core technical variables driving material and system qualification</h2>
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
          <p className="eyebrow">Support Framework</p>
          <h2>Documentation supporting commercial precision and technical selection</h2>
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
          <p className="eyebrow">Pre-Award Milestones</p>
          <h2>Essential clarifications required for formal package integration</h2>
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
      text: 'Manufacturing planning should begin with product family, dimensions, pressure class, route conditions, and whether the project needs pipe only or a broader package with fittings and fabricated items.',
    },
    {
      title: 'Quality Control Logic',
      text: 'Inspection discussion should point to real checks such as dimensional control, joint tooling, thermal-performance verification, hydrostatic testing, and package completeness before shipment.',
    },
    {
      title: 'Shipment Readiness',
      text: 'Export jobs often require clearer packing logic, marking, documentation sets, and shipment sequencing so the delivered scope matches the site installation plan.',
    },
  ]

  const qualityVisuals = [
    {
      src: '/product-media/quality/tg-test.jpg',
      alt: 'Glass transition temperature test equipment in the quality control room.',
      title: 'Thermal-performance verification',
      text: 'Tg testing visuals help explain how material-system discussion can be tied back to real quality equipment.',
    },
    {
      src: '/product-media/quality/hydro-test.jpg',
      alt: 'Hydrostatic pressure test equipment inside the factory test area.',
      title: 'Hydrostatic pressure testing',
      text: 'Useful proof when clients need to understand pressure-class discussion and test capability before placing project orders.',
    },
    {
      src: '/product-media/quality/thread-mold.jpg',
      alt: 'Thread tooling and dimensional measurement setup for pipe joint production.',
      title: 'Joint tooling and dimensional control',
      text: 'Supports threaded and connection-sensitive product families where manufacturing detail directly affects installation reliability.',
    },
    {
      src: '/product-media/quality/container-shipment.jpg',
      alt: 'Container yard prepared for export shipment.',
      title: 'Packing and shipment readiness',
      text: 'Shows that export supply discussions can include packing sequence, delivery planning, and project shipment control.',
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
          <p className="eyebrow">Factory And Test Visuals</p>
          <h2>Visual proof used to support manufacturing, testing, and shipment discussion.</h2>
        </div>
        <div className="media-grid media-grid-compact">
          {qualityVisuals.map((item) => (
            <article className="media-card" key={item.src}>
              <img src={item.src} alt={item.alt} loading="lazy" />
              <div className="media-card-copy">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
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
    window.location.href = `mailto:${primaryInquiryEmail}?cc=${encodeURIComponent(secondaryInquiryEmail)}&subject=${subject}&body=${body}`
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
      title: 'Product RFQ',
      text: 'Use this route when you already know the product family and need quotation support for pipe, fittings, and package scope.',
    },
    {
      title: 'Technical Review',
      text: 'Use this route when the project still needs support on material family, joints, operating conditions, or product selection.',
    },
    {
      title: 'Document Request',
      text: 'Use this route when you need product overviews, datasheets, manufacturing discussion, or RFQ support material.',
    },
  ]

  const supportLinks = [
    {
      title: 'Browse product families',
      text: 'Compare well, line, marine, flexible pipe, and fittings pages before sending the request.',
      to: '/products',
      cta: 'Open products',
    },
    {
      title: 'Review application pages',
      text: 'Start from oil and gas, marine, desalination, or chemical service if the project use case is already clear.',
      to: '/applications',
      cta: 'Open applications',
    },
    {
      title: 'Open downloads',
      text: 'Use this page when the next step is product overviews, RFQ preparation support, or manufacturing-related material.',
      to: '/resources/downloads',
      cta: 'Open downloads',
    },
    {
      title: 'Check engineering guidance',
      text: 'Review material systems, joints, and technical scope if the inquiry still needs engineering clarification.',
      to: '/engineering',
      cta: 'Open engineering',
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
      <section className="section contact-panel contact-panel-priority">
        <div>
          <p className="eyebrow">Direct Email</p>
          <h2>Send your inquiry directly by email.</h2>
          <p>
            If the project is already active, the fastest path is to send the inquiry by email
            with product family, service media, dimensions, pressure class, fittings scope, and
            destination market.
          </p>
        </div>
        <article className="contact-card contact-card-priority">
          <p>Inquiry Email</p>
          <div className="email-stack">
            <a href={`mailto:${primaryInquiryEmail}`}>{primaryInquiryEmail}</a>
            <a href={`mailto:${secondaryInquiryEmail}`}>{secondaryInquiryEmail}</a>
          </div>
          <span>
            Click either email address below to open your mail app directly and start your inquiry.
          </span>
        </article>
      </section>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Contact Routes</p>
          <h2>Choose the route that matches your request.</h2>
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
        <article className="detail-panel rfq-panel-container">
          <p className="eyebrow" style={{marginBottom: '1rem'}}>Smart RFQ Builder</p>
          <h2>Build a complete engineering package request.</h2>
          <SmartRFQForm />
        </article>
      </div>

      <section className="section section-grid page-section">
        <div className="section-heading">
          <p className="eyebrow">Before You Email</p>
          <h2>These pages can help narrow the request first.</h2>
        </div>
        <div className="detail-card-grid">
          {supportLinks.map((item) => (
            <article className="detail-panel" key={item.to}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Link className="text-link" to={item.to}>
                {item.cta}
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
        <div className="email-stack">
          <a href={`mailto:${primaryInquiryEmail}`}>{primaryInquiryEmail}</a>
          <a href={`mailto:${secondaryInquiryEmail}`}>{secondaryInquiryEmail}</a>
        </div>
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
