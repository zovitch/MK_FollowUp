import {
  Datagrid,
  InfiniteList,
  ShowButton,
  EditButton,
  ReferenceField,
  ChipField,
  SingleFieldList,
  ArrayField,
} from 'react-admin'

import { FilterQ } from '../FilterQ'

export const MkFileList = () => (
  <InfiniteList
    filters={<FilterQ />}
    sort={{ field: 'mkFilename', order: 'ASC' }}
  >
    <Datagrid bulkActionButtons={false}>
      <ChipField
        source='mkFilename'
        color='primary'
        sx={{
          borderColor: 'primary.main',
          borderRadius: '5px',
          floodopacity: 0.8,
          opacity: 0.8,
          fontWeight: 'bold',
          fontSize: '1.1rem',
        }}
      />
      <ArrayField source='stencil_ids' label='Stencils'>
        <SingleFieldList linkType='show'>
          <ReferenceField reference='stencils' source='id'>
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
        </SingleFieldList>
      </ArrayField>
      <ShowButton />
      <EditButton />
    </Datagrid>
  </InfiniteList>
)
