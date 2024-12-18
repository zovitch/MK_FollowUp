import { Filter, SearchInput } from 'react-admin'

export const FilterQ = (props) => {
  return (
    <Filter {...props}>
      <SearchInput source='q' alwaysOn />
    </Filter>
  )
}
