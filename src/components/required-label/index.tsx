interface props {
  text: string
  htmlFor: string
}

export function RequiredLabel({ text, htmlFor }: props) {
  return (
    <label className="label mb-3" htmlFor={htmlFor}>
      <span className="label-text before:content-['*'] before:mr-0.5 before:text-red-500">
        {text}
      </span>
    </label>
  )
}
