import { formatSeconds } from '@/utils'

export function CallDuration({ duration }: { duration: number }) {
  return (
    <td>
      <p>{formatSeconds(duration)}</p>
      <p className="text-primary">({duration} seconds)</p>
    </td>
  )
}
