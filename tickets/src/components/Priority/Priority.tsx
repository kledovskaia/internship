import { priorityColors } from '../../data/priorityColors';
import { PriorityContainer } from './styles';

type Props = {
  children: keyof typeof priorityColors
}

export default function Priority({ children }: Props) {
  return (
    <PriorityContainer
      color={priorityColors[children]}
    >
      {children.toUpperCase()}
    </PriorityContainer>
  );
}
