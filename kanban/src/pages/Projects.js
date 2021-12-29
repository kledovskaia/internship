import { useSelector } from 'react-redux';
import { selectProjects } from '../redux/selectors';
import { ButtonLink, Container, ProjectList, ProjectListItem, TitleLink } from '../styles/common';

export const Projects = () => {
  const projects = useSelector(selectProjects);

  return (
    <Container>
      <ButtonLink primary="true" to={`/new-project`}>
        Create a new project
      </ButtonLink>
      <ProjectList>
        {Object.values(projects).map((project) => (
          <ProjectListItem key={project.id}>
            <TitleLink to={`/projects/${project.id}`}>{project.title}</TitleLink>
          </ProjectListItem>
        ))}
      </ProjectList>
    </Container>
  );
};
