import {
  InfiniteList,
  NumberField,
  ShowButton,
  Datagrid,
  EditButton,
  ReferenceArrayField,
} from 'react-admin'

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
      <ReferenceArrayField reference='library_items' source='lItem_ids' />

      <ShowButton />
      <EditButton />
    </Datagrid>
  </InfiniteList>
)
