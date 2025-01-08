import {
  Edit,
  PrevNextButtons,
  ShowButton,
  SimpleForm,
  TextInput,
  TopToolbar,
} from 'react-admin'

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
