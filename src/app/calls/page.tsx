'use client'

import { CallRecordRow, Pagination, TableHead } from '@/components/calls-table'
import { useCallLogsQuery } from '@/queries'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

export default function CallRecords() {
  const [page, setPage] = useState(0)

  const { data, isLoading, isFetching } = useCallLogsQuery({ offset: page })

  useEffect(() => {
    if (data?.nodes?.length) {
      data?.nodes?.sort((a, b) => {
        const createdAtA = dayjs(a.created_at)
        const createdAtB = dayjs(b.created_at)

        if (createdAtA.isBefore(createdAtB)) {
          return -1
        } else if (createdAtA.isAfter(createdAtB)) {
          return 1
        } else {
          return 0
        }
      })
    }
  }, [data])

  return (
    <>
      <main className="p-5">
        <h1>Call Records of all users</h1>

        <div className="mb-4">
          <label htmlFor="by-status">Filter by: </label>
          <select
            className="select max-w-xs text-primary"
            id="by-status"
            name="by-status"
            disabled={isLoading}
          >
            <option selected disabled>
              Status
            </option>
            <option value="all">All</option>
            <option value="archived">Archived</option>
            <option value="unarchived">Unarchive</option>
          </select>
        </div>

        {!isLoading ? (
          <div className="overflow-x-auto">
            <table className="table">
              <TableHead />
              <tbody>
                {data?.nodes.map((call, id) => (
                  <CallRecordRow key={id} call={call} />
                ))}
              </tbody>
            </table>

            <Pagination
              totalCount={data?.totalCount || 10}
              currentPage={page}
              isLoading={isLoading || isFetching}
              setPage={setPage}
            />
          </div>
        ) : (
          <div className="text-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
      </main>
    </>
  )
}
