import { useRecordContext } from 'react-admin'

export const LibraryItemsCountField = () => {
  const record = useRecordContext()
  if (!record || !record.lItem_ids) return null
  return <span>{record.lItem_ids.length}</span>
}
