import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

export function formatSeconds(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes} minutes and ${remainingSeconds} seconds`
}

export function formatDate(dateString: string) {
  return dayjs(dateString).format('DD-MM-YYYY')
}
