/**
 * Library_itemList component for displaying a list of library items.
 * This component implements an infinite scrolling list with filtering and sorting capabilities.
 * Each library item entry displays its identifier and description.
 *
 * @module Library_itemList
 */

import {
  ChipField,
  Datagrid,
  EditButton,
  InfiniteList,
  ShowButton,
  TextField,
} from 'react-admin'

import { FilterQ } from '../FilterQ'

/**
 * Library_itemList component that renders a list of library items with infinite scrolling.
 *
 * Features:
 * - Infinite scrolling with a search filter
 * - Sorted by library item identifier in ascending order
 * - Displays library item identifier with custom styling
 * - Shows item description
 * - Show and Edit buttons for each entry
 * - Clickable rows that navigate to the show view
 *
 * @returns {JSX.Element} A list view of library items
 */
export const Library_itemList = () => (
  <InfiniteList sort={{ field: 'lItem', order: 'ASC' }} filters={<FilterQ />}>
    <Datagrid bulkActionButtons={false} rowClick='show'>
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
      <ShowButton />
      <EditButton />
    </Datagrid>
  </InfiniteList>
)
