import { useState } from 'react'
import {
  Edit,
  SimpleForm,
  TextInput,
  useGetList,
  useNotify,
  useRedirect,
  useCreate,
  useUpdate,
  useDeleteMany,
  useGetRecordId,
} from 'react-admin'

import { Switch, FormControlLabel, Box } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import { EditLibraryItemsRelatedToStencils } from './EditLibraryItemsRelatedToStencils'

export const StencilEdit = () => {
  const notify = useNotify()
  const redirect = useRedirect()
  const [create] = useCreate()
  const [update] = useUpdate()
  const [deleteMany] = useDeleteMany()
  const recordId = useGetRecordId()
  const [isStencilNumberEditable, setIsStencilNumberEditable] = useState(false)

  const {
    data: existingItems,
    isLoading: isLoadingExistingItems,
    error: errorExistingItems,
  } = useGetList('stencil_library_items', {
    filter: { stencil_id: recordId },
  })

  const handleSave = async (data) => {
    try {
      // Update the stencil
      await update('stencils', {
        id: recordId,
        data: { stencilNumber: data.stencilNumber },
      })

      // Determine items to delete
      const newItemIds = data.library_item_ids
      const itemsToDelete = existingItems.filter(
        (item) => !newItemIds.includes(item.library_item_id),
      )

      // Delete existing stencil_library_items
      await deleteMany('stencil_library_items', {
        ids: itemsToDelete.map((item) => item.id),
      })

      // Create new stencil_library_items
      await Promise.all(
        newItemIds.map((libraryItemId) =>
          create('stencil_library_items', {
            data: { stencil_id: recordId, library_item_id: libraryItemId },
          }),
        ),
      )

      notify('Stencil updated successfully', { type: 'success' })
      redirect('list', 'stencils')
    } catch (error) {
      notify('Error updating stencil', { type: 'warning' })
    }
  }

  if (isLoadingExistingItems) return <p>Loading...</p>
  if (errorExistingItems) return <p>Error loading existing items</p>

  return (
    <Edit>
      <SimpleForm onSubmit={handleSave}>
        <Box display='flex' alignItems='center'>
          <TextInput
            source='stencilNumber'
            disabled={!isStencilNumberEditable}
          />
          <FormControlLabel
            control={
              <Switch
                checked={isStencilNumberEditable}
                onChange={() =>
                  setIsStencilNumberEditable(!isStencilNumberEditable)
                }
                name='toggleStencilNumber'
                color='primary'
                sx={{ ml: 2 }}
              />
            }
            label={isStencilNumberEditable ? <LockOpenIcon /> : <LockIcon />}
          />
        </Box>
        <EditLibraryItemsRelatedToStencils />
      </SimpleForm>
    </Edit>
  )
}
