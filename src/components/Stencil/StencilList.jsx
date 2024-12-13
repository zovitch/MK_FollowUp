import {
  ChipField,
  Datagrid,
  Edit,
  InfiniteList,
  NumberField,
  ReferenceArrayField,
  ReferenceArrayInput,
  ShowButton,
  SimpleForm,
  SingleFieldList,
  AutocompleteArrayInput,
  useRecordContext,
  useResourceContext,
} from 'react-admin'

// eslint-disable-next-line react-refresh/only-export-components
const StencilEdit = () => {
  const record = useRecordContext()
  const resource = useResourceContext()

  return (
    <Edit resource={resource} actions={null} id={record.id}>
      <SimpleForm>
        <ReferenceArrayInput
          reference='library_items'
          source='library_item_ids'
          sort={{ field: 'lItem', order: 'ASC' }}
        >
          <AutocompleteArrayInput optionText='lItem' />
        </ReferenceArrayInput>
      </SimpleForm>
    </Edit>
  )
}

export const StencilList = () => (
  <InfiniteList sort={{ field: 'stencilNumber', order: 'ASC' }}>
    <Datagrid
      bulkActionButtons={false}
      expand={<StencilEdit />}
      expandSingle
      rowClick='expand'
    >
      <NumberField
        source='stencilNumber'
        options={{ minimumIntegerDigits: 4, useGrouping: false }}
      />
      <ReferenceArrayField
        reference='library_items'
        source='library_item_ids'
        label='Library Items'
        sort={{ field: 'lItem', order: 'ASC' }}
      >
        <SingleFieldList linkType='show'>
          <ChipField source='lItem' />
        </SingleFieldList>
      </ReferenceArrayField>
      <ShowButton />
    </Datagrid>
  </InfiniteList>
)
