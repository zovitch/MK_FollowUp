import { useGetList, useRecordContext, Link } from 'react-admin'
import { useEffect, useState } from 'react'
import { Chip, Stack } from '@mui/material'

const MkFileStencilShow = () => {
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
  } = useGetList('stencils', {
    filter: { id: stencilIds },
    sort: { field: 'stencilNumber', order: 'ASC' },
  })

  useEffect(() => {
    if (
      !isPendingStencils &&
      !errorStencils &&
      stencilData &&
      mkFiles2Stencils
    ) {
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
  const handleChipClick = (event) => {
    event.stopPropagation()
  }
  return (
    <Stack direction='row' spacing={1}>
      {stencils.slice(0, 10).map((stencil) => (
        <Link
          key={stencil.id}
          to={`/stencils/${stencil.id}/show`}
          style={{ textDecoration: 'none' }}
          onClick={handleChipClick}
        >
          <Chip
            label={`${stencil.stencilNumber} ${stencil.version}`}
            sx={{
              color: 'primary.main',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          />
        </Link>
      ))}
    </Stack>
  )
}

export default MkFileStencilShow
