import { Fragment } from 'react'
import { Button, ErrorsContainer } from './styles'
import { Formik, Form as FormFormik, Field } from 'formik'
import * as Yup from 'yup'

const schemas = {
  project: Yup.object().shape({
    title: Yup.string().max(100, 'Too Long!').required('Title is Required'),
  }),
  issue: Yup.object().shape({
    title: Yup.string().max(100, 'Too Long!').required('Title is Required'),
    description: Yup.string().max(300, 'Too Long!'),
    points: Yup.number().positive().integer().max(10),
  }),
}

const fields = {
  project: [{ name: 'title', placeholder: 'Title *', as: 'input' }],
  issue: [
    { name: 'title', placeholder: 'Title *', as: 'input' },
    {
      name: 'priority',
      placeholder: 'Priority',
      as: 'select',
      options: ['Critical', 'Major', 'Normal', 'Minor'],
    },
    { name: 'points', placeholder: 'Story Points', as: 'input' },
    {
      name: 'status',
      placeholder: 'Status',
      as: 'select',
      options: ['TODO', 'IN PROGRESS', 'TEST', 'DONE'],
    },
    { name: 'description', placeholder: 'Description', as: 'textarea' },
  ],
}

export const Form = ({ type, onSubmit, initialState }) => {
  return (
    <Formik
      initialValues={
        initialState || {
          ...Object.fromEntries(fields[type].map(({ name }) => [name, ''])),
        }
      }
      validationSchema={schemas[type]}
      onSubmit={(values) => {
        onSubmit(values)
      }}
    >
      {({ errors, touched }) => (
        <FormFormik>
          <ErrorsContainer>
            {Object.entries(errors).map(([name, error]) =>
              touched[name] ? <div>{error}</div> : null
            )}
          </ErrorsContainer>
          {fields[type].map((field) => (
            <Fragment key={field.name}>
              <Field {...field}>
                {field.as === 'select' ? (
                  <>
                    <option disabled value=''>
                      {field.placeholder}
                    </option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </>
                ) : null}
              </Field>
            </Fragment>
          ))}
          <Button type='submit'>Save</Button>
        </FormFormik>
      )}
    </Formik>
  )
}
