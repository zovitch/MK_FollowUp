import { Edit, SimpleForm, TextInput } from 'react-admin'
import { EditLibraryItemsRelatedToStencils } from './EditLibraryItemsRelatedToStencils'
import { LibraryItemsRelatedToStencils } from './LibraryItemsRelatedToStencils'

export const StencilEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source='stencilNumber' />
        {/* <LibraryItemsRelatedToStencils /> */}

        <EditLibraryItemsRelatedToStencils />

        {/* <ReferenceArrayInput
          source='lItem_ids'
          reference='library_items'
          sort={{ field: 'lItem', order: 'ASC' }}
        >
          <AutocompleteArrayInput optionText='lItem' />
        </ReferenceArrayInput> */}
      </SimpleForm>
    </Edit>
  )
}
