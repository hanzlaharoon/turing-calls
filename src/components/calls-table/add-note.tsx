import { useAddNoteMutation } from '@/queries'
import { Call } from '@/types'
import { formatSeconds } from '@/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { CallType } from '.'

const schema = yup
  .object({
    content: yup.string().required(),
  })
  .required()

type FormData = yup.InferType<typeof schema>

export function AddNoteModal({
  call_type,
  duration,
  id,
  from,
  to,
  via,
  notes,
}: Call) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const { mutate, isLoading } = useAddNoteMutation()

  function onSubmit(data: FormData) {
    mutate(
      {
        ...data,
        id,
      },
      {
        onSuccess: (data) => {
          reset()
          notes.push(data?.notes[data.notes.length - 1])
          const modalId = 'notes_modal_' + id
          // @ts-ignore
          window[modalId].close()
        },
      }
    )
  }

  return (
    <dialog id={`notes_modal_${id}`} className="modal">
      <div className="modal-box rounded-sm">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost text-primary absolute right-2 top-2">
            ✕
          </button>
          <h3 className="text-lg">Add Notes</h3>
          <p className="pb-4 pt-2 text-primary border-b-2">Call Id: {id}</p>

          <table className="table-sm">
            <tbody>
              <tr className="border-b-0">
                <td className="font-semibold">Call Type</td>
                <CallType text={call_type} />
              </tr>
              <tr className="border-b-0">
                <td className="font-semibold">Duration</td>
                <td>{formatSeconds(duration)}</td>
              </tr>
              <tr className="border-b-0">
                <td className="font-semibold">From</td>
                <td>{from}</td>
              </tr>
              <tr className="border-b-0">
                <td className="font-semibold">To</td>
                <td>{to}</td>
              </tr>
              <tr className="border-b-0">
                <td className="font-semibold">Via</td>
                <td>{via}</td>
              </tr>
            </tbody>
          </table>
        </form>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-4 border-b-2">
            <h3 className="font-medium pb-2">Notes</h3>

            {notes?.map((value) => (
              <p className="mb-2" key={value.id}>
                {value.content}
              </p>
            ))}

            <textarea
              className="textarea textarea-bordered rounded-sm textarea-md w-full"
              placeholder="Add Notes"
              {...register('content')}
            ></textarea>

            {errors?.content?.message && (
              <p className="text-sm text-error">{errors?.content?.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full mt-6 capitalize rounded-sm"
          >
            Save
          </button>
        </form>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </div>
    </dialog>
  )
}
