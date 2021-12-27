import * as priorityIcons from '../../icons/Priority';

export const Priority = ({ children }) => {
  const Icon = priorityIcons[children || 'Unknown'];
  return <Icon />;
};
