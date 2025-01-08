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
