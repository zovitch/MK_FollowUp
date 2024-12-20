import {
  Datagrid,
  InfiniteList,
  TextField,
  ShowButton,
  EditButton,
  ReferenceField,
  ChipField,
  SingleFieldList,
  ArrayField,
} from 'react-admin'

import { FilterQ } from '../FilterQ'

export const MkFileList = () => (
  <InfiniteList filters={<FilterQ />}>
    <Datagrid bulkActionButtons={false}>
      <TextField source='mkFilename' />
      <ArrayField source='stencil_ids'>
        <SingleFieldList>
          <ReferenceField
            reference='stencils'
            source='id'
            label='Stencil Number'
          >
            <ChipField source='stencilNumber' />
          </ReferenceField>
        </SingleFieldList>
      </ArrayField>

      <ShowButton />
      <EditButton />
    </Datagrid>
  </InfiniteList>
)
