import {
  ChipField,
  NumberField,
  ReferenceArrayField,
  Show,
  SimpleShowLayout,
  SingleFieldList,
} from 'react-admin'

export const StencilShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <NumberField
          source='stencilNumber'
          options={{ minimumIntegerDigits: 4, useGrouping: false }}
          sx={{
            fontSize: 24,
            fontWeight: 'bold',
            color: 'primary.main',
          }}
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
      </SimpleShowLayout>
    </Show>
  )
}
