import { Navigate } from 'react-router-dom';
import { IssueBoards } from '../pages/IssueBoards';
import { NewProject } from '../pages/NewProject';
import { NewIssue } from '../pages/NewIssue';
import { Project } from '../pages/Project';
import { Projects } from '../pages/Projects';
import { Issue } from '../pages/Issue';

export const routes = [
  {
    path: '/new-project',
    pathway: ['/projects', '/new-project'],
    element: <NewProject />,
  },
  {
    path: '/projects',
    element: <Projects />,
  },
  {
    path: '/projects/:projectId',
    element: <Project />,
  },
  {
    path: '/projects/:projectId/issue-boards',
    element: <IssueBoards />,
  },
  {
    path: '/projects/:projectId/issue-boards/:issueId',
    element: <Issue />,
  },
  {
    path: '/projects/:projectId/new-issue',
    element: <NewIssue />,
  },
  { path: '*', element: <Navigate to="/projects" /> },
];
