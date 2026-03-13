import { promises as fs } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const siteUrl = 'https://hovoy-grepipe.com'
const rootDir = process.cwd()
const distDir = path.join(rootDir, 'dist')
const serverBundlePath = path.join(distDir, 'server', 'entry-server.js')
const templatePath = path.join(distDir, 'index.html')
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml')

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function replaceTag(html, pattern, replacement) {
  if (pattern.test(html)) {
    return html.replace(pattern, replacement)
  }

  return html
}

function injectMeta(html, meta, routePath) {
  const resolvedPath =
    meta.path ?? (routePath === '/' ? '/' : `${routePath.replace(/\/+$/, '')}/`)
  const canonicalUrl = `${siteUrl}${resolvedPath}`
  const title = escapeHtml(meta.title ?? 'Hovoy GRE Pipe | GRE, GRP, and FRP Pipe Systems')
  const description = escapeHtml(
    meta.description ??
      'Hovoy GRE Pipe supplies GRE, GRP, and FRP pipe systems, fittings, and industrial piping solutions.',
  )

  let updated = html
  updated = replaceTag(updated, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
  updated = replaceTag(
    updated,
    /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/,
    `<meta name="description" content="${description}" />`,
  )
  updated = replaceTag(
    updated,
    /<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/,
    `<link rel="canonical" href="${canonicalUrl}" />`,
  )
  updated = replaceTag(
    updated,
    /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/,
    `<meta property="og:title" content="${title}" />`,
  )
  updated = replaceTag(
    updated,
    /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/,
    `<meta property="og:description" content="${description}" />`,
  )
  updated = replaceTag(
    updated,
    /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/,
    `<meta property="og:url" content="${canonicalUrl}" />`,
  )

  return updated
}

function getOutputPath(routePath) {
  if (routePath === '/') {
    return path.join(distDir, 'index.html')
  }

  return path.join(distDir, routePath.replace(/^\/+|\/+$/g, ''), 'index.html')
}

async function getRoutes() {
  const sitemapXml = await fs.readFile(sitemapPath, 'utf8')
  const locMatches = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)]

  return [
    ...new Set(
      locMatches
        .map((match) => new URL(match[1]).pathname)
        .map((pathname) => {
          if (!pathname || pathname === '/') {
            return '/'
          }

          return pathname.replace(/\/+$/, '')
        }),
    ),
  ]
}

async function prerender() {
  const template = await fs.readFile(templatePath, 'utf8')
  const routes = await getRoutes()
  const { render } = await import(pathToFileURL(serverBundlePath).href)

  for (const routePath of routes) {
    const { appHtml, meta } = render(routePath)

    if (!meta.path || !meta.title || !meta.description) {
      throw new Error(`Missing meta during prerender for route: ${routePath}`)
    }

    const htmlWithApp = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    const finalHtml = injectMeta(htmlWithApp, meta, routePath)
    const outputPath = getOutputPath(routePath)

    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.writeFile(outputPath, finalHtml)
  }

  await fs.rm(path.join(distDir, 'server'), { recursive: true, force: true })
}

prerender().catch((error) => {
  console.error(error)
  process.exit(1)
})
