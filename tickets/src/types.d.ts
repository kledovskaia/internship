type TTicket = {
  title: string,
  description?: string,
  priority: 'low' | 'normal' | 'high',
  id: string;
  createdAt?: number,
  updatedAt?: number,
  author: TUser,
  completed: boolean,
};

type TMessage = {
  message: string,
}

type TMessageTransformed = {
  type: TType,
  content: TMessage['message'],
  id: string
}
type TType = 'error' | 'success';

type TUser = {
  displayName: string,
  photoURL: string,
  id: string,
}
type TStatistic = {
  high: TStat,
  low: TStat,
  normal: TStat,
  uncompleted: TStat & {
    percentage: number,
  }
}

type TStat = {
  count: number,
}

type TChartData = TChartBar[]
type TChartBar = {
  label: string,
  low: number,
  high: number,
  normal: number,
}

type TQueryParams = {
  filter?: string | string[] | null,
  page?: string | string[] | null,
  perPage?: string | string[] | null,
  order?: string | string[] | null,
}