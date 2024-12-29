import { Edit, SimpleForm, TextInput } from 'react-admin'
import { StencilsRelatedToMkFiles } from './StencilsRelatedToMkFiles'
import { EditStencilsRelatedToMkFiles } from './EditStencilsRelatedToMkFiles'

export const MkFileEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source='mkFilename' />

      <StencilsRelatedToMkFiles />

      <EditStencilsRelatedToMkFiles />

      {/* <ArrayInput source='stencil_ids' label='Stencils'>
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
      </ArrayInput> */}
    </SimpleForm>
  </Edit>
)
