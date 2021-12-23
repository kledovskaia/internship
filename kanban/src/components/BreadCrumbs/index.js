import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useParams } from 'react-router-dom'
import { routes } from '../../data/routes'

export const BreadCrumbs = () => {
  const { pathname } = useLocation()
  const { projectId } = useParams()
  const [breadCrumbs, setBreadCrumbs] = useState([])
  const projectTitle = useSelector(
    (state) => state.projects.find((project) => project.id === projectId)?.title
  )

  useEffect(() => {
    const route = routes.find(
      (route) => route.path === pathname.replace(projectId, ':projectId')
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

        return (
          <li key={route}>
            <Link to={route}>{label}</Link>
          </li>
        )
      })}
    </ul>
  )
}
