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
import { useNavigate } from 'react-router-dom';
import { configTicketObj } from '../../utils/configurators';
import { updateTicket, addTicket, deleteTicket } from '../../redux/thunks/tickets';
import { addMessage } from '../../redux/slices/messages';
import {
  ButtonContainer, EditingButtons, FormContainer, FormLargeField, FormTitle,
} from './styles';

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
  ticket?: Partial<TTicket>,
};

export default function Form({ ticket }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
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

  const onDelete = async () => {
    if (!ticket) return;
    await dispatch(deleteTicket(ticket));
    navigate('/tickets');
  };

  const onComplete = () => {
    if (!ticket) return;
    dispatch(updateTicket({
      ...ticket,
      completed: true,
    }));
  };

  const submit = async (data: TTicket) => {
    let result;
    if (ticket) {
      result = await dispatch(updateTicket({
        ...ticket,
        ...data,
      }));
      // payload doesn't exist on ..., but actially exists
      // eslint-disable-next-line
      // @ts-ignore
      navigate(`/tickets/${result.payload}`);
      return;
    }
    result = await dispatch(addTicket(configTicketObj(data)));
    // payload doesn't exist on ..., but actially exists
    // eslint-disable-next-line
    // @ts-ignore
    navigate(`/tickets/${result.payload}`);
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
            disabled={ticket?.completed}
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
            <InputLabel error={Boolean(errors.priority)} id="select-label">{errors.priority ? errors.priority.message : fields.priority.label}</InputLabel>
            <Select
              {...register('title')}
              {...field}
              disabled={ticket?.completed}
              labelId="select-label"
              label={errors.priority ? errors.priority.message : fields.priority.label}
              error={Boolean(errors.priority)}
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
              disabled={ticket?.completed}
              label={errors.description ? errors.description.message : fields.description.label}
              error={Boolean(errors.description)}
            />
          )}
        />
      </FormLargeField>
      <ButtonContainer>
        <Button
          disabled={ticket?.completed}
          variant="contained"
          color="primary"
          type="submit"
        >
          {ticket?.completed ? 'Completed' : 'Save Details'}
        </Button>
        {
          ticket && (
            <EditingButtons>
              <Button
                disabled={ticket?.completed}
                onClick={onComplete}
                variant="contained"
                color="warning"
                type="button"
              >
                {ticket?.completed ? 'Completed' : 'Complete'}
              </Button>
              <Button
                disabled={ticket?.completed}
                onClick={onDelete}
                variant="contained"
                color="error"
                type="button"
              >
                {ticket?.completed ? 'Completed' : 'Delete'}
              </Button>
            </EditingButtons>
          )
        }
      </ButtonContainer>
    </FormContainer>
  );
}
