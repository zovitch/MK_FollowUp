import {
  Datagrid,
  InfiniteList,
  ShowButton,
  EditButton,
  Labeled,
  ChipField,
} from 'react-admin'

import { FilterQ } from '../FilterQ'
import { StencilsRelatedToMkFiles } from './StencilsRelatedToMkFiles'

export const MkFileList = () => (
  <InfiniteList filters={<FilterQ />}>
    <Datagrid bulkActionButtons={false}>
      <ChipField
        source='mkFilename'
        color='primary'
        sx={{
          borderColor: 'primary.main',
          borderRadius: '5px',
          backgroundColor: 'teal',
          floodOpacity: 0.5,
          opacity: 0.5,
          fontWeight: 'bold',
          fontSize: '1.1rem',
        }}
      />
      <Labeled label='Stencils'>
        <StencilsRelatedToMkFiles />
      </Labeled>

      <ShowButton />
      <EditButton />
    </Datagrid>
  </InfiniteList>
)
