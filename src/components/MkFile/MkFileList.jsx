import {
  Datagrid,
  InfiniteList,
  TextField,
  ShowButton,
  EditButton,
} from 'react-admin'
import MkFileStencilShow from './MkFileStencilShow'

export const MkFileList = () => (
  <InfiniteList>
    <Datagrid bulkActionButtons={false}>
      <TextField source='mkFilename' />
      <MkFileStencilShow />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </InfiniteList>
)
