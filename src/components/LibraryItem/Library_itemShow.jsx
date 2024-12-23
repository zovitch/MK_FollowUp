import { ChipField, Show, SimpleShowLayout, TextField } from 'react-admin'
import { Grid, Divider } from '@mui/material'
import StencilsWithLItem from './StencilsWithLItem'

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
      <Divider />
    </SimpleShowLayout>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <SimpleShowLayout direction={'row'}>
          <TextField source='description' />
        </SimpleShowLayout>
      </Grid>
      <Grid item xs={6}>
        <SimpleShowLayout>
          <StencilsWithLItem />
        </SimpleShowLayout>
      </Grid>
    </Grid>
  </Show>
)
