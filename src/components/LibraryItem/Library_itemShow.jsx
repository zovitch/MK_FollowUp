import {
  ChipField,
  Labeled,
  Show,
  SimpleShowLayout,
  TextField,
} from 'react-admin'
import { Divider } from '@mui/material'
import { StencilsRelatedToLibraryItem } from './StencilsRelatedToLibraryItem'

export const Library_itemShow = () => (
  <Show>
    <SimpleShowLayout>
      <ChipField
        source='lItem'
        label='Library Item'
        variant='outlined'
        sx={{
          color: 'secondary.main',
          borderColor: 'secondary.main',
          '& .MuiChip-label': {
            color: 'secondary.main',
          },
        }}
      />
      <TextField source='description' />
      <Divider />

      <Labeled label='Stencils using this Library Item'>
        <StencilsRelatedToLibraryItem />
      </Labeled>
    </SimpleShowLayout>
  </Show>
)
