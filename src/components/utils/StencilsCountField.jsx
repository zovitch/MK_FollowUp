/**
 * StencilsCountField component for displaying the count of stencils.
 * This component shows the number of stencils associated with a record.
 *
 * @module StencilsCountField
 */

import { useRecordContext } from 'react-admin'

/**
 * StencilsCountField component that displays the count of stencils.
 *
 * Features:
 * - Displays the number of stencils in the stencil_ids array
 * - Returns null if the record or stencil_ids is not available
 *
 * @returns {JSX.Element|null} The count of stencils or null
 */
export const StencilsCountField = () => {
  const record = useRecordContext()
  if (!record || !record.stencil_ids) return null
  return <span>{record.stencil_ids.length}</span>
}
