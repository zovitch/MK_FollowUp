import { useEffect, useState } from 'react'
import { Link, useGetList, useRecordContext } from 'react-admin'
import { Chip, Stack } from '@mui/material'

const StencilLibraryItemsShow = () => {
  const record = useRecordContext()
  const [libraryItemIds, setLibraryItemIds] = useState([])
  const [libraryItems, setLibraryItems] = useState([])

  const {
    data: stencils2LibraryItems,
    isPending: isPendingStencils2LibraryItems,
    error: errorStencils2LibraryItems,
  } = useGetList('stencils2library_items', {
    filter: { stencil_id: record.id },
  })

  useEffect(() => {
    if (
      !isPendingStencils2LibraryItems &&
      !errorStencils2LibraryItems &&
      stencils2LibraryItems
    ) {
      const ids = stencils2LibraryItems.map((item) => item.lItem_id)
      setLibraryItemIds(ids)
    }
  }, [
    stencils2LibraryItems,
    isPendingStencils2LibraryItems,
    errorStencils2LibraryItems,
  ])

  const {
    data: libraryItemData,
    isPending: isPendingLibraryItems,
    error: errorLibraryItems,
  } = useGetList('library_items', {
    filter: { id: libraryItemIds },
    sort: { field: 'lItem', order: 'ASC' },
  })

  useEffect(() => {
    if (!isPendingLibraryItems && !errorLibraryItems && libraryItemData) {
      setLibraryItems(libraryItemData)
    }
  }, [libraryItemData, isPendingLibraryItems, errorLibraryItems])

  if (isPendingStencils2LibraryItems || isPendingLibraryItems)
    return <span>Loading...</span>
  if (errorStencils2LibraryItems || errorLibraryItems)
    return (
      <span>
        Error:{' '}
        {errorStencils2LibraryItems?.message || errorLibraryItems?.message}
      </span>
    )
  const handleChipClick = (event) => {
    event.stopPropagation()
  }
  return (
    <Stack direction='row' spacing={1}>
      {libraryItems.map((item) => (
        <Link
          key={item.id}
          to={`/library_items/${item.id}/show`}
          onClick={handleChipClick}
          style={{ textDecoration: 'none' }}
        >
          <Chip
            label={item.lItem}
            sx={{
              color: 'primary.main',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          />
        </Link>
      ))}
    </Stack>
  )
}

export default StencilLibraryItemsShow
