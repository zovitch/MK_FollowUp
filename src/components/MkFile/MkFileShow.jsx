import {
  Datagrid,
  ReferenceManyField,
  ReferenceOneField,
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
      <ReferenceManyField
        reference='mk_files2stencils'
        target='mk_file_id'
        label='Stencils Numbers'
      >
        <Datagrid bulkActionButtons={false}>
          <ReferenceOneField
            reference='stencils'
            target='id'
            source='stencil_id'
          >
            <TextField source='stencilNumber' />
          </ReferenceOneField>
          <TextField source='stencilVersion' />
        </Datagrid>
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
)
