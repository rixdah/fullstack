import { useState } from "react"

export const useField = (id, type) => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  const onClick = () => {
    setValue('')
  }

  return {
    id,
    type,
    value,
    onChange,
    onClick
  }
}