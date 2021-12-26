import * as Yup from 'yup'

export const schemas = {
  project: Yup.object().shape({
    title: Yup.string().max(100, 'Too Long!').required('Title is Required'),
  }),
  issue: Yup.object().shape({
    title: Yup.string().max(100, 'Too Long!').required('Title is Required'),
    description: Yup.string().max(300, 'Too Long!'),
    points: Yup.number()
      .positive('Positive')
      .integer('Integer')
      .max(10, '0 - 10')
      .typeError('Number'),
  }),
}

export const fields = {
  project: [{ name: 'title', placeholder: 'Title *' }],
  issue: [
    { name: 'title', placeholder: 'Title *' },
    {
      name: 'priority',
      placeholder: 'Priority',
      options: ['Critical', 'Major', 'Normal', 'Minor'],
    },
    {
      name: 'points',
      placeholder: 'Story Points',
      minified: 'minified',
    },
    {
      name: 'status',
      placeholder: 'Status',
      options: ['TODO', 'IN PROGRESS', 'TEST', 'DONE'],
    },
    {
      name: 'description',
      placeholder: 'Description',
      multiline: true,
    },
  ],
}
