/**
 * Library_itemCreate component for creating new library items.
 * This component provides a form to create new library items with automatic identifier generation.
 *
 * @module Library_itemCreate
 */

import { Create, SimpleForm, TextInput, useGetList } from 'react-admin'

/**
 * Library_itemCreate component that provides a form to create new library items.
 *
 * Features:
 * - Automatic library item identifier generation based on the last item number
 * - Identifier format: LXXXX (where XXXX is an auto-incremented number)
 * - Edit item description
 * - Redirects to show view after creation
 *
 * @returns {JSX.Element} A creation form for library items
 */
export const Library_itemCreate = () => {
  const { data, isPending, error } = useGetList('library_items', {
    sort: { field: 'lItem', order: 'DESC' },
  })

  if (isPending) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  // Find the last library item number from existing items
  let lastItem = 0
  data.forEach((item) => {
    const itemNumber = parseInt(item.lItem.slice(1), 10)
    if (itemNumber > lastItem) lastItem = itemNumber
  })

  // Increment the last number and format it
  lastItem += 1
  const newItem = 'L' + lastItem.toString().padStart(4, '0')

  return (
    <Create redirect='show'>
      <SimpleForm>
        <TextInput source='lItem' defaultValue={newItem} required />
        <TextInput source='description' />
      </SimpleForm>
    </Create>
  )
}
