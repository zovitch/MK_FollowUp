import {
  Datagrid,
  InfiniteList,
  TextField,
  ShowButton,
  EditButton,
} from 'react-admin'
import MkFileStencilShow from './MkFileStencilShow'
import { FilterQ } from '../FilterQ'

export const MkFileList = () => (
  <InfiniteList filters={<FilterQ />}>
    <Datagrid bulkActionButtons={false}>
      <TextField source='mkFilename' />
      <MkFileStencilShow />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </InfiniteList>
)
