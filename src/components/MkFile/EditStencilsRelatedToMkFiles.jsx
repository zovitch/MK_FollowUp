import { useGetRecordId, useGetList } from 'react-admin'

export const EditStencilsRelatedToMkFiles = () => {
  const recordId = useGetRecordId()

  const {
    data: mkFileStencils,
    isPending,
    error,
  } = useGetList('mk_file_stencils', {
    filter: { mk_file_id: recordId },
    meta: { columns: ['*', 'stencil:stencils(*)'] },
  })

  if (isPending) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const stencilData = mkFileStencils
    ? mkFileStencils.map((item) => ({
        id: item.stencil.id,
        stencilNumber: item.stencil.stencilNumber,
        version: item.version,
      }))
    : []
  const sortedStencilData = stencilData.sort(
    (a, b) => a.stencilNumber - b.stencilNumber,
  )

  return (
    <div>
      {sortedStencilData.map((stencil) => (
        <div key={stencil.stencilNumber}>
          <p>{stencil.stencilNumber}</p>
          <p>{stencil.version}</p>
        </div>
      ))}
    </div>
  )
}
