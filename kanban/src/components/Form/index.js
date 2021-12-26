import { useFormik } from 'formik'
import { Button } from '../../styles/common'
import { InputField, FormContainer } from './styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Fragment } from 'react'
import * as form from '../../data/form'

export const Form = ({ type, onSubmit, initialState }) => {
  const formik = useFormik({
    initialValues: {
      ...Object.fromEntries(
        form.fields[type].map(({ name }) => [name, initialState?.[name] || ''])
      ),
    },
    validationSchema: form.schemas[type],
    onSubmit: (values) => {
      onSubmit({
        ...initialState,
        ...values,
      })
    },
  })

  return (
    <FormContainer onSubmit={formik.handleSubmit}>
      {form.fields[type].map((field) => (
        <Fragment key={field.name}>
          {field.options ? (
            <FormControl fullWidth>
              <InputLabel id={field.name}>{field.placeholder}</InputLabel>
              <Select
                labelId={field.name}
                id={field.name}
                name={field.name}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
              >
                {field.options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <InputField
              {...field}
              key={field.name}
              id={field.name}
              name={field.name}
              label={field.placeholder}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              error={
                formik.touched[field.name] && Boolean(formik.errors[field.name])
              }
              helperText={
                formik.touched[field.name] && formik.errors[field.name]
              }
            />
          )}
        </Fragment>
      ))}
      <Button type='submit'>Save</Button>
    </FormContainer>
  )
}
