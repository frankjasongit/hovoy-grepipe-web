import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppRoutes, MetaContext, type MetaSnapshot } from './App'

export function render(url: string) {
  const meta: MetaSnapshot = {}

  const appHtml = renderToString(
    <MetaContext.Provider value={meta}>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </MetaContext.Provider>,
  )

  return { appHtml, meta }
}
