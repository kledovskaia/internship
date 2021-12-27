import { FlexContainer } from '../../styles/common';
import { Priority } from '../Priority/Priority';
import { StoryPoints } from '../StoryPoints/StoryPoints';
import { Status } from '../Status/Status';
import { IssueContainer, IssueDescription, IssueFooter, IssueTitle } from './styles';

export const IssueInfo = ({ issue, full, children }) => {
  if (!full)
    return (
      <IssueContainer>
        <IssueTitle>{issue.title}</IssueTitle>
        <IssueFooter>
          <Priority value={issue.priority} />
          <StoryPoints>{issue.points}</StoryPoints>
        </IssueFooter>
      </IssueContainer>
    );

  return (
    <IssueContainer full>
      <IssueTitle>{issue.title}</IssueTitle>
      <FlexContainer>
        <Priority value={issue.priority} />
        <StoryPoints>{issue.points}</StoryPoints>
        <Status>{issue.status}</Status>
        {children}
      </FlexContainer>
      <IssueDescription>{issue.description}</IssueDescription>
    </IssueContainer>
  );
};
