import {
  AutocompleteArrayInput,
  Edit,
  ReferenceArrayInput,
  SimpleForm,
  TextInput,
} from 'react-admin'

export const StencilEdit = () => {
  return (
    <Edit>
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
