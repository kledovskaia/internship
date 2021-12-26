import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  ButtonLink,
  Container,
  ProjectList,
  ProjectListItem,
  TitleLink,
} from '../styles/common'

export const Projects = () => {
  const projects = useSelector((state) => state.projects.value)

  return (
    <Container>
      <ButtonLink primary='true' to={`/new-project`}>
        Create a new project
      </ButtonLink>
      <ProjectList>
        {Object.values(projects).map((project) => (
          <ProjectListItem key={project.id}>
            <TitleLink to={`/projects/${project.id}`}>
              {project.title}
            </TitleLink>
          </ProjectListItem>
        ))}
      </ProjectList>
    </Container>
  )
}
