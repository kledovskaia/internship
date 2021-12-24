import {
  moveInsideAnArray,
  moveInsideAnArrayOfArrays,
} from '../../helpers/utils'
import * as TYPES from '../types'

const initialState = {}

const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k, index) => ({
    index,
    id: new Date().getTime() + Math.floor(Math.random() * 10000).toString(),
    content: `item ${k + offset}`,
  }))

const defaultProject = {
  issueBoards: [getItems(5), getItems(5, 5), getItems(5, 10), getItems(5, 15)],
  // {
  //   'TO DO': [],
  //   'IN PROGRESS': [],
  //   TEST: [],
  //   DONE: [],
  // },
}

export const projects = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.CREATE_PROJECT:
      return {
        ...state,
        [action.payload.id]: { ...defaultProject, ...action.payload },
      }
    case TYPES.MOVE_ISSUE:
      const { id, sInd } = action.payload
      return updateIssues({
        id,
        state,
        fn: sInd !== undefined ? moveInsideAnArrayOfArrays : moveInsideAnArray,
        args: action.payload,
      })

    default:
      return state
  }
}

const updateIssues = ({ state, args, id, fn }) => ({
  ...state,
  [id]: {
    ...state[id],
    issueBoards: fn({
      state: state[id].issueBoards,
      ...args,
    }),
  },
})
