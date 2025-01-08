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
