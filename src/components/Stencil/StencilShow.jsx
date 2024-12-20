import {
  NumberField,
  ReferenceArrayField,
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
        <ReferenceArrayField source='lItem_ids' reference='library_items' />
      </SimpleShowLayout>
    </Show>
  )
}
