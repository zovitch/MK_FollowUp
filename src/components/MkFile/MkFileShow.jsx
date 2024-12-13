import {
  ArrayField,
  Datagrid,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
} from 'react-admin'

export const MkFileShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField
        source='mkFilename'
        sx={{
          fontSize: 24,
          fontWeight: 'bold',
          color: 'primary.main',
        }}
      />
      <ArrayField source='stencil_ids' label='Stencils'>
        <Datagrid bulkActionButtons={false}>
          <ReferenceField source='id' reference='stencils'>
            <TextField source='stencilNumber' />
          </ReferenceField>
          <TextField source='version' label='Version' />
        </Datagrid>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
)
