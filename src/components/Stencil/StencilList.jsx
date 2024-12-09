import {
  ChipField,
  Datagrid,
  InfiniteList,
  NumberField,
  ReferenceManyField,
  ReferenceOneField,
  SingleFieldList,
} from 'react-admin'

export const StencilList = () => (
  <InfiniteList sort={{ field: 'stencilNumber', order: 'ASC' }}>
    <Datagrid bulkActionButtons={false}>
      <NumberField
        source='stencilNumber'
        options={{ minimumIntegerDigits: 4, useGrouping: false }}
      />
      <ReferenceManyField
        reference='stencils2library_items'
        target='stencil_id'
        label='Library Items'
      >
        <SingleFieldList>
          <ReferenceOneField
            reference='library_items'
            target='id'
            source='lItem_id'
          >
            <ChipField source='lItem' />
          </ReferenceOneField>
        </SingleFieldList>
      </ReferenceManyField>
    </Datagrid>
  </InfiniteList>
)
