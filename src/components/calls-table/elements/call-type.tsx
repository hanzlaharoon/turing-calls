import { Call } from '@/types'

export function CallType({ text }: { text: Call['call_type'] }) {
  function getClassnames() {
    if (text === 'missed') return 'text-error'
    else if (text === 'answered') return 'text-success'
    else return 'text-primary'
  }

  return <td className={`capitalize ${getClassnames()}`}>{text}</td>
}
