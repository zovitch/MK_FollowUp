import {
  InfiniteList,
  ShowButton,
  Datagrid,
  EditButton,
  ChipField,
  Labeled,
} from 'react-admin'

import { FilterQ } from '../FilterQ'
import { LibraryItemsRelatedToStencils } from './LibraryItemsRelatedToStencils'

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
      <Labeled label='Library Item'>
        <LibraryItemsRelatedToStencils />
      </Labeled>
      <ShowButton />
      <EditButton />
    </Datagrid>
  </InfiniteList>
)
