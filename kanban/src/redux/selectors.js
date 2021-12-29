import { createSelector } from '@reduxjs/toolkit';

export const selectProjects = (state) => state.projects.value;

export const selectIssue = (projectId, issueId) =>
  createSelector(selectProjects, (projects) =>
    projects[projectId]?.issueBoards?.flatMap((board) => board.items)?.find((issue) => issue.id === issueId)
  );

export const selectIssueBoards = (projectId) =>
  createSelector(selectProjects, (projects) => projects[projectId]?.issueBoards);

export const selectProject = (projectId) => createSelector(selectProjects, (projects) => projects[projectId]);
export const selectProjectTitle = (projectId) =>
  createSelector(selectProjects, (projects) => projects[projectId]?.title);
export const isProjectExist = (projectId) => createSelector(selectProjects, (projects) => projectId in projects);
export const isIssueExist = (projectId) => createSelector(selectProjects, (projects) => projectId in projects);
