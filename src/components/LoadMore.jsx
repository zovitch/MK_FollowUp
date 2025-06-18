/**
 * LoadMore component for implementing infinite scrolling functionality.
 * This component displays a "Load more" button when there are more items to load
 * and handles the loading state appropriately.
 *
 * @module LoadMore
 */

import { Box, Button } from '@mui/material'
import { useInfinitePaginationContext } from 'react-admin'

/**
 * LoadMore component that renders a button to load more items.
 * Uses React Admin's infinite pagination context to manage loading state.
 *
 * @returns {JSX.Element|null} A button to load more items or null if there are no more items
 */
export const LoadMore = () => {
  const { hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfinitePaginationContext()
  return hasNextPage ? (
    <Box mt={1} textAlign='center'>
      <Button disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
        Load more
      </Button>
    </Box>
  ) : null
}
