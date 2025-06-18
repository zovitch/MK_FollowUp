/**
 * MkFileCreate component for creating new MK files.
 * This component provides a form to create new MK files with automatic filename generation
 * and stencil management capabilities.
 *
 * @module MkFileCreate
 */

import {
  Create,
  TextInput,
  useGetList,
  SimpleForm,
  ArrayInput,
  SimpleFormIterator,
  ReferenceInput,
  AutocompleteInput,
  required,
  useCreateSuggestionContext,
  useCreate,
  NumberInput,
} from 'react-admin'
import { useState } from 'react'
import { Dialog, DialogActions, DialogContent, Button } from '@mui/material'

/**
 * CreateStencils component for creating new stencils on the fly.
 * This component renders a dialog with a form to create a new stencil.
 *
 * @returns {JSX.Element} A dialog form for creating new stencils
 */
const CreateStencils = () => {
  const { filter, onCancel, onCreate } = useCreateSuggestionContext()
  const [value, setValue] = useState(filter || '')
  const [create] = useCreate()

  /**
   * Handles the submission of the new stencil form.
   * Creates a new stencil and adds it to the list of available stencils.
   *
   * @param {Event} event - The form submission event
   */
  const handleSubmit = (event) => {
    event.preventDefault()
    create(
      'stencils',
      { data: { stencilNumber: value } },
      {
        onSuccess: ({ data }) => {
          setValue('')
          onCreate(data)
        },
      },
    )
  }

  return (
    <Dialog open onClose={onCancel}>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <NumberInput
            label='New Stencil Number'
            value={value}
            onChange={(event) => setValue(event.target.value)}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button type='submit'>Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

/**
 * MkFileCreate component that provides a form to create new MK files.
 *
 * Features:
 * - Automatic filename generation based on the last MK file number
 * - Filename format: MK_XXXX_ProductSeriesName (where XXXX is an auto-incremented number)
 * - Manage associated stencils:
 *   - Add/remove stencils
 *   - Create new stencils on the fly
 *   - Set version for each stencil
 *
 * @returns {JSX.Element} A creation form for MK files
 */
export const MkFileCreate = () => {
  const { data, isPending, error } = useGetList('mk_files', {
    sort: { field: 'mkFilename', order: 'DESC' },
  })
  if (isPending) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  // Find the last MK number from existing files
  let lastMkNumber = 0
  data.forEach((item) => {
    const itemNumber = parseInt(item.mkFilename.split('_')[1], 10)
    if (itemNumber > lastMkNumber) lastMkNumber = itemNumber
  })

  // Increment the last number and format it
  lastMkNumber += 1
  const newMkNumber = lastMkNumber.toString().padStart(4, '0')

  // Generate the new filename prefix
  const newMkFilename = `MK_${newMkNumber}_`

  return (
    <Create redirect='list'>
      <SimpleForm>
        <TextInput
          source='mkFilename'
          label='Product Series Name'
          helperText='The filename will have the format MK_1234_ProductSeriesName , 1234 is alredy defined as the next number'
          required
          defaultValue={newMkFilename}
        />
        <ArrayInput source='stencil_ids' label='Stencils'>
          <SimpleFormIterator inline fullWidth={false}>
            <ReferenceInput
              reference='stencils'
              source='id'
              label='Stencil'
              sort={{ field: 'stencilNumber', order: 'ASC' }}
            >
              <AutocompleteInput
                label='Stencil'
                optionText='stencilNumber'
                optionValue='id'
                validate={required()}
                create={<CreateStencils />}
              />
            </ReferenceInput>
            <TextInput source='version' label='Version' required />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Create>
  )
}
