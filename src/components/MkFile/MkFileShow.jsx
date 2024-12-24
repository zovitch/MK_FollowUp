import {
  Datagrid,
  Show,
  SimpleShowLayout,
  TextField,
  ArrayField,
  ReferenceField,
  ChipField,
} from 'react-admin'

const handleRowClick = (id) => `/stencils/${id}/show`

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
      <ArrayField
        source='stencil_ids'
        sort={{ field: 'stencilNumber', order: 'ASC' }}
        label='Stencils'
      >
        <Datagrid
          bulkActionButtons={false}
          rowClick={(id) => handleRowClick(id)}
        >
          <ReferenceField
            reference='stencils'
            source='id'
            label='Stencil Number'
          >
            <ChipField
              source='stencilNumber'
              sx={{
                color: 'white', // Set the text color to white
                backgroundColor: 'primary.main', // Set the background color
                '& .MuiChip-label': {
                  color: 'white', // Ensure the label text color is white
                },
              }}
            />
          </ReferenceField>
          <TextField source='version' />
        </Datagrid>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
)
