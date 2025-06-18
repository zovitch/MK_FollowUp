/**
 * StencilCreate component for creating new stencils.
 * This component provides a form to create new stencils with automatic number generation
 * and library item management capabilities.
 *
 * @module StencilCreate
 */

import {
  Create,
  AutocompleteArrayInput,
  SimpleForm,
  NumberInput,
  ReferenceArrayInput,
  useGetList,
} from 'react-admin'

/**
 * StencilCreate component that provides a form to create new stencils.
 *
 * Features:
 * - Automatic stencil number generation based on the last stencil number
 * - Stencil number format: XXXX (where XXXX is an auto-incremented number)
 * - Manage associated library items:
 *   - Add/remove library items using an autocomplete input
 *   - Library items are sorted alphabetically
 *
 * @returns {JSX.Element} A creation form for stencils
 */
export const StencilCreate = () => {
  const { data, isPending, error } = useGetList('stencils', {
    sort: { field: 'stencilNumber', order: 'DESC' },
  })

  if (isPending) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  // Find the last stencil number from existing stencils
  let lastStencilNumber = 0
  data.forEach((item) => {
    const itemNumber = parseInt(item.stencilNumber, 10)
    if (itemNumber > lastStencilNumber) lastStencilNumber = itemNumber
  })

  // Increment the last number and format it
  lastStencilNumber += 1
  const newStencilNumber = lastStencilNumber.toString().padStart(4, '0')

  return (
    <Create redirect='list'>
      <SimpleForm>
        <NumberInput
          source='stencilNumber'
          defaultValue={newStencilNumber}
          required
        />
        <ReferenceArrayInput
          source='lItem_ids'
          reference='library_items'
          sort={{ field: 'lItem', order: 'ASC' }}
        >
          <AutocompleteArrayInput optionText='lItem' />
        </ReferenceArrayInput>
      </SimpleForm>
    </Create>
  )
}
