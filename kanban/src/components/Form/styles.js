import styled from 'styled-components/macro'
import TextField from '@mui/material/TextField'

export const FormContainer = styled.form`
  max-width: 35rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 1.8rem;
  column-gap: 0.8rem;

  textarea {
    min-height: 10rem;
  }

  button {
    justify-self: left;
  }
`

export const InputField = styled(TextField)`
  grid-column: ${({ minified }) => (minified ? 'span 1' : '1 / -1')};
`
