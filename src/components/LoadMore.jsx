import { Box, Button } from '@mui/material'
import { useInfinitePaginationContext } from 'react-admin'

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
