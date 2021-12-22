import * as TYPES from './types'
import { v4 as uuidv4 } from 'uuid'

export const createProject = (info) => ({
  type: TYPES.CREATE_PROJECT,
  payload: {
    ...info,
    id: uuidv4(),
  },
})
