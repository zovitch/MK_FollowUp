import {
  Datagrid,
  Edit,
  InfiniteList,
  ShowButton,
  SimpleForm,
  TextField,
  TextInput,
  useRecordContext,
  useResourceContext,
} from 'react-admin'

// eslint-disable-next-line react-refresh/only-export-components
const ItemEdit = () => {
  const record = useRecordContext()
  const resource = useResourceContext()
  return (
    <Edit resource={resource} actions={null} id={record.id}>
      <SimpleForm>
        <TextInput source='description' />
      </SimpleForm>
    </Edit>
  )
}

export const Library_itemList = () => (
  <InfiniteList sort={{ field: 'lItem', order: 'ASC' }}>
    <Datagrid
      bulkActionButtons={false}
      expand={<ItemEdit />}
      expandSingle
      rowClick='expand'
    >
      <TextField source='lItem' />
      <TextField source='description' />
      <ShowButton />
    </Datagrid>
  </InfiniteList>
)
