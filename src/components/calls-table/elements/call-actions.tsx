interface CallActionProps {
  onAddNote: () => void
}

export function CallActions({ onAddNote }: CallActionProps) {
  function handleAddNote() {
    onAddNote()
  }

  return (
    <td>
      <button
        className={`btn btn-xs rounded-sm capitalize btn-primary`}
        onClick={handleAddNote}
      >
        {' '}
        Add note
      </button>
    </td>
  )
}
