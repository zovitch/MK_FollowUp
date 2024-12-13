import {
  Create,
  AutocompleteArrayInput,
  SimpleForm,
  NumberInput,
  ReferenceArrayInput,
  useGetList,
} from 'react-admin'

export const StencilCreate = () => {
  const { data, isPending, error } = useGetList('stencils', {
    sort: { field: 'stencilNumber', order: 'DESC' },
  })

  if (isPending) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  // search in the data for the last item, knowing that they are formed as xxxx with x being a number
  let lastStencilNumber = 0
  data.forEach((item) => {
    const itemNumber = parseInt(item.stencilNumber, 10) // Ensure base 10 parsing
    if (itemNumber > lastStencilNumber) lastStencilNumber = itemNumber
  })

  // increment the last stencil to get the new stencil number
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
          reference='library_items'
          source='library_item_ids'
          sort={{ field: 'lItem', order: 'ASC' }}
        >
          <AutocompleteArrayInput optionText='lItem' />
        </ReferenceArrayInput>
      </SimpleForm>
    </Create>
  )
}
