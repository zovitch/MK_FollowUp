/**
 * LibraryItemsCountField component for displaying the count of library items.
 * This component shows the number of library items associated with a record.
 *
 * @module LibraryItemsCountField
 */

import { useRecordContext } from 'react-admin'

/**
 * LibraryItemsCountField component that displays the count of library items.
 *
 * Features:
 * - Displays the number of library items in the lItem_ids array
 * - Returns null if the record or lItem_ids is not available
 *
 * @returns {JSX.Element|null} The count of library items or null
 */
export const LibraryItemsCountField = () => {
  const record = useRecordContext()
  if (!record || !record.lItem_ids) return null
  return <span>{record.lItem_ids.length}</span>
}
