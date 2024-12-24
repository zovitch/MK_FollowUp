import {
  ChipField,
  ReferenceArrayField,
  Show,
  SimpleShowLayout,
  SingleFieldList,
} from 'react-admin'

import { Grid, Divider } from '@mui/material'

import MkFilesWithStencil from './MkFilesWithStencil'

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
    </SimpleShowLayout>
    <Grid container spacing={2}>
      <Grid item xs={6}>
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
      <Grid item xs={6}>
        <SimpleShowLayout>
          <MkFilesWithStencil />
        </SimpleShowLayout>
      </Grid>
    </Grid>
  </Show>
)
