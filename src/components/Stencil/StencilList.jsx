/**
 * StencilList component for displaying a list of stencils.
 * This component implements an infinite scrolling list with filtering and sorting capabilities.
 * Each stencil entry displays its number, library items count, and associated library items.
 *
 * @module StencilList
 */

import {
  InfiniteList,
  ShowButton,
  Datagrid,
  EditButton,
  ReferenceArrayField,
  ChipField,
  SingleFieldList,
} from 'react-admin'

import { FilterQ } from '../FilterQ'
import { LibraryItemsCountField } from '../utils/LibraryItemsCountField'

/**
 * StencilList component that renders a list of stencils with infinite scrolling.
 *
 * Features:
 * - Infinite scrolling with a search filter
 * - Sorted by stencil number in ascending order
 * - Displays stencil number with custom styling
 * - Shows library items count
 * - Lists associated library items with custom styling
 * - Show and Edit buttons for each entry
 *
 * @returns {JSX.Element} A list view of stencils
 */
export const StencilList = () => (
  <InfiniteList
    sort={{ field: 'stencilNumber', order: 'ASC' }}
    filters={<FilterQ />}
  >
    <Datagrid bulkActionButtons={false}>
      <ChipField
        source='stencilNumber'
        options={{ minimumIntegerDigits: 4, useGrouping: false }}
        sx={{
          color: 'white', // Set the text color to white
          backgroundColor: 'primary.main', // Set the background color
          '& .MuiChip-label': {
            color: 'white', // Ensure the label text color is white
          },
        }}
      />
      <LibraryItemsCountField label='Library Items Count' />
      <ReferenceArrayField
        reference='library_items'
        source='lItem_ids'
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
      <ShowButton />
      <EditButton />
    </Datagrid>
  </InfiniteList>
)
