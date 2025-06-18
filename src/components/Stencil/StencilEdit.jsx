/**
 * StencilEdit component for editing stencil details.
 * This component provides a form to edit stencil information and manage associated library items.
 *
 * @module StencilEdit
 */

import {
  AutocompleteArrayInput,
  Edit,
  PrevNextButtons,
  ReferenceArrayInput,
  ShowButton,
  SimpleForm,
  TextInput,
  TopToolbar,
} from 'react-admin'

/**
 * StencilEdit component that provides a form to edit stencil details.
 *
 * Features:
 * - Navigation between stencils using Prev/Next buttons
 * - Show button for quick access to show mode
 * - Edit stencil number
 * - Manage associated library items:
 *   - Add/remove library items using an autocomplete input
 *   - Library items are sorted alphabetically
 *
 * @returns {JSX.Element} An edit form for stencils
 */
export const StencilEdit = () => {
  return (
    <Edit
      actions={
        <TopToolbar>
          <PrevNextButtons
            sort={{
              field: 'stencilNumber',
              order: 'ASC',
            }}
          />
          <ShowButton />
        </TopToolbar>
      }
    >
      <SimpleForm>
        <TextInput source='stencilNumber' />
        <ReferenceArrayInput
          source='lItem_ids'
          reference='library_items'
          sort={{ field: 'lItem', order: 'ASC' }}
        >
          <AutocompleteArrayInput
            optionText='lItem'
            // blurOnSelect={false}
            // disableCloseOnSelect
          />
        </ReferenceArrayInput>
      </SimpleForm>
    </Edit>
  )
}
