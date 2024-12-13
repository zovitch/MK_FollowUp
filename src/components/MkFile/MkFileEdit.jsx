import {
  ArrayInput,
  AutocompleteInput,
  Edit,
  ReferenceInput,
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
          <ReferenceInput reference='stencils' source='id' label='Stencil'>
            <AutocompleteInput
              label='Stencil'
              optionText='stencilNumber'
              optionValue='id'
            />
          </ReferenceInput>
          <TextInput source='version' label='Version' />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
)
