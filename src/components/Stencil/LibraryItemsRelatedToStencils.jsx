import { useGetList, useGetRecordId, useRedirect } from 'react-admin'

import { Box, Chip } from '@mui/material'

export const LibraryItemsRelatedToStencils = () => {
  const recordId = useGetRecordId()
  const redirect = useRedirect()

  const {
    data: stencilLibraryItems,
    isPending,
    error,
  } = useGetList('stencil_library_items', {
    filter: { stencil_id: recordId },
    meta: { columns: ['*', 'library_item:library_items(*)'] },
  })
  if (isPending) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const libraryItemData = stencilLibraryItems
    ? stencilLibraryItems.map((item) => ({
        id: item.library_item.id,
        lItem: item.library_item.lItem,
      }))
    : []
  const sortedLibraryItemData = libraryItemData.sort((a, b) =>
    a.lItem.localeCompare(b.lItem),
  )

  const handleClick = (event, libraryItem) => {
    event.stopPropagation()
    redirect(`/library_items/${libraryItem.id}/show`)
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {sortedLibraryItemData.map((libraryItem) => (
        <Chip
          key={libraryItem.lItem}
          label={`${libraryItem.lItem}`}
          onClick={(event) => handleClick(event, libraryItem)}
          variant='outlined'
          sx={{
            color: 'secondary.main',
            borderColor: 'secondary.main',
            '& .MuiChip-label': {
              color: 'secondary.main',
            },
          }}
        />
      ))}
    </Box>
  )
}
