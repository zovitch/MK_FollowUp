/**
 * MkFileEdit component for editing MK file details.
 * This component provides a form to edit MK file information and manage associated stencils.
 *
 * @module MkFileEdit
 */

import {
  ArrayInput,
  AutocompleteInput,
  Edit,
  ReferenceInput,
  required,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  useCreateSuggestionContext,
  useCreate,
  NumberInput,
  PrevNextButtons,
  TopToolbar,
  ShowButton,
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
      {
        data: {
          stencilNumber: value,
        },
      },
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
 * MkFileEdit component that provides a form to edit MK file details.
 *
 * Features:
 * - Navigation between MK files using Prev/Next buttons
 * - Show button for quick access to show mode
 * - Edit filename
 * - Manage associated stencils:
 *   - Add/remove stencils
 *   - Create new stencils on the fly
 *   - Set version for each stencil
 *
 * @returns {JSX.Element} An edit form for MK files
 */
export const MkFileEdit = () => (
  <Edit
    actions={
      <TopToolbar>
        <PrevNextButtons
          sort={{
            field: 'mkFilename',
            order: 'ASC',
          }}
        />
        <ShowButton />
      </TopToolbar>
    }
  >
    <SimpleForm>
      <TextInput source='mkFilename' />

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
  </Edit>
)
