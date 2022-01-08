type TTicket = {
  id: string;
  createdAt: number | {
    seconds: number,
    nanoseconds: number,
  },
  updatedAt?: number,
};
