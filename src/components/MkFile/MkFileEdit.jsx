import {
  ArrayInput,
  AutocompleteInput,
  Edit,
  ReferenceInput,
  required,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
} from 'react-admin'

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
            />
          </ReferenceInput>
          <TextInput source='version' label='Version' required />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
)
