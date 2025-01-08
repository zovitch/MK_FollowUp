import { useRecordContext } from 'react-admin'

export const StencilsCountField = () => {
  const record = useRecordContext()
  if (!record || !record.stencil_ids) return null
  return <span>{record.stencil_ids.length}</span>
}
