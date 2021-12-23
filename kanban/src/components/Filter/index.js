import { useCallback, useEffect, useState } from 'react'
import { debounce } from '../../helpers/utils'

const formatted = (string) =>
  string.toLowerCase().replace(/\s+/g, ' ').split(' ')

export const Filter = ({ data, setFilteredData }) => {
  const [filter, setFilter] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const handleChange = (event) => {
    setFilter(event.target.value)
  }
  const filterData = useCallback(
    debounce((filter) => {
      if (!data) return
      setFilteredData(
        data.map((board) =>
          board.filter((issue) =>
            formatted(filter).every((searchWord) =>
              formatted(issue.content).some((word) => word.includes(searchWord))
            )
          )
        )
      )
    }, 500),
    []
  )

  useEffect(() => {
    filterData(filter)
  }, [filter])

  return (
    <form onSubmit={handleSubmit}>
      <input value={filter} onChange={handleChange} />
    </form>
  )
}
