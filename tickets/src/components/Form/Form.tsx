import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MenuItem, Select, TextField } from '@mui/material';

const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
  })
  .required();

const fields = {
  title: { label: 'Title *', name: 'title' },
  description: { label: 'Description', name: 'description' },
  priority: {
    label: 'Priority *',
    name: 'priority',
    options: ['low', 'normal', 'high'],
  },
};

type Props = {
  ticket: TTicket | null;
};

export default function Form({ ticket }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(ticket);

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Controller
        name={fields.title.name}
        control={control}
        render={({ field: { name, value } }) => (
          <TextField
            name={name}
            value={value}
            label={fields.title.label}
            error={Boolean(errors.title)}
            helperText={errors.title ? errors.title.message : ''}
          />
        )}
      />
      <Controller
        name={fields.description.name}
        control={control}
        render={({ field: { name, value } }) => (
          <TextField
            name={name}
            value={value}
            multiline
            label={fields.description.label}
            error={Boolean(errors.description)}
            helperText={errors.description ? errors.description.message : ''}
          />
        )}
      />
      <Controller
        name={fields.priority.name}
        control={control}
        render={({ field: { name, value } }) => (
          <Select name={name} value={value}>
            <MenuItem disabled>{fields.priority.label}</MenuItem>
            {fields.priority.options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        )}
      />

      <input type="submit" />
    </form>
  );
}
