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
    title: `item ${k + offset}`,
  }))

const status = {
  TODO: 0,
  'IN PROGRESS': 1,
  TEST: 2,
  DONE: 3,
}

const defaultProject = {
  issueBoards: [getItems(5), getItems(5, 5), getItems(5, 10), getItems(5, 15)],
}

export const projects = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.CREATE_PROJECT:
      return {
        ...state,
        [action.payload.id]: { ...defaultProject, ...action.payload },
      }
    case TYPES.UPDATE_ISSUE: {
      const { id, issue } = action.payload
      const prevIssueInfo = state[id][issue.status].find(
        (item) => item.id === issue.id
      )
      if (prevIssueInfo.status === issue.status) {
        return {
          ...state,
          [id]: {
            ...state[id],
            issueBoards: state[id].issueBoards.map((board, index) => {
              if (status[index] === issue.status) {
                return board.map((item) => (item === issue.id ? issue : item))
              } else {
                return board
              }
            }),
          },
        }
      } else {
        return {
          ...state,
          [id]: {
            ...state[id],
            issueBoards: state[id].issueBoards.map((board, index) => {
              if (status[index] === prevIssueInfo.status) {
                return board.filter((item) => item === issue.id)
              } else if (status[index] === issue.status) {
                return [
                  { ...issue, index: 0 },
                  ...board.map((item, idx) => ({ ...item, index: idx + 1 })),
                ]
              } else {
                return board
              }
            }),
          },
        }
      }
    }
    case TYPES.NEW_ISSUE: {
      const { id, issue } = action.payload
      return updateIssues({ id, state, fn: insertIssue, args: { issue } })
    }

    case TYPES.MOVE_ISSUE: {
      const { id, sInd } = action.payload
      return updateIssues({
        id,
        state,
        fn: sInd !== undefined ? moveInsideAnArrayOfArrays : moveInsideAnArray,
        args: action.payload,
      })
    }
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

const insertIssue = ({ issue, state }) => {
  if (!issue.status) issue.status = 'TODO'

  return state.map((board, index) => {
    if (index === status[issue.status]) {
      return [
        {
          ...issue,
          index: 0,
          id:
            new Date().getTime() + Math.floor(Math.random() * 10000).toString(),
        },
        ...state[index].map((item) => ({
          ...item,
          index: item.index + 1,
        })),
      ]
    } else {
      return board
    }
  })
}
