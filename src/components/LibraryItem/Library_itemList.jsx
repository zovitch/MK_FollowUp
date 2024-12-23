import {
  ChipField,
  Datagrid,
  EditButton,
  InfiniteList,
  ShowButton,
  TextField,
} from 'react-admin'

import { FilterQ } from '../FilterQ'

export const Library_itemList = () => (
  <InfiniteList sort={{ field: 'lItem', order: 'ASC' }} filters={<FilterQ />}>
    <Datagrid bulkActionButtons={false} rowClick='show'>
      <ChipField
        source='lItem'
        label='Library Item'
        variant='outlined'
        sx={{
          color: 'secondary.main',
          borderColor: 'secondary.main',
          '& .MuiChip-label': {
            color: 'secondary.main',
          },
        }}
      />
      <TextField source='description' />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </InfiniteList>
)
