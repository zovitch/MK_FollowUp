import { NumberField, Show, SimpleShowLayout } from 'react-admin'
import StencilLibraryItemsShow from './StencilLibraryItemsShow'

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
        <StencilLibraryItemsShow />
      </SimpleShowLayout>
    </Show>
  )
}
