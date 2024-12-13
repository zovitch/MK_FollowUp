import { Create, SimpleForm, TextInput, useGetList } from 'react-admin'

export const Library_itemCreate = () => {
  const { data, isPending, error } = useGetList('library_items', {
    sort: { field: 'lItem', order: 'DESC' },
  })

  if (isPending) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  // search in the data for the last item, knowing that they are formed as Lxxxx with x being a number
  let lastItem = 0
  data.forEach((item) => {
    const itemNumber = parseInt(item.lItem.slice(1), 10) // Ensure base 10 parsing
    if (itemNumber > lastItem) lastItem = itemNumber
  })

  // increment the last item number to get the new item number
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
