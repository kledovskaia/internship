import * as priorityIcons from '../../icons/Priority';

export const Priority = ({ value }) => {
  const Icon = priorityIcons[value || 'Unknown'];
  return <Icon />;
};
