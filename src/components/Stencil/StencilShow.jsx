import { ChipField, Labeled, Show, SimpleShowLayout } from 'react-admin'

import { Divider } from '@mui/material'

import { LibraryItemsRelatedToStencils } from './LibraryItemsRelatedToStencils'
import { MkFilesRelatedToStencils } from '../MkFile/MkFilesRelatedToStencils'

export const StencilShow = () => (
  <Show>
    <SimpleShowLayout>
      <ChipField
        source='stencilNumber'
        options={{ minimumIntegerDigits: 4, useGrouping: false }}
        label='Stencil Number'
        sx={{
          color: 'white', // Set the text color to white
          backgroundColor: 'primary.main', // Set the background color
          '& .MuiChip-label': {
            color: 'white', // Ensure the label text color is white
          },
        }}
      />
      <Divider />
      <Labeled label='Library Items'>
        <LibraryItemsRelatedToStencils />
      </Labeled>
      <Divider />
      <Labeled label='MK Files Using This Stencil'>
        <MkFilesRelatedToStencils />
      </Labeled>
    </SimpleShowLayout>
  </Show>
)
