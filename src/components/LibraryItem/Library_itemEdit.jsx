import { Edit, SimpleForm, TextInput } from 'react-admin'

export const Library_itemEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source='lItem' required />
      <TextInput source='description' />
    </SimpleForm>
  </Edit>
)
