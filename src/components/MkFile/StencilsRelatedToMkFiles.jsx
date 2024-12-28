import { useGetList, useGetRecordId, useRedirect } from 'react-admin'
import { Box, Chip, Badge } from '@mui/material'

import { getVersionColor } from '../utils/versionColors'

export const StencilsRelatedToMkFiles = () => {
  const recordId = useGetRecordId()
  const redirect = useRedirect()

  const {
    data: mkFileStencils,
    isPending,
    error,
  } = useGetList('mk_file_stencils', {
    filter: { mk_file_id: recordId },
    meta: { columns: ['*', 'stencil:stencils(*)'] },
  })

  if (isPending) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const stencilData = mkFileStencils
    ? mkFileStencils.map((item) => ({
        id: item.stencil.id,
        stencilNumber: item.stencil.stencilNumber,
        version: item.version,
      }))
    : []
  const sortedStencilData = stencilData.sort(
    (a, b) => a.stencilNumber - b.stencilNumber,
  )

  const handleClick = (event, stencil) => {
    event.stopPropagation()
    redirect(`/stencils/${stencil.id}/show`)
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {sortedStencilData.map((stencil) => (
        <Badge
          badgeContent={stencil.version}
          key={stencil.stencilNumber}
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: getVersionColor(stencil.version),
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.8rem',
            },
          }}
        >
          <Chip
            key={stencil.stencilNumber}
            label={`${stencil.stencilNumber}`}
            color='primary'
            onClick={(event) => handleClick(event, stencil)}
          />
        </Badge>
      ))}
    </Box>
  )
}
