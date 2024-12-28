import {
  ChipField,
  Datagrid,
  EditButton,
  InfiniteList,
  SearchInput,
  ShowButton,
  TextField,
} from 'react-admin'

const libraryFilters = [<SearchInput key={1} source='lItem@ilike' alwaysOn />]

export const Library_itemList = () => (
  <InfiniteList
    sort={{ field: 'lItem', order: 'ASC' }}
    filters={libraryFilters}
  >
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
