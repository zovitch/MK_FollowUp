import {
  ChipField,
  Datagrid,
  InfiniteList,
  ArrayField,
  TextField,
  useRecordContext,
  useGetMany,
  ReferenceField,
} from 'react-admin'

import { Stack, Box } from '@mui/material'

import { LoadMore } from '../LoadMore'

const SortedStencilList = () => {
  const record = useRecordContext()

  const {
    data: stencils,
    isPending,
    error,
  } = useGetMany('stencils', {
    ids: record.stencil_ids.map((stencil) => stencil.id),
  })

  if (isPending) return <span>Loading...</span>
  if (error) return <span>Error: {error.message}</span>

  if (!stencils || stencils.length === 0) {
    console.error('stencils is null or empty')
    return null
  }

  // Sort stencils by stencilNumber
  const sortedStencils = stencils.sort((a, b) =>
    a.stencilNumber.localeCompare(b.stencilNumber),
  )

  return (
    <Stack
      direction='row'
      spacing={1}
      sx={{
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
      }}
    >
      {sortedStencils.map((stencil) => (
        <Box key={stencil.id}>
          <ReferenceField
            record={stencil}
            source='id'
            reference='stencils'
            link='show'
          >
            <ChipField record={stencil} source='stencilNumber' />
          </ReferenceField>
        </Box>
      ))}
    </Stack>
  )
}

export const MkFileList = () => {
  return (
    <InfiniteList
      sort={{ field: 'mkFilename', order: 'ASC' }}
      pagination={<LoadMore />}
    >
      <Datagrid bulkActionButtons={false} rowClick='edit'>
        <TextField source='mkFilename' />

        <ArrayField source='stencil_ids' label='Stencils'>
          <SortedStencilList />
        </ArrayField>
      </Datagrid>
    </InfiniteList>
  )
}
