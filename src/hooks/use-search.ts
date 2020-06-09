import { useState, useEffect } from 'react'

function useSearch(stocks, searchStocks) {
  const [search, setSearch] = useState()

  const [filteredStocks, setFilteredStocks] = useState([])

  useEffect(() => {
    if (!search) {
      setFilteredStocks([])
    }

    const filtered = searchStocks(stocks)
    setFilteredStocks(filtered)
  }, [search])

  return {
    search,
    setSearch,
    filteredStocks,
    setFilteredStocks,
  }
}

export default useSearch