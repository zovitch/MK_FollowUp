import { fetchUtils } from 'react-admin'
import jsonServerProvider from 'ra-data-json-server'

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' })
  }
  options.headers.set('Access-Control-Expose-Headers', 'X-Total-Count')
  return fetchUtils.fetchJson(url, options)
}

export const dataProvider = jsonServerProvider(
  import.meta.env.VITE_JSON_SERVER_URL,
  httpClient,
)
