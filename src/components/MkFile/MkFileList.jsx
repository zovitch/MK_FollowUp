/**
 * MkFileList component for displaying a list of MK files.
 * This component implements an infinite scrolling list with filtering and sorting capabilities.
 * Each MK file entry displays its filename, stencil count, and associated stencils.
 *
 * @module MkFileList
 */

import {
  Datagrid,
  InfiniteList,
  ShowButton,
  EditButton,
  ReferenceField,
  ChipField,
  SingleFieldList,
  ArrayField,
} from 'react-admin'

import { FilterQ } from '../FilterQ'
import { StencilsCountField } from '../utils/StencilsCountField'

/**
 * MkFileList component that renders a list of MK files with infinite scrolling.
 *
 * Features:
 * - Infinite scrolling with a search filter
 * - Sorted by filename in ascending order
 * - Displays filename, stencil count, and associated stencils
 * - Show and Edit buttons for each entry
 *
 * @returns {JSX.Element} A list view of MK files
 */
export const MkFileList = () => (
  <InfiniteList
    filters={<FilterQ />}
    sort={{ field: 'mkFilename', order: 'ASC' }}
  >
    <Datagrid bulkActionButtons={false}>
      <ChipField
        source='mkFilename'
        color='primary'
        sx={{
          borderColor: 'primary.main',
          borderRadius: '5px',
          floodopacity: 0.8,
          opacity: 0.8,
          fontWeight: 'bold',
          fontSize: '1.1rem',
        }}
      />
      <StencilsCountField label='Stencils Count' />
      <ArrayField source='stencil_ids' label='Stencils'>
        <SingleFieldList linkType='show'>
          <ReferenceField reference='stencils' source='id'>
            <ChipField
              source='stencilNumber'
              sx={{
                color: 'white', // Set the text color to white
                backgroundColor: 'primary.main', // Set the background color
                '& .MuiChip-label': {
                  color: 'white', // Ensure the label text color is white
                },
              }}
            />
          </ReferenceField>
        </SingleFieldList>
      </ArrayField>
      <ShowButton />
      <EditButton />
    </Datagrid>
  </InfiniteList>
)
