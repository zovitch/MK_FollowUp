import {
  ChipField,
  Datagrid,
  NumberField,
  ReferenceManyField,
  ReferenceOneField,
  Show,
  SimpleShowLayout,
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
        <ReferenceManyField
          reference='stencils2library_items'
          target='stencil_id'
          label='Library Items'
        >
          <Datagrid bulkActionButtons={false}>
            <ReferenceOneField
              reference='library_items'
              target='id'
              source='lItem_id'
            >
              <ChipField source='lItem' />
            </ReferenceOneField>
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  )
}
