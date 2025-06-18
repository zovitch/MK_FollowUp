/**
 * Data provider configuration for React Admin.
 * This module sets up the connection between React Admin and the JSON Server backend.
 *
 * @module dataProvider
 */

import { fetchUtils } from 'react-admin'
import jsonServerProvider from 'ra-data-json-server'

/**
 * Custom HTTP client configuration for React Admin.
 * Adds necessary headers for CORS and content negotiation.
 *
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Promise} - Fetch response
 */
const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' })
  }
  options.headers.set('Access-Control-Expose-Headers', 'X-Total-Count')
  return fetchUtils.fetchJson(url, options)
}

/**
 * Data provider instance configured with JSON Server.
 * Uses the URL from environment variables and custom HTTP client.
 */
export const dataProvider = jsonServerProvider(
  import.meta.env.VITE_JSON_SERVER_URL,
  httpClient,
)
