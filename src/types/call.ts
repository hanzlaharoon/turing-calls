export interface Note {
  id: string
  content: string
}

export interface Call {
  id: string
  direction: 'inbound' | 'outbound'
  duration: number
  from: string
  to: string
  via: string
  is_archived: boolean
  call_type: 'voicemail' | 'missed' | 'answered'
  created_at: string
  notes: Note[]
}
