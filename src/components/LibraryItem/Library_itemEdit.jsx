/**
 * Library_itemEdit component for editing library item details.
 * This component provides a form to edit library item information.
 *
 * @module Library_itemEdit
 */

import {
  Edit,
  PrevNextButtons,
  ShowButton,
  SimpleForm,
  TextInput,
  TopToolbar,
} from 'react-admin'

/**
 * Library_itemEdit component that provides a form to edit library item details.
 *
 * Features:
 * - Navigation between library items using Prev/Next buttons
 * - Show button for quick access to show mode
 * - Edit library item identifier (required)
 * - Edit item description
 *
 * @returns {JSX.Element} An edit form for library items
 */
export const Library_itemEdit = () => (
  <Edit
    actions={
      <TopToolbar>
        <PrevNextButtons
          sort={{
            field: 'lItem',
            order: 'ASC',
          }}
        />
        <ShowButton />
      </TopToolbar>
    }
  >
    <SimpleForm>
      <TextInput source='lItem' required />
      <TextInput source='description' />
    </SimpleForm>
  </Edit>
)
