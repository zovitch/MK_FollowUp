import { useEffect, useState } from 'react'
import {
  useRecordContext,
  useGetList,
  Datagrid,
  ListContextProvider,
  ChipField,
} from 'react-admin'

const StencilsWithLItem = () => {
  const record = useRecordContext()
  const [stencils, setStencils] = useState([])

  const {
    data: stencilData,
    isLoading,
    error,
  } = useGetList('stencils', {
    pagination: { page: 1, perPage: 10000 },
    sort: { field: 'stencilNumber', order: 'ASC' },
  })

  useEffect(() => {
    if (!isLoading && !error && stencilData) {
      const filteredStencils = stencilData
        .filter((stencil) => stencil.lItem_ids?.includes(record.id))
        .sort((a, b) =>
          String(a.stencilNumber).localeCompare(String(b.stencilNumber)),
        ) // Ensure stencilNumber is a string
      setStencils(filteredStencils)
    }
  }, [stencilData, isLoading, error, record.id])

  if (isLoading) return <span>Loading...</span>
  if (error) return <span>Error: {error.message}</span>

  return (
    <ListContextProvider
      value={{
        data: stencils,
        ids: stencils.map((stencil) => stencil.id),
        loaded: true,
        total: stencils.length,
      }}
    >
      <Datagrid
        bulkActionButtons={false}
        rowClick={(id) => `/stencils/${id}/show`}
      >
        <ChipField
          source='stencilNumber'
          label='Stencil Number'
          sx={{
            color: 'white', // Set the text color to white
            backgroundColor: 'primary.main', // Set the background color
            '& .MuiChip-label': {
              color: 'white', // Ensure the label text color is white
            },
          }}
        />
      </Datagrid>
    </ListContextProvider>
  )
}

export default StencilsWithLItem
