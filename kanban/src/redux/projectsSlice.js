import { createSlice } from '@reduxjs/toolkit';
import { moveInsideAnArray, moveInsideAnArrayOfArrays } from '../helpers/utils';
import { projectsSliceInitialState } from './data/projectsSliceInitialState';

const initialState = projectsSliceInitialState;

const defaultProject = {
  issueBoards: [[], [], [], []],
};

const status = {
  TODO: 0,
  'IN PROGRESS': 1,
  TEST: 2,
  DONE: 3,
};

const priorities = {
  Critical: 'FC',
  Major: 'FC',
  Normal: 'FC',
  Minor: 'MAR',
  Unknown: 'BC',
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    createProject: (state, action) => {
      const project = action.payload;
      state.value[project.id] = {
        ...defaultProject,
        ...project,
      };
    },
    newIssue: (() => {
      let counter = 1;

      return (state, action) => {
        const { id, issue } = action.payload;
        issue.status = issue.status || 'TODO';
        issue.priority = issue.priority || 'Unknown';
        issue.info = `${priorities[issue.priority]}-${counter}`;
        const board = state.value[id].issueBoards[status[issue.status]];
        insertIssue(board, issue);
        counter++;
      };
    })(),
    updateIssue: (state, action) => {
      const { id, issue } = action.payload;
      let oldIssue = state.value[id].issueBoards.flatMap((item) => item).find((item) => item.id === issue.id);

      if (oldIssue.status === issue.status) {
        Object.entries(issue).forEach(([key, value]) => {
          oldIssue[key] = value;
        });
      } else {
        const from = state.value[id].issueBoards[status[oldIssue.status]];
        const to = state.value[id].issueBoards[status[issue.status]];
        from.splice(oldIssue.index, 1);
        insertIssue(to, issue);
      }
    },
    moveIssue: (state, action) => {
      const { id, sInd } = action.payload;
      state.value[id].issueBoards = (sInd !== undefined ? moveInsideAnArrayOfArrays : moveInsideAnArray)({
        state: state.value[id].issueBoards,
        ...action.payload,
      });
      updateStatuses(state, id);
    },
  },
});

export const { createProject, moveIssue, newIssue, updateIssue } = projectsSlice.actions;

export default projectsSlice.reducer;

/*=================================*/

const insertIssue = (arrayOfIssues, issue) => {
  arrayOfIssues.unshift(issue);
  updateIndexes(arrayOfIssues);
};

const updateIndexes = (arrayOfIssues) => arrayOfIssues.forEach((issue, index) => (issue.index = index));

const updateStatuses = (state, projectId) => {
  state.value[projectId].issueBoards.forEach((board, index) => {
    const statuses = Object.entries(status);
    board.forEach((issue) => issue.status !== statuses[index][0] && (issue.status = statuses[index][0]));
  });
};
