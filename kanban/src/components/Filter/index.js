import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
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
    debounce((filter, data) => {
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

  useLayoutEffect(() => {
    if (!filter) return
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
  }, [data])

  useLayoutEffect(() => {
    if (!filter) {
      setFilteredData(null)
      return
    }
    filterData(filter, data)
  }, [filter, data])

  return (
    <form onSubmit={handleSubmit}>
      <input value={filter} onChange={handleChange} />
    </form>
  )
}
