import { useEffect, useState } from 'react'
import { useGetRecordId, useGetList } from 'react-admin'
import { useFormContext } from 'react-hook-form'
import { Autocomplete, TextField } from '@mui/material/'

export const EditLibraryItemsRelatedToStencils = () => {
  const [selectedLibraryItems, setSelectedLibraryItems] = useState([])
  const { setValue, register } = useFormContext()
  const recordId = useGetRecordId()

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
    register('library_item_ids')
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
  }, [stencilLibraryItems, setValue, register])

  if (isPendingStencilLibraryItems || isPendingAllLibraryItems)
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

  // Filter out selected library items from the list of all library items
  const availableLibraryItems = allLibraryItems.filter(
    (item) =>
      !selectedLibraryItems.some((selectedItem) => selectedItem.id === item.id),
  )

  return (
    <Autocomplete
      multiple
      filterSelectedOptions
      options={availableLibraryItems}
      getOptionLabel={(option) => option.lItem}
      value={selectedLibraryItems}
      onChange={(event, values) => {
        setSelectedLibraryItems(values)
        setValue(
          'library_item_ids',
          values.map((item) => item.id),
          { shouldDirty: true }, // Mark the field as dirty to activate the save button
        )
      }}
      renderInput={(params) => (
        <TextField {...params} variant='standard' label='Library Items' />
      )}
    />
  )
}
