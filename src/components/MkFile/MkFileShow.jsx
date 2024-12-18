import { Show, SimpleShowLayout, TextField } from 'react-admin'

import MkFileStencilShow from './MkFileStencilShow'

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
      <MkFileStencilShow />
    </SimpleShowLayout>
  </Show>
)
