/**
 * MkFileShow component for displaying detailed information about an MK file.
 * This component shows the file details along with its associated stencils and library items.
 *
 * @module MkFileShow
 */

import {
  Datagrid,
  Show,
  SimpleShowLayout,
  ArrayField,
  ReferenceField,
  ChipField,
  WithRecord,
  Labeled,
  ReferenceArrayField,
  SingleFieldList,
  PrevNextButtons,
  TopToolbar,
  EditButton,
} from 'react-admin'
import { Badge } from '@mui/material'

import { getVersionColor } from '../utils/versionColors'
import { StencilsCountField } from '../utils/StencilsCountField'

/**
 * Handler for row click events in the stencils datagrid.
 * @param {string} id - The ID of the clicked stencil
 * @returns {string} The URL to navigate to
 */
const handleRowClick = (id) => `/stencils/${id}/show`

/**
 * MkFileShow component that displays detailed information about an MK file.
 *
 * Features:
 * - Navigation between MK files using Prev/Next buttons
 * - Edit button for quick access to edit mode
 * - Display of filename with custom styling
 * - Stencil count display
 * - List of associated stencils with:
 *   - Version badges with color coding
 *   - Clickable stencil numbers
 *   - Associated library items for each stencil
 *
 * @returns {JSX.Element} A detailed view of an MK file
 */
export const MkFileShow = () => (
  <Show
    actions={
      <TopToolbar>
        <PrevNextButtons
          linkType='show'
          sort={{
            field: 'mkFilename',
            order: 'ASC',
          }}
        />
        <EditButton />
      </TopToolbar>
    }
  >
    <SimpleShowLayout>
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

      <Labeled label='Stencils Count'>
        <StencilsCountField />
      </Labeled>

      <ArrayField
        source='stencil_ids'
        sort={{ field: 'stencilNumber', order: 'ASC' }}
        label='Stencils'
      >
        <Datagrid
          bulkActionButtons={false}
          rowClick={(id) => handleRowClick(id)}
        >
          <WithRecord
            render={(record) => (
              <ReferenceField
                reference='stencils'
                source='id'
                label='Stencil Number'
              >
                <Badge
                  badgeContent={record.version}
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: getVersionColor(record.version),
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                    },
                  }}
                >
                  <ChipField
                    source='stencilNumber'
                    sx={{
                      color: 'white',
                      backgroundColor: 'primary.main',
                      '& .MuiChip-label': {
                        color: 'white',
                      },
                    }}
                  />
                </Badge>
              </ReferenceField>
            )}
          />
          <ReferenceField
            reference='stencils'
            source='id'
            label='Library Number'
          >
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
          </ReferenceField>
        </Datagrid>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
)
