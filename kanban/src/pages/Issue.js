import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Form } from '../components/Form/Form';
import { updateIssue } from '../redux/projectsSlice';
import { Navigate } from 'react-router-dom';
import { Button, Container } from '../styles/common';
import { IssueInfo } from '../components/IssueInfo/IssueInfo';
import { isProjectExist, selectIssue } from '../redux/selectors';

export const Issue = () => {
  const [isOnEdit, setIsOnEdit] = useState(false);
  const { projectId, issueId } = useParams();
  const projectExists = useSelector(isProjectExist(projectId));
  const dispatch = useDispatch();
  const issue = useSelector(selectIssue(projectId, issueId));

  const onSubmit = (value) => {
    dispatch(
      updateIssue({
        id: projectId,
        issue: value,
      })
    );
    setIsOnEdit(false);
  };
  const handleClick = () => {
    setIsOnEdit((state) => !state);
  };

  if (!projectExists) return <Navigate to={`/project/${projectId}`} />;

  if (!issue) return <h1>Issue Doesn't Exist</h1>;

  return (
    <Container>
      {isOnEdit && <Form type="issue" initialState={issue} onSubmit={onSubmit} />}
      {!isOnEdit && (
        <IssueInfo full issue={issue}>
          <Button primary onClick={handleClick}>
            Edit
          </Button>
        </IssueInfo>
      )}
    </Container>
  );
};
