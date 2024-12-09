import {
  Datagrid,
  InfiniteList,
  ReferenceManyField,
  ReferenceOneField,
  SingleFieldList,
  TextField,
} from 'react-admin'

import { LoadMore } from '../LoadMore'

export const MkFileList = () => (
  <InfiniteList
    sort={{ field: 'mkFilename', order: 'ASC' }}
    pagination={<LoadMore />}
  >
    <Datagrid bulkActionButtons={false}>
      <TextField source='mkFilename' />
      <ReferenceManyField
        reference='mk_files2stencils'
        target='mk_file_id'
        label='Stencils Numbers'
      >
        <SingleFieldList>
          <ReferenceOneField
            reference='stencils'
            target='id'
            source='stencil_id'
          >
            <TextField source='stencilNumber' />
          </ReferenceOneField>
          <TextField source='stencilVersion' />
        </SingleFieldList>
      </ReferenceManyField>
    </Datagrid>
  </InfiniteList>
)
