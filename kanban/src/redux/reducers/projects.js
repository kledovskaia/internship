import * as TYPES from '../types'

const initialState = []

const defaultProject = {
  issueBoards: {
    'TO DO': [],
    'IN PROGRESS': [],
    TEST: [],
    DONE: [],
  },
}

export const projects = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.CREATE_PROJECT:
      return [...state, { ...defaultProject, ...action.payload }]
    default:
      return state
  }
}
