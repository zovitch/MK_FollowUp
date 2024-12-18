import {
  InfiniteList,
  NumberField,
  ShowButton,
  Datagrid,
  EditButton,
} from 'react-admin'

import StencilLibraryItemsShow from './StencilLibraryItemsShow'
import { FilterQ } from '../FilterQ'

export const StencilList = () => (
  <InfiniteList
    sort={{ field: 'stencilNumber', order: 'ASC' }}
    filters={<FilterQ />}
  >
    <Datagrid bulkActionButtons={false}>
      <NumberField
        source='stencilNumber'
        options={{ minimumIntegerDigits: 4, useGrouping: false }}
      />
      <StencilLibraryItemsShow />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </InfiniteList>
)
