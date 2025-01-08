import {
  InfiniteList,
  ShowButton,
  Datagrid,
  EditButton,
  ReferenceArrayField,
  ChipField,
  SingleFieldList,
} from 'react-admin'

import { FilterQ } from '../FilterQ'
import { LibraryItemsCountField } from '../utils/LibraryItemsCountField'

export const StencilList = () => (
  <InfiniteList
    sort={{ field: 'stencilNumber', order: 'ASC' }}
    filters={<FilterQ />}
  >
    <Datagrid bulkActionButtons={false}>
      <ChipField
        source='stencilNumber'
        options={{ minimumIntegerDigits: 4, useGrouping: false }}
        sx={{
          color: 'white', // Set the text color to white
          backgroundColor: 'primary.main', // Set the background color
          '& .MuiChip-label': {
            color: 'white', // Ensure the label text color is white
          },
        }}
      />
      <LibraryItemsCountField label='Library Items Count' />
      <ReferenceArrayField
        reference='library_items'
        source='lItem_ids'
        label='Library Items'
      >
        <SingleFieldList linkType='show'>
          <ChipField
            source='lItem'
            variant='outlined'
            sx={{
              color: 'secondary.main',
              borderColor: 'secondary.main',
              '& .MuiChip-label': {
                color: 'secondary.main',
              },
            }}
          />
        </SingleFieldList>
      </ReferenceArrayField>
      <ShowButton />
      <EditButton />
    </Datagrid>
  </InfiniteList>
)
