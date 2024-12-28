import {
  useGetList,
  useGetRecordId,
  useRecordContext,
  useRedirect,
} from 'react-admin'

import { Box, Chip, Badge } from '@mui/material'
import { getVersionColor } from '../utils/versionColors'

export const MkFilesRelatedToStencils = () => {
  const record = useRecordContext() // Get the current record
  const recordId = useGetRecordId() // Get the current record id
  const redirect = useRedirect()

  const {
    data: mkFileStencils,
    isPending,
    error,
  } = useGetList('mk_file_stencils', {
    filter: { stencil_id: recordId },
    meta: { columns: ['*', 'mkFile:mk_files(*)'] },
  })

  if (isPending) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const mkFileData = mkFileStencils
    ? mkFileStencils.map((item) => ({
        id: item.mkFile.id,
        mkFilename: item.mkFile.mkFilename,
        stencilNumber: record.stencilNumber,
        version: item.version,
      }))
    : []
  const sortedMkFileData = mkFileData.sort((a, b) =>
    a.mkFilename.localeCompare(b.mkFilename),
  )

  const handleClick = (event, mkFile) => {
    event.stopPropagation()
    redirect(`/mk_files/${mkFile.id}/show`)
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {sortedMkFileData.map((mkFile) => (
        <Badge
          badgeContent={mkFile.version}
          key={`${mkFile.mkFilename}-${mkFile.stencilNumber}`}
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: getVersionColor(mkFile.version),
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.8rem',
            },
          }}
        >
          <Chip
            key={`${mkFile.mkFilename}-${mkFile.version}`}
            label={`${mkFile.mkFilename}`}
            color='primary'
            onClick={(event) => handleClick(event, mkFile)}
            sx={{
              borderColor: 'primary.main',
              borderRadius: '5px',
              floodopacity: 0.8,
              opacity: 0.8,
              fontWeight: 'bold',
              fontSize: '1.1rem',
            }}
          />
        </Badge>
      ))}
    </Box>
  )
}
