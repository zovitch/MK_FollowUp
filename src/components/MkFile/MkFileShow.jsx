import {
  Datagrid,
  Show,
  SimpleShowLayout,
  TextField,
  useGetList,
  useGetMany,
  useRecordContext,
} from 'react-admin'
import { useEffect, useState } from 'react'

const StencilList = () => {
  const record = useRecordContext()
  const [stencilIds, setStencilIds] = useState([])
  const [stencils, setStencils] = useState([])

  const {
    data: mkFiles2Stencils,
    isPending: isPendingMkFiles2Stencils,
    error: errorMkFiles2Stencils,
  } = useGetList('mk_files2stencils', {
    filter: { mk_file_id: record.id },
  })

  useEffect(() => {
    if (
      !isPendingMkFiles2Stencils &&
      !errorMkFiles2Stencils &&
      mkFiles2Stencils
    ) {
      const ids = mkFiles2Stencils.map((item) => item.stencil_id)
      setStencilIds(ids)
    }
  }, [mkFiles2Stencils, isPendingMkFiles2Stencils, errorMkFiles2Stencils])

  const {
    data: stencilData,
    isPending: isPendingStencils,
    error: errorStencils,
  } = useGetMany('stencils', { ids: stencilIds })

  useEffect(() => {
    if (!isPendingStencils && !errorStencils && stencilData) {
      // Merge the version information from mkFiles2Stencils into stencilData
      const stencilsWithVersion = stencilData.map((stencil) => {
        const matchingStencil = mkFiles2Stencils.find(
          (item) => item.stencil_id === stencil.id,
        )
        return {
          ...stencil,
          version: matchingStencil ? matchingStencil.stencilVersion : 'N/A',
        }
      })
      setStencils(stencilsWithVersion)
    }
  }, [stencilData, mkFiles2Stencils, isPendingStencils, errorStencils])

  if (isPendingMkFiles2Stencils || isPendingStencils)
    return <span>Loading...</span>
  if (errorMkFiles2Stencils || errorStencils)
    return (
      <span>
        Error: {errorMkFiles2Stencils?.message || errorStencils?.message}
      </span>
    )

  const handleRowClick = (id) => `/stencils/${id}/show`

  return (
    <Datagrid
      bulkActionButtons={false}
      data={stencils}
      size='small'
      rowClick={handleRowClick}
      sx={{
        '& .RaDatagrid-rowOdd': {
          backgroundColor: '#fafafa',
        },
        '& .column-stencilNumber': { flex: '0 1 auto' },
        '& .column-version': { flex: '1 1 0' },
      }}
    >
      <TextField source='stencilNumber' label='Stencil Number' />
      <TextField source='version' label='Version' />
    </Datagrid>
  )
}

export const MkFileShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField
        source='mkFilename'
        sx={{
          fontSize: 24,
          fontWeight: 'bold',
          color: 'primary.main',
        }}
      />
      <StencilList />
    </SimpleShowLayout>
  </Show>
)
