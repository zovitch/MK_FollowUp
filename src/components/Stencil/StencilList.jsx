import {
  InfiniteList,
  NumberField,
  ShowButton,
  Datagrid,
  EditButton,
} from 'react-admin'
import StencilLibraryItemsShow from './StencilLibraryItemsShow'

export const StencilList = () => (
  <InfiniteList sort={{ field: 'stencilNumber', order: 'ASC' }}>
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
