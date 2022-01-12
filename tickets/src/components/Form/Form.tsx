import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Button,
  FormControl, InputLabel, MenuItem, Select, TextField,
} from '@mui/material';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../redux/slices/messages';
import { FormContainer, FormLargeField, FormTitle } from './styles';

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
    label: 'Select Priority *',
    name: 'priority',
    options: ['low', 'normal', 'high'],
  },
} as const;

type Props = {
  ticket: Partial<TTicket> | null;
  onSubmit: (ticket: Partial<TTicket>) => void;
};

export default function Form({ ticket, onSubmit }: Props) {
  const dispatch = useDispatch();
  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: ticket || {
      title: '',
      description: '',
      priority: '',
    },
  });

  useEffect(() => {
    if (Object.keys(errors).length) {
      dispatch(addMessage({
        id: nanoid(),
        type: 'error',
        content: 'Validation error',
      }));
    }
  }, [errors]);

  const submit = (data: TTicket) => {
    onSubmit({
      ...(ticket || {}),
      ...data,
    });
    if (!ticket) {
      reset({
        title: '',
        description: '',
        priority: '',
      });
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(submit)}>
      <FormTitle>{ticket ? 'Editing' : 'Creating'}</FormTitle>
      <Controller
        name={fields.title.name}
        control={control}
        render={({ field }) => (
          <TextField
            {...register('title')}
            {...field}
            label={errors.title ? errors.title.message : fields.title.label}
            error={Boolean(errors.title)}
          />
        )}
      />

      <Controller
        name={fields.priority.name}
        control={control}
        render={({ field }) => (
          <FormControl>
            <InputLabel error={Boolean(errors.title)} id="select-label">{errors.priority ? errors.priority.message : fields.priority.label}</InputLabel>
            <Select
              {...register('title')}
              {...field}
              labelId="select-label"
              label={errors.priority ? errors.priority.message : fields.priority.label}
              error={Boolean(errors.title)}
            >
              { fields.priority.options.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              )) }
            </Select>
          </FormControl>
        )}
      />
      <FormLargeField>
        <Controller
          name={fields.description.name}
          control={control}
          render={({ field }) => (
            <TextField
              {...register('title')}
              {...field}
              multiline
              label={errors.description ? errors.description.message : fields.description.label}
              error={Boolean(errors.description)}
            />
          )}
        />
      </FormLargeField>

      <Button type="submit">Save</Button>
    </FormContainer>
  );
}
