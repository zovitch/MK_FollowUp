import { Show, SimpleShowLayout, TextField } from 'react-admin'

export const Library_itemShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source='lItem' />
      <TextField source='description' />
    </SimpleShowLayout>
  </Show>
)
