import { axiosClient } from '@/libs'
import { Call } from '@/types'
import { useMutation, useQuery } from '@tanstack/react-query'

interface CallLogsParams {
  offset?: number
  limit?: number
}

interface CallLogsResponse {
  nodes: Call[]
  totalCount: number
  hasNextPage: true
}

interface AddNotePayload {
  id: string
  content: string
}

async function getCallLogs({
  offset,
  limit,
}: CallLogsParams): Promise<CallLogsResponse> {
  return await axiosClient
    .get('/calls', {
      params: {
        offset,
        limit,
      },
    })
    .then((res) => res?.data)
}

export const useCallLogsQuery = (params: CallLogsParams) =>
  useQuery({
    queryFn: () => getCallLogs(params),
    queryKey: ['calls', params?.offset || 0],
    keepPreviousData: true,
  })

async function archiveCall(id: string): Promise<Call> {
  return await axiosClient.put(`/calls/${id}/archive`).then((res) => res?.data)
}

export const useArchiveCallMutation = () =>
  useMutation({
    mutationFn: archiveCall,
  })

async function addNote(params: AddNotePayload): Promise<Call> {
  return await axiosClient
    .post(`/calls/${params.id}/note`, { content: params.content })
    .then((res) => res?.data)
}

export const useAddNoteMutation = () =>
  useMutation({
    mutationFn: addNote,
  })
