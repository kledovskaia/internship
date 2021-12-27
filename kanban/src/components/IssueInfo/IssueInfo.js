import { FlexContainer } from '../../styles/common';
import { Priority } from '../Priority/Priority';
import { StoryPoints } from '../StoryPoints/StoryPoints';
import { Status } from '../Status/Status';
import { IssueContainer, IssueDescription, IssueFooter, IssueLabel, IssueTitle } from './styles';

export const IssueInfo = ({ issue, full, children }) => {
  if (!full)
    return (
      <IssueContainer>
        <IssueTitle>{issue.title}</IssueTitle>
        <IssueFooter>
          <Priority value={issue.priority} />
          {issue.points && <StoryPoints>{issue.points}</StoryPoints>}
          <IssueLabel>{issue.info}</IssueLabel>
        </IssueFooter>
      </IssueContainer>
    );

  return (
    <IssueContainer full>
      <IssueTitle full>
        {issue.info} {issue.title}
      </IssueTitle>
      <FlexContainer>
        <Priority value={issue.priority} />
        {issue.points && <StoryPoints>{issue.points}</StoryPoints>}
        <Status>{issue.status}</Status>
        {children}
      </FlexContainer>
      <IssueDescription>{issue.description}</IssueDescription>
    </IssueContainer>
  );
};
