/**
 * StencilShow component for displaying detailed information about a stencil.
 * This component shows the stencil details along with its associated library items
 * and MK files that use this stencil.
 *
 * @module StencilShow
 */

import {
  ChipField,
  EditButton,
  Labeled,
  PrevNextButtons,
  ReferenceArrayField,
  Show,
  SimpleShowLayout,
  SingleFieldList,
  TopToolbar,
} from 'react-admin'

import { Grid, Divider } from '@mui/material'

import MkFilesWithStencil from './MkFilesWithStencil'
import { LibraryItemsCountField } from '../utils/LibraryItemsCountField'

/**
 * StencilShow component that displays detailed information about a stencil.
 *
 * Features:
 * - Navigation between stencils using Prev/Next buttons
 * - Edit button for quick access to edit mode
 * - Display of stencil number with custom styling
 * - Two-column layout showing:
 *   - Left column:
 *     - Library items count
 *     - List of associated library items
 *   - Right column:
 *     - List of MK files using this stencil
 *
 * @returns {JSX.Element} A detailed view of a stencil
 */
export const StencilShow = () => (
  <Show
    actions={
      <TopToolbar>
        <PrevNextButtons
          linkType='show'
          sort={{
            field: 'stencilNumber',
            order: 'ASC',
          }}
        />
        <EditButton />
      </TopToolbar>
    }
  >
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
    </SimpleShowLayout>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Grid item xs={12}>
          <SimpleShowLayout direction={'row'}>
            <Labeled label='Library Items Count'>
              <LibraryItemsCountField label='Library Items Count' />
            </Labeled>
          </SimpleShowLayout>
        </Grid>
        <Grid item xs={12}>
          <SimpleShowLayout direction={'row'}>
            <ReferenceArrayField
              source='lItem_ids'
              reference='library_items'
              label='Library Items'
            >
              <SingleFieldList linkType='show'>
                <ChipField
                  source='lItem'
                  variant='outlined'
                  sx={{
                    color: 'secondary.main',
                    borderColor: 'secondary.main',
                    '& .MuiChip-label': {
                      color: 'secondary.main',
                    },
                  }}
                />
              </SingleFieldList>
            </ReferenceArrayField>
          </SimpleShowLayout>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <SimpleShowLayout>
          <MkFilesWithStencil />
        </SimpleShowLayout>
      </Grid>
    </Grid>
  </Show>
)
