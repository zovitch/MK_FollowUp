import {
  Datagrid,
  InfiniteList,
  ShowButton,
  EditButton,
  Labeled,
  ChipField,
  SearchInput,
} from 'react-admin'

import { StencilsRelatedToMkFiles } from './StencilsRelatedToMkFiles'

const mkfilters = [<SearchInput key={1} source='mkFilename@ilike' alwaysOn />]

export const MkFileList = () => (
  <InfiniteList filters={mkfilters}>
    <Datagrid bulkActionButtons={false}>
      <ChipField
        source='mkFilename'
        color='primary'
        sx={{
          borderColor: 'primary.main',
          borderRadius: '5px',
          floodopacity: 0.8,
          opacity: 0.8,
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
