import { SetStateAction } from 'react'

interface props {
  totalCount: number
  currentPage: number
  isLoading: boolean
  setPage: (value: SetStateAction<number>) => void
}

export function Pagination({
  totalCount,
  currentPage,
  isLoading,
  setPage,
}: props) {
  const limit = 10
  const totalPages = Math.ceil(totalCount / limit)

  function handlePageSelect(page: number) {
    setPage(page)
  }

  function onNextPage() {
    setPage((old) => Math.min(old + 1, totalPages))
  }

  function onPreviousPage() {
    setPage((old) => Math.max(old - 1, 0))
  }

  return (
    <div className="mt-16 text-center">
      <div className="join">
        <button
          className="join-item btn-sm"
          disabled={isLoading}
          onClick={() => onPreviousPage()}
        >
          {'<'}
        </button>
        {Array(totalPages)
          .fill(0)
          .map((_, idx) => (
            <button
              key={idx}
              className={`join-item btn-sm ${
                currentPage === idx && 'btn-active bg-primary text-white'
              }`}
              disabled={isLoading}
              onClick={() => handlePageSelect(idx)}
            >
              {idx + 1}
            </button>
          ))}
        <button
          className="join-item btn-sm"
          disabled={isLoading}
          onClick={() => onNextPage()}
        >
          {'>'}
        </button>
      </div>
      <p className="text-sm mt-3">1 - 10 of {totalCount} results</p>
    </div>
  )
}
