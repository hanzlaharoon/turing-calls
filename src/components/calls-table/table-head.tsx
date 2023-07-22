export function HeadCell({ text }: { text: string }) {
  return <th className="text-accent-content uppercase">{text}</th>
}

export function TableHead() {
  return (
    <thead>
      <tr className="bg-base-200 border-2 border-slate-300">
        <HeadCell text={'Call Type'} />
        <HeadCell text={'Direction'} />
        <HeadCell text={'Duration'} />
        <HeadCell text={'From'} />
        <HeadCell text={'To'} />
        <HeadCell text={'Via'} />
        <HeadCell text={'Created At'} />
        <HeadCell text={'Status'} />
        <HeadCell text={'Actions'} />
      </tr>
    </thead>
  )
}
