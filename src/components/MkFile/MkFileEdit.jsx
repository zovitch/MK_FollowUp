import {
  Edit,
  SimpleForm,
  TextInput,
  useGetList,
  useGetRecordId,
  useNotify,
  useRedirect,
  useUpdate,
  useCreate,
  useDeleteMany,
} from 'react-admin'
import { useEffect, useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import {
  Autocomplete,
  TextField,
  Box,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material'

const StencilLinker = ({ availableStencils, linkedStencils }) => {
  const { register, setValue, control } = useFormContext()

  useEffect(() => {
    linkedStencils.forEach((stencil, index) => {
      if (stencil && stencil.stencil) {
        register(`stencil_selections[${index}].stencil_id`)
        register(`stencil_selections[${index}].version`)
        setValue(`stencil_selections[${index}].stencil_id`, stencil.stencil.id)
        setValue(`stencil_selections[${index}].version`, stencil.version)
      }
    })
  }, [linkedStencils, register, setValue])

  return (
    <>
      {linkedStencils.map((linkedStencil, index) => (
        <Grid container spacing={2} alignItems='center' key={index}>
          <Grid item xs={5}>
            <Controller
              name={`stencil_selections[${index}].stencil_id`}
              control={control}
              render={({ field }) => {
                const selectedStencil =
                  linkedStencils.find(
                    (option) =>
                      option.stencil && option.stencil.id === field.value,
                  ) || null

                return (
                  <Autocomplete
                    {...field}
                    options={availableStencils}
                    getOptionLabel={(option) =>
                      option.stencilNumber?.toString() || ''
                    }
                    value={selectedStencil ? selectedStencil.stencil : null}
                    onChange={(event, newValue) => {
                      field.onChange(newValue ? newValue.id : null)
                      setValue(
                        `stencil_selections[${index}].stencil_id`,
                        newValue ? newValue.id : null,
                      )
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Stencil'
                        variant='standard'
                      />
                    )}
                  />
                )
              }}
            />
          </Grid>
          <Grid item xs={5}>
            <Controller
              name={`stencil_selections[${index}].version`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Version'
                  variant='standard'
                  onChange={(event) => {
                    field.onChange(event.target.value)
                    setValue(
                      `stencil_selections[${index}].version`,
                      event.target.value,
                    )
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      ))}
    </>
  )
}

export const MkFileEdit = () => {
  const recordId = useGetRecordId()
  const notify = useNotify()
  const redirect = useRedirect()
  const [update] = useUpdate()
  const [create] = useCreate()
  const [deleteMany] = useDeleteMany()

  const {
    data: allStencils,
    isPending: isPendingAllStencils,
    error: errorAllStencils,
  } = useGetList('stencils', { sort: { field: 'stencilNumber', order: 'ASC' } })

  const {
    data: linkedStencilsData,
    isPending: isPendingLinkedStencils,
    error: errorLinkedStencils,
  } = useGetList('mk_file_stencils', {
    filter: { mk_file_id: recordId },
    meta: { columns: ['*', 'stencil:stencils(*)'] },
  })

  if (isPendingAllStencils || isPendingLinkedStencils) {
    return <CircularProgress />
  }

  if (errorAllStencils || errorLinkedStencils) {
    return <Alert severity='error'>Error loading data</Alert>
  }

  const sortedLinkedStencils = linkedStencilsData.sort(
    (a, b) => a.stencil.stencilNumber - b.stencil.stencilNumber,
  )

  const handleSave = async (data) => {
    try {
      // Update the mk_file
      await update('mk_files', {
        id: recordId,
        data: { mkFilename: data.mkFilename },
      })

      // Determine items to delete
      const newItemIds = data.stencil_selections.map(
        (selection) => selection.stencil_id,
      )
      const itemsToDelete = linkedStencilsData.filter(
        (item) => item.stencil && !newItemIds.includes(item.stencil.id),
      )

      // Delete existing mk_file_stencils
      await deleteMany('mk_file_stencils', {
        ids: itemsToDelete.map((item) => item.id),
      })

      // Create new mk_file_stencils
      await Promise.all(
        data.stencil_selections.map((selection) =>
          create('mk_file_stencils', {
            data: {
              mk_file_id: recordId,
              stencil_id: selection.stencil_id,
              version: selection.version,
            },
          }),
        ),
      )

      notify('MK File updated successfully', { type: 'success' })
      redirect('list', 'mk_files')
    } catch (error) {
      notify('Error updating MK File', { type: 'warning' })
    }
  }

  return (
    <Edit>
      <SimpleForm save={handleSave}>
        <TextInput source='mkFilename' />
        <StencilLinker
          availableStencils={allStencils}
          linkedStencils={sortedLinkedStencils || []}
        />
      </SimpleForm>
    </Edit>
  )
}
