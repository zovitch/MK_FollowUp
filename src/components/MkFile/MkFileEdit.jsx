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
} from 'react-admin'

import { useState } from 'react'

import { Dialog, DialogActions, DialogContent, Button } from '@mui/material'

const CreateStencils = () => {
  const { filter, onCancel, onCreate } = useCreateSuggestionContext()
  const [value, setValue] = useState(filter || '')
  const [create] = useCreate()

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

export const MkFileEdit = () => (
  <Edit>
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
