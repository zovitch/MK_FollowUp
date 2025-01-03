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

const CreateStencils = () => {
  const { filter, onCancel, onCreate } = useCreateSuggestionContext()
  const [value, setValue] = useState(filter || '')
  const [create] = useCreate()

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

export const MkFileCreate = () => {
  const { data, isPending, error } = useGetList('mk_files', {
    sort: { field: 'mkFilename', order: 'DESC' },
  })
  if (isPending) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  // search in the data for the last item, knowin that they are formed as MK_1234_ProductSeriesName, with 1234 being a number
  let lastMkNumber = 0
  data.forEach((item) => {
    const itemNumber = parseInt(item.mkFilename.split('_')[1], 10) // Ensure base 10 parsing
    if (itemNumber > lastMkNumber) lastMkNumber = itemNumber
  })

  // increment the last stencil to get the new stencil number
  lastMkNumber += 1
  const newMkNumber = lastMkNumber.toString().padStart(4, '0')

  // form the new mkFilename
  const newMkFilename = `MK_${newMkNumber}_` // The filename will have the format MK_1234_ProductSeriesName , 1234 is automatic

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
