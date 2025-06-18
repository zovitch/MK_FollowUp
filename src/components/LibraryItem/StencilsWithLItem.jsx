/**
 * StencilsWithLItem component for displaying stencils that use a specific library item.
 * This component shows a list of stencils that reference the current library item.
 *
 * @module StencilsWithLItem
 */

import { useEffect, useState } from 'react'
import {
  useRecordContext,
  useGetList,
  Datagrid,
  ListContextProvider,
  ChipField,
} from 'react-admin'

/**
 * StencilsWithLItem component that displays stencils using the current library item.
 *
 * Features:
 * - Fetches all stencils and filters those using the current library item
 * - Shows stencil numbers with custom styling
 * - Clickable rows that navigate to the stencil details
 * - Stencils are sorted by stencil number
 *
 * @returns {JSX.Element} A list of stencils using the current library item
 */
const StencilsWithLItem = () => {
  /** @type {[Array<Object>, Function]} State for storing filtered stencils */
  const [stencils, setStencils] = useState([])

  /** @type {Object} Current record context from React Admin */
  const record = useRecordContext()

  /**
   * Fetch stencils data with pagination and sorting
   * @type {Object} Query result containing data, loading state, and error
   */
  const {
    data: stencilData,
    isLoading,
    error,
  } = useGetList('stencils', {
    pagination: { page: 1, perPage: 10000 },
    sort: { field: 'stencilNumber', order: 'ASC' },
  })

  /**
   * Effect to filter and process stencils when data is loaded.
   * Filters stencils to only those using the current library item and sorts them by stencil number.
   *
   * @effect
   * @dependencies {Array} stencilData - The fetched stencil data
   * @dependencies {boolean} isLoading - Loading state of the data fetch
   * @dependencies {Error|null} error - Error state of the data fetch
   * @dependencies {string} record.id - ID of the current library item
   */
  useEffect(() => {
    if (!isLoading && !error && stencilData) {
      const filteredStencils = stencilData
        .filter((stencil) => stencil.lItem_ids?.includes(record.id))
        .sort((a, b) =>
          String(a.stencilNumber).localeCompare(String(b.stencilNumber)),
        )
      setStencils(filteredStencils)
    }
  }, [stencilData, isLoading, error, record.id])

  if (isLoading) return <span>Loading...</span>
  if (error) return <span>Error: {error.message}</span>

  return (
    <ListContextProvider
      value={{
        data: stencils,
        ids: stencils.map((stencil) => stencil.id),
        loaded: true,
        total: stencils.length,
      }}
    >
      <Datagrid
        bulkActionButtons={false}
        rowClick={(id) => `/stencils/${id}/show`}
      >
        <ChipField
          source='stencilNumber'
          label='Stencil Number'
          sx={{
            color: 'white',
            backgroundColor: 'primary.main',
            '& .MuiChip-label': {
              color: 'white',
            },
          }}
        />
      </Datagrid>
    </ListContextProvider>
  )
}

export default StencilsWithLItem
