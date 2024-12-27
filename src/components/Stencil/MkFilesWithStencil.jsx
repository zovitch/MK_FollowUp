import { useEffect, useState } from 'react'
import {
  useRecordContext,
  useGetList,
  Datagrid,
  TextField,
  ListContextProvider,
} from 'react-admin'

const MkFilesWithStencil = () => {
  const record = useRecordContext()
  const [mkFiles, setMkFiles] = useState([])

  const { data: mkFilesData, isLoading, error } = useGetList('mk_files')

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
        <TextField source='mkFilename' label='MK Filename' />
        <TextField source='version' label="Stencil's Version" />
      </Datagrid>
    </ListContextProvider>
  )
}

export default MkFilesWithStencil
