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
} from 'react-admin'
import { Badge } from '@mui/material'

import { getVersionColor } from '../utils/versionColors'
import { StencilsCountField } from '../utils/StencilsCountField'

const handleRowClick = (id) => `/stencils/${id}/show`

export const MkFileShow = () => (
  <Show>
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
                      color: 'white', // Set the text color to white
                      backgroundColor: 'primary.main', // Set the background color
                      '& .MuiChip-label': {
                        color: 'white', // Ensure the label text color is white
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
