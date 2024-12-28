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
          backgroundColor: 'teal',
          floodOpacity: 0.5,
          opacity: 0.5,
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
