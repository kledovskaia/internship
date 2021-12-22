import { useState } from 'react'
import { Button, FormContainer, Input, Textarea } from './styles'

const fields = {
  project: [
    {
      type: 'text',
      name: 'title',
      placeholder: 'Title *',
      required: 'required',
      element: Input,
    },
  ],
  issue: [
    {
      type: 'text',
      name: 'title',
      placeholder: 'Title *',
      required: 'required',
      element: Input,
    },
    {
      type: 'text',
      name: 'description',
      placeholder: 'Description',
      element: Textarea,
    },
  ],
}

export const Form = ({ type, onSubmit }) => {
  const [state, setState] = useState({})

  const handleChange = (event) => {
    setState((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(state)
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      {fields[type].map((field) => (
        <field.element
          key={field.name}
          value={state[field.name] ?? ''}
          onChange={handleChange}
          {...field}
        />
      ))}
      <Button>Save</Button>
    </FormContainer>
  )
}
