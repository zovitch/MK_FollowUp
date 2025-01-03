import { useEffect, useState } from 'react'
import {
  useRecordContext,
  useGetList,
  Datagrid,
  TextField,
  ListContextProvider,
  ChipField,
  WithRecord,
} from 'react-admin'

import { getVersionColor } from '../utils/versionColors'

const MkFilesWithStencil = () => {
  const record = useRecordContext()
  const [mkFiles, setMkFiles] = useState([])

  const {
    data: mkFilesData,
    isLoading,
    error,
  } = useGetList('mk_files', {
    pagination: { page: 1, perPage: 10000 },
    sort: { field: 'mkFilename', order: 'ASC' },
  })

  useEffect(() => {
    if (!isLoading && !error && mkFilesData) {
      const filteredMkFiles = mkFilesData
        .filter((mkFile) =>
          mkFile.stencil_ids?.some((stencil) => stencil.id === record.id),
        )
        .map((mkFile) => {
          const stencil = mkFile.stencil_ids.find(
            (stencil) => stencil.id === record.id,
          )
          return {
            ...mkFile,
            version: stencil ? stencil.version : '',
          }
        })
      setMkFiles(filteredMkFiles)
    }
  }, [mkFilesData, isLoading, error, record.id])

  if (isLoading) return <span>Loading...</span>
  if (error) return <span>Error: {error.message}</span>

  return (
    <ListContextProvider
      value={{
        data: mkFiles,
        ids: mkFiles.map((mkFile) => mkFile.id),
        loaded: true,
        total: mkFiles.length,
      }}
    >
      <Datagrid
        bulkActionButtons={false}
        rowClick={(id) => `/mk_files/${id}/show`}
      >
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

        <WithRecord
          label="Stencil's Version"
          render={(record) => (
            <ChipField
              source='version'
              record={record}
              sx={{
                color: 'white',
                backgroundColor: getVersionColor(record.version),
              }}
            />
          )}
        />
      </Datagrid>
    </ListContextProvider>
  )
}

export default MkFilesWithStencil
