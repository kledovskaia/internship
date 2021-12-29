import { createSlice } from '@reduxjs/toolkit';
import { priorities } from './data/labels';
import { project } from './data/project';

const defaultProject = {
  issueBoards: [
    { title: 'TODO', items: [] },
    { title: 'IN PROGRESS', items: [] },
    { title: 'TEST', items: [] },
    { title: 'DONE', items: [] },
  ],
};

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
      issue.status = issue.status || state.value[id].issueBoards[0].title;
      issue.priority = issue.priority || 'Unknown';
      const infoId =
        Object.values(state.value)
          .flatMap((project) => project.issueBoards)
          ?.flatMap((board) => board.items)?.length || 0;
      issue.info = `${priorities[issue.priority]}-${infoId}`;
      const board = state.value[id].issueBoards.find((board) => board.title === issue.status).items;
      insertIssue(board, issue);
    },
    updateIssue: (state, action) => {
      const { id, issue } = action.payload;
      let oldIssue = state.value[id].issueBoards.flatMap((board) => board.items).find((item) => item.id === issue.id);

      if (oldIssue.status === issue.status) {
        Object.entries(issue).forEach(([key, value]) => {
          oldIssue[key] = value;
        });
      } else {
        const from = state.value[id].issueBoards.find((board) => board.title === oldIssue.status).items;
        const to = state.value[id].issueBoards.find((board) => board.title === issue.status).items;
        console.log(from, to);
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
      updateStatuses(state.value[id].issueBoards);
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

const updateStatuses = (boards) => {
  boards.forEach((board) => {
    board.items.forEach((issue) => issue.status !== board.title && (issue.status = board.title));
  });
};

export const moveInsideAnArray = ({ state, source, destination }) => {
  const sInd = +source.droppableId;
  const list = state[sInd].items;
  const startIndex = source.index;
  const endIndex = destination.index;

  const changedList = Array.from(list);
  const [removed] = changedList.splice(startIndex, 1);
  changedList.splice(endIndex, 0, removed);

  const result = [...state];
  result[sInd].items = changedList.map((item, index) => ({ ...item, index }));

  return result;
};

export const moveInsideAnArrayOfArrays = ({ state, sInd, dInd, source, destination }) => {
  const sourceClone = Array.from(state[sInd].items);
  const destClone = Array.from(state[dInd].items);
  const [removed] = sourceClone.splice(source.index, 1);

  destClone.splice(destination.index, 0, removed);

  const result = [...state];
  result[sInd].items = sourceClone.map((item, index) => ({ ...item, index }));
  result[dInd].items = destClone.map((item, index) => ({ ...item, index }));

  return result;
};
