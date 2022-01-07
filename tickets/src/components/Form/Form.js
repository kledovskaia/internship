import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { MenuItem, Select, TextField } from "@mui/material";

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
}).required();

const fields = {
  title: { label: 'Title', name: 'title' },
  description: { label: 'Description', name: 'description' },
  priority: { label: 'Priority', name: 'priority', options: ['low', 'normal', 'high'] },
}


export const Form = ({ ticket }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        render={({ field }) => (
            <TextField
                {...field}
                label={fields.title.label}
                error={Boolean(errors.title)}
                helperText={errors.title ? errors.title.message : ''}
            />
        )}
        control={control}
        name={fields.title.name}
      />
      <Controller
        control={control}
        name={fields.description.name}
        render={({ field }) => (
            <TextField
                {...field}
                multiline
                label={fields.description.label}
                error={Boolean(errors.description)}
                helperText={errors.description ? errors.description.message : ''}
            />
        )}
      />
      <Controller
          control={control}
          name={fields.priority.name}
          render={({ field }) => (
            <Select {...field}>
              {fields.priority.options.map((option) => {
                return (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                );
              })
              }
            </Select>
          )}
        />
        
      <input type="submit" />
    </form>
  );
}