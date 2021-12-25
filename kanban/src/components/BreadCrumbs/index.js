import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useParams } from 'react-router-dom'
import { routes } from '../../data/routes'

export const BreadCrumbs = () => {
  const { pathname } = useLocation()
  const { projectId, issueId } = useParams()
  const [breadCrumbs, setBreadCrumbs] = useState([])
  const projectTitle = useSelector(
    (state) => state.projects.value[projectId]?.title
  )
  const issueTitle = useSelector(
    (state) =>
      state.projects.value[projectId]?.issueBoards
        ?.flatMap((board) => board)
        ?.find((issue) => issue.id === issueId)?.title
  )

  useEffect(() => {
    const route = routes.find(
      (route) =>
        route.path ===
        pathname.replace(projectId, ':projectId').replace(issueId, ':issueId')
    )
    if (!route) return
    setBreadCrumbs(
      route.pathway ??
        pathname
          .slice(1)
          .split('/')
          .map((_, idx, array) => '/' + array.slice(0, idx + 1).join('/'))
    )
  }, [pathname])

  return (
    <ul>
      {breadCrumbs.map((route) => {
        let label = route.split('/').pop()
        if (label === projectId) label = projectTitle || "Project Doesn't Exist"
        else if (label === issueId) label = issueTitle || "Issue Doesn't Exist"
        else
          label = label
            .split('-')
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join(' ')

        return (
          <li key={route}>
            <Link to={route}>{label}</Link>
          </li>
        )
      })}
    </ul>
  )
}
