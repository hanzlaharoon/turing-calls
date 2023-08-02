import { useState } from 'react'

interface CallStatusProps {
  isArchive: boolean
  isLoading: boolean
  onArchive: () => void
}

export function CallStatus({
  isArchive,
  isLoading,
  onArchive,
}: CallStatusProps) {
  const [isArchived, setIsArchived] = useState(isArchive)

  function handleArchiveClick() {
    onArchive()
    setIsArchived((old) => !old)
  }

  return (
    <td>
      <button
        className={`btn btn-xs rounded-sm capitalize${
          isArchived
            ? 'text-teal-400 bg-cyan-50 hover:bg-cyan-100'
            : 'text-neutral'
        }`}
        onClick={handleArchiveClick}
        disabled={isLoading}
      >
        {isArchived ? 'Archived' : 'Unarchive'}
      </button>
    </td>
  )
}
