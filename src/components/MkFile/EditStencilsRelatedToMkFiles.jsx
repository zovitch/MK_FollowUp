import { useEffect, useState } from 'react'
import { useGetRecordId, useGetList } from 'react-admin'
import { useFormContext } from 'react-hook-form'
import { Autocomplete, TextField } from '@mui/material/'

export const EditStencilsRelatedToMkFiles = () => {
  const [selectedStencils, setSelectedStencils] = useState([])
  const { setValue, register } = useFormContext()
  const recordId = useGetRecordId()

  const {
    data: mkFileStencils,
    isPending: isPendingMkFileStencils,
    error: errorMkFileStencils,
  } = useGetList('mk_file_stencils', {
    filter: { mk_file_id: recordId },
    meta: { columns: ['*', 'stencil:stencils(*)'] },
  })

  const {
    data: allStencils,
    isPending: isPendingAllStencils,
    error: errorAllStencils,
  } = useGetList('stencils', {
    pagination: { page: 1, perPage: 5000 },
    sort: { field: 'stencilNumber', order: 'ASC' },
  })

  useEffect(() => {
    register('stencil_ids')
    if (mkFileStencils) {
      const sortedStencils = mkFileStencils
        .map((stencil) => stencil.stencil)
        .sort((a, b) => a.stencilNumber.localeCompare(b.stencilNumber))
      setSelectedStencils(sortedStencils)
      setValue(
        'stencil_ids',
        sortedStencils.map((stencil) => stencil.id),
      )
    }
  }, [mkFileStencils, setValue, register])

  if (isPendingMkFileStencils || isPendingAllStencils) return <p>Loading...</p>
  if (errorMkFileStencils || errorAllStencils)
    return (
      <>
        Error:{' '}
        {errorMkFileStencils?.message ||
          errorAllStencils?.message ||
          'Unknown error'}
      </>
    )

  // Filter out selected stencils from the list of all stencils
  const availableStencils = allStencils.filter(
    (stencil) =>
      !selectedStencils.some(
        (selectedStencil) => selectedStencil.id === stencil.id,
      ),
  )

  return (
    <>
      <Autocomplete
        multiple
        options={availableStencils}
        getOptionLabel={(stencil) => stencil.stencilNumber}
        getOptionSelected={(option, value) => option.id === value.id}
        value={selectedStencils}
        onChange={(_, value) => {
          setSelectedStencils(value)
          setValue(
            'stencil_ids',
            value.map((stencil) => stencil.id),
          )
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Stencils'
            placeholder='Select stencils'
          />
        )}
      />
    </>
  )
}
