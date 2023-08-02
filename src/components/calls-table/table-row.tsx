import { useArchiveCallMutation } from '@/queries'
import { Call } from '@/types'
import { formatDate } from '@/utils'
import { AddNoteModal } from '.'
import { CallActions, CallDuration, CallStatus, CallType } from './elements'

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
