import { createSlice } from '@reduxjs/toolkit'
import { moveInsideAnArray, moveInsideAnArrayOfArrays } from '../helpers/utils'

const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k, index) => ({
    index,
    id: new Date().getTime() + Math.floor(Math.random() * 10000).toString(),
    content: `item ${k + offset}`,
    title: `item ${k + offset}`,
  }))

const initialState = { value: {} }

const defaultProject = {
  issueBoards: [getItems(5), getItems(5, 5), getItems(5, 10), getItems(5, 15)],
}

const status = {
  TODO: 0,
  'IN PROGRESS': 1,
  TEST: 2,
  DONE: 3,
}

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    createProject: (state, action) => {
      const project = action.payload
      state.value[project.id] = {
        ...defaultProject,
        ...project,
      }
    },
    newIssue: (state, action) => {
      const { id, issue } = action.payload
      issue.status = issue.status || 'TODO'
      const board = state.value[id].issueBoards[status[issue.status]]
      insertIssue(board, issue)
    },
    updateIssue: (state, action) => {
      const { id, issue } = action.payload
      let oldIssue = state.value[id].issueBoards
        .flatMap((item) => item)
        .find((item) => item.id === issue.id)

      if (oldIssue.status === issue.status) {
        Object.entries(issue).forEach(([key, value]) => {
          oldIssue[key] = value
        })
      } else {
        const from = state.value[id].issueBoards[status[oldIssue.status]]
        const to = state.value[id].issueBoards[status[issue.status]]
        from.splice(oldIssue.index, 1)
        insertIssue(to, {
          ...issue,
        })
      }
    },
    moveIssue: (state, action) => {
      const { id, sInd } = action.payload
      state.value[id].issueBoards = (
        sInd !== undefined ? moveInsideAnArrayOfArrays : moveInsideAnArray
      )({
        state: state.value[id].issueBoards,
        ...action.payload,
      })
      updateStatuses(state, id)
    },
  },
})

export const { createProject, moveIssue, newIssue, updateIssue } =
  projectsSlice.actions

export default projectsSlice.reducer

/*=================================*/

const insertIssue = (arrayOfIssues, issue) => {
  arrayOfIssues.unshift(issue)
  updateIndexes(arrayOfIssues)
}

const updateIndexes = (arrayOfIssues) =>
  arrayOfIssues.forEach((issue, index) => (issue.index = index))

const updateStatuses = (state, projectId) => {
  state.value[projectId].issueBoards.forEach((board, index) => {
    const statuses = Object.entries(status)
    board.forEach(
      (issue) =>
        issue.status !== statuses[index][0] &&
        (issue.status = statuses[index][0])
    )
  })
}
