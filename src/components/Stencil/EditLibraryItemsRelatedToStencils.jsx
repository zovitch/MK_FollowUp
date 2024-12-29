import { useEffect, useState } from 'react'
import { useGetRecordId, useGetList } from 'react-admin'

import { useFormContext } from 'react-hook-form'

import { Autocomplete, TextField } from '@mui/material/'

export const EditLibraryItemsRelatedToStencils = () => {
  const recordId = useGetRecordId()
  const [selectedLibraryItems, setSelectedLibraryItems] = useState([])
  const { setValue } = useFormContext()

  const {
    data: stencilLibraryItems,
    isPending: isPendingStencilLibraryItems,
    error: errorStencilLibraryItems,
  } = useGetList('stencil_library_items', {
    filter: { stencil_id: recordId },
    meta: { columns: ['*', 'library_item:library_items(*)'] },
  })

  const {
    data: allLibraryItems,
    isPending: isPendingAllLibraryItems,
    error: errorAllLibraryItems,
  } = useGetList('library_items', {
    pagination: { page: 1, perPage: 5000 },
    sort: { field: 'lItem', order: 'ASC' },
  })

  useEffect(() => {
    if (stencilLibraryItems) {
      const sortedLibraryItems = stencilLibraryItems
        .map((item) => item.library_item)
        .sort((a, b) => a.lItem.localeCompare(b.lItem))
      setSelectedLibraryItems(sortedLibraryItems)
      setValue(
        'library_item_ids',
        sortedLibraryItems.map((item) => item.id),
      )
    }
  }, [stencilLibraryItems, setValue])

  if (
    isPendingStencilLibraryItems ||
    isPendingAllLibraryItems ||
    !stencilLibraryItems ||
    !allLibraryItems
  )
    return <p>Loading...</p>
  if (errorStencilLibraryItems || errorAllLibraryItems)
    return (
      <>
        Error:{' '}
        {errorStencilLibraryItems?.message ||
          errorAllLibraryItems?.message ||
          'Unknown error'}
      </>
    )

  return (
    <Autocomplete
      multiple
      filterSelectedOptions
      id='tags-standard'
      options={allLibraryItems}
      getOptionLabel={(option) => option.lItem}
      value={selectedLibraryItems}
      onChange={(event, values) => {
        setSelectedLibraryItems(values)
        setValue(
          'library_item_ids',
          values.map((item) => item.id),
        )
      }}
      renderInput={(params) => (
        <TextField {...params} variant='standard' label='Library Items' />
      )}
    />
  )
}

export default EditLibraryItemsRelatedToStencils
