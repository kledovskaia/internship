import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectProject } from '../redux/selectors';
import { ButtonLink, Container } from '../styles/common';

export const Project = () => {
  const { projectId } = useParams();
  const project = useSelector(selectProject(projectId));

  return !project ? (
    <h1>Project Doesn't Exist</h1>
  ) : (
    <Container>
      <h1>{project.title}</h1>
      <ButtonLink to={`/projects/${projectId}/issue-boards`}>Issue Boards</ButtonLink>
    </Container>
  );
};
