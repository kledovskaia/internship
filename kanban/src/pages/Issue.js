import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Form } from '../components/Form/Form';
import { updateIssue } from '../redux/projectsSlice';
import { Navigate } from 'react-router-dom';
import { Button, Container, IssueLink } from '../styles/common';
import { IssueInfo } from '../components/IssueInfo/IssueInfo';

export const Issue = () => {
  const [isOnEdit, setIsOnEdit] = useState(false);
  const { projectId, issueId } = useParams();
  const projectExists = useSelector((state) => projectId in state.projects.value);
  const dispatch = useDispatch();
  const issue = useSelector((state) =>
    state.projects.value[projectId]?.issueBoards?.flatMap((board) => board)?.find((issue) => issue.id === issueId)
  );

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
