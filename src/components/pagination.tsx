import { CaretLeft, CaretRight } from 'phosphor-react'

type PaginationProps = {
  pagination: {
    range: (number | 'dots')[]
    active: number
    setPage: (pageNumber: number) => void
    next: () => void
    previous: () => void
    first: () => void
    last: () => void
  }
}

export function Pagination({ pagination }: PaginationProps) {
  return (
    <div className="w-full items-center justify-center flex pb-8">
      <button className="bg-transparent" onClick={() => pagination.previous()}>
        <CaretLeft size={20} color="#00B5CC" weight="bold" className="mr-3" />
      </button>
      <div className="flex gap-2">
        {pagination.range.map((page, index) => {
          if (page === 'dots') {
            return (
              <span key={`page-${index}`} className="text-white text-xl">
                ...
              </span>
            )
          }

          return (
            <button
              onClick={() => pagination.setPage(page)}
              key={`page-${index}`}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-brand bg-app font-bold text-base border border-brand transition-all duration-200 hover:bg-brand hover:text-app"
            >
              {page}
            </button>
          )
        })}
      </div>
      <button className="bg-transparent" onClick={() => pagination.next()}>
        <CaretRight size={20} color="#00B5CC" weight="bold" className="ml-3" />
      </button>
    </div>
  )
}
