import { ChipField, Labeled, Show, SimpleShowLayout } from 'react-admin'

import { Divider } from '@mui/material'

import { StencilsRelatedToMkFiles } from './StencilsRelatedToMkFiles'

export const MkFileShow = () => (
  <Show>
    <SimpleShowLayout>
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
      <Divider />
      <Labeled label='Stencils'>
        <StencilsRelatedToMkFiles />
      </Labeled>
    </SimpleShowLayout>
  </Show>
)
