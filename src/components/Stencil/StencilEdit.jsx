import {
  Edit,
  NumberInput,
  ReferenceArrayInput,
  SimpleForm,
  AutocompleteArrayInput,
} from 'react-admin'

export const StencilEdit = () => (
  <Edit>
    <SimpleForm>
      <NumberInput source='stencilNumber' required />
      <ReferenceArrayInput
        reference='library_items'
        source='library_item_ids'
        sort={{ field: 'lItem', order: 'ASC' }}
      >
        <AutocompleteArrayInput optionText='lItem' />
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
)
