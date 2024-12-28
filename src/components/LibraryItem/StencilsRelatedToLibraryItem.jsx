import { useGetList, useGetRecordId, useRedirect } from 'react-admin'

import { Box, Chip } from '@mui/material'

export const StencilsRelatedToLibraryItem = () => {
  const recordId = useGetRecordId()
  const redirect = useRedirect()

  const {
    data: libraryItemStencils,
    isPending,
    error,
  } = useGetList('stencil_library_items', {
    filter: { library_item_id: recordId },
    meta: { columns: ['*', 'stencil:stencils(*)'] },
  })

  if (isPending) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const stencilData = libraryItemStencils
    ? libraryItemStencils.map((item) => ({
        id: item.stencil.id,
        stencilNumber: item.stencil.stencilNumber,
      }))
    : []
  const sortedStencilData = stencilData.sort(
    (a, b) => a.stencilNumber - b.stencilNumber,
  )

  const handleClick = (event, stencil) => {
    event.stopPropagation()
    redirect(`/stencils/${stencil.id}/show`)
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {sortedStencilData.map((stencil) => (
        <Chip
          key={stencil.stencilNumber}
          label={`${stencil.stencilNumber}`}
          color='primary'
          onClick={(event) => handleClick(event, stencil)}
        />
      ))}
    </Box>
  )
}
