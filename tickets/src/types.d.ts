type TTicket = {
  title: string,
  description?: string,
  priority: 'low' | 'normal' | 'high',
  id: string;
  createdAt: number | {
    seconds: number,
    nanoseconds: number,
  },
  updatedAt?: number,
};

type TMessage = {
  message: string,
}

type TMessageTransformed = {
  type: TType,
  content: TMessage['message'],
}
type TType = 'error' | 'message';

type TUser = {
  displayName: string,
  photoURL: string,
  id: string,
}