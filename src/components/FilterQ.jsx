/**
 * FilterQ component for implementing a search filter in React Admin.
 * This component provides a search input field that is always visible
 * and filters the list based on the search query.
 *
 * @module FilterQ
 */

import { Filter, SearchInput } from 'react-admin'

/**
 * FilterQ component that renders a search input filter.
 *
 * @param {Object} props - Component props passed to the Filter component
 * @returns {JSX.Element} A filter component with a search input
 */
export const FilterQ = (props) => {
  return (
    <Filter {...props}>
      <SearchInput source='q' alwaysOn />
    </Filter>
  )
}
