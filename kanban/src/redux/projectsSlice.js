import { createSlice } from '@reduxjs/toolkit';
import { priorities, status } from './data/labels';
import { project } from './data/project';

const defaultProject = {
  issueBoards: [[], [], [], []],
};

let counter = 14;

export const initialState = {
  value: {
    [project.id]: project,
  },
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
    newIssue: (state, action) => {
      const { id, issue } = action.payload;
      issue.status = issue.status || 'TODO';
      issue.priority = issue.priority || 'Unknown';
      issue.info = `${priorities[issue.priority]}-${counter}`;
      const board = state.value[id].issueBoards[status[issue.status]];
      insertIssue(board, issue);
      counter++;
    },
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

export const moveInsideAnArray = ({ state, source, destination }) => {
  const sInd = +source.droppableId;
  const list = state[sInd];
  const startIndex = source.index;
  const endIndex = destination.index;

  const changedList = Array.from(list);
  const [removed] = changedList.splice(startIndex, 1);
  changedList.splice(endIndex, 0, removed);

  const result = [...state];
  result[sInd] = changedList.map((item, index) => ({ ...item, index }));

  return result;
};

export const moveInsideAnArrayOfArrays = ({ state, sInd, dInd, source, destination }) => {
  const sourceClone = Array.from(state[sInd]);
  const destClone = Array.from(state[dInd]);
  const [removed] = sourceClone.splice(source.index, 1);

  destClone.splice(destination.index, 0, removed);

  const result = [...state];
  result[sInd] = sourceClone.map((item, index) => ({ ...item, index }));
  result[dInd] = destClone.map((item, index) => ({ ...item, index }));

  return result;
};
