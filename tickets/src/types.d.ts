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
