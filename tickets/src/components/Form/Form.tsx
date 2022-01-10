import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Button,
  FormControl, InputLabel, MenuItem, Select, TextField,
} from '@mui/material';
import { Title2 } from '../../styles';
import { FormContainer } from './styles';

const schema = yup
  .object({
    title: yup.string().max(50, 'Maximum 50 characters').required('Title is required'),
    description: yup.string().max(100, 'Maximum 100 characters'),
    priority: yup.string().required('Priority is required'),
  })
  .required();

const fields = {
  title: { label: 'Ticket Title *', name: 'title' },
  description: { label: 'Description', name: 'description' },
  priority: {
    label: 'Select Priority',
    name: 'priority',
    options: ['low', 'normal', 'high'],
  },
} as const;

type Props = {
  ticket: TTicket | null;
};

export default function Form({ ticket }: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: ticket,
  });

  console.log(ticket);

  return (
    <FormContainer onSubmit={handleSubmit((data) => console.log(data))}>
      <Title2>{ticket ? 'Editing' : 'Creating'}</Title2>
      <Controller
        name={fields.title.name}
        control={control}
        render={({ field: { name, value } }) => (
          <TextField
          // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('title')}
            name={name}
            value={value}
            label={errors.title ? errors.title.message : fields.title.label}
            error={Boolean(errors.title)}
          />
        )}
      />
      <Controller
        name={fields.description.name}
        control={control}
        render={({ field: { name, value } }) => (
          <TextField
          // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('description')}
            name={name}
            value={value}
            multiline
            label={errors.description ? errors.description.message : fields.description.label}
            error={Boolean(errors.description)}
          />
        )}
      />
      <Controller
        name={fields.priority.name}
        control={control}
        render={({ field: { name, value } }) => (
          <FormControl required sx={{ minWidth: 120 }}>
            <InputLabel id="select-label">{errors.priority ? errors.priority.message : fields.priority.label}</InputLabel>
            <Select
            // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('priority')}
              labelId={name}
              id={name}
              value={value}
              label={errors.priority ? errors.priority.message : fields.priority.label}
            >
              { fields.priority.options.map((option) => (
                <MenuItem value={option}>{option}</MenuItem>
              )) }
            </Select>
          </FormControl>
        )}
      />

      <Button type="submit">Save</Button>
    </FormContainer>
  );
}
