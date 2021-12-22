import { Board } from '../pages/Board'
import { Main } from '../pages/Boards'
import { NewBoard } from '../pages/NewBoard'
import { NewIssue } from '../pages/NewIssue'
import { NotFound } from '../pages/NotFound'

export const routes = [
  { path: '/new-board', title: 'New Board', element: <NewBoard /> },
  { path: '/boards/:id', element: <Board /> },
  { path: '/boards/:id/new-issue', title: 'New Issue', element: <NewIssue /> },
  { path: '/', title: 'International', element: <Main /> },
  { path: '*', title: 'Not Found', element: <NotFound /> },
]
