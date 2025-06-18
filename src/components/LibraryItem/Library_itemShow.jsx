/**
 * Library_itemShow component for displaying detailed information about a library item.
 * This component shows the library item details along with its associated stencils.
 *
 * @module Library_itemShow
 */

import {
  ChipField,
  EditButton,
  PrevNextButtons,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
} from 'react-admin'
import { Divider } from '@mui/material'
import StencilsWithLItem from './StencilsWithLItem'

/**
 * Library_itemShow component that displays detailed information about a library item.
 *
 * Features:
 * - Navigation between library items using Prev/Next buttons
 * - Edit button for quick access to edit mode
 * - Display of library item identifier with custom styling
 * - Shows item description
 * - Lists associated stencils with their details
 *
 * @returns {JSX.Element} A detailed view of a library item
 */
export const Library_itemShow = () => (
  <Show
    actions={
      <TopToolbar>
        <PrevNextButtons
          linkType='show'
          sort={{
            field: 'lItem',
            order: 'ASC',
          }}
        />
        <EditButton />
      </TopToolbar>
    }
  >
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
      <Divider />
      <TextField source='description' />
      <StencilsWithLItem />
    </SimpleShowLayout>
  </Show>
)
