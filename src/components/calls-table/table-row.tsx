import { useArchiveCallMutation } from '@/queries'
import { Call } from '@/types'
import { formatDate, formatSeconds } from '@/utils'
import { AddNoteModal } from '.'
import { CallStatus } from './call-status'

export function CallType({ text }: { text: Call['call_type'] }) {
  function getClassnames() {
    if (text === 'missed') return 'text-error'
    else if (text === 'answered') return 'text-success'
    else return 'text-primary'
  }

  return <td className={`capitalize ${getClassnames()}`}>{text}</td>
}

export function CallDuration({ duration }: { duration: number }) {
  return (
    <td>
      <p>{formatSeconds(duration)}</p>
      <p className="text-primary">({duration} seconds)</p>
    </td>
  )
}

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

interface props {
  call: Call
}

export function CallRecordRow({ call }: props) {
  const {
    call_type,
    direction,
    from,
    to,
    via,
    is_archived,
    duration,
    created_at,
    id,
  } = call

  const { mutate: archiveCall, isLoading: isArchiving } =
    useArchiveCallMutation()

  function onArchiveCall() {
    archiveCall(id)
  }

  function handleAddNote() {
    const noteId = 'notes_modal_' + id
    //@ts-ignore
    window[noteId]?.showModal()
  }

  return (
    <>
      <tr className="border-x-2 border-b-2 border-slate-300">
        <CallType text={call_type} />
        <td className="text-primary capitalize">{direction}</td>
        <CallDuration duration={duration} />
        <td>{from}</td>
        <td>{to}</td>
        <td>{via}</td>
        <td>{formatDate(created_at)}</td>
        <CallStatus
          isArchive={is_archived}
          isLoading={isArchiving}
          onArchive={onArchiveCall}
        />
        <CallActions onAddNote={handleAddNote} />
      </tr>

      {<AddNoteModal {...call} />}
    </>
  )
}
