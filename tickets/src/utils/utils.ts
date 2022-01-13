import { nanoid } from 'nanoid';
import { priorityLevels } from '../data/priorityLevels';

type TDebounce = (fn: (...args: unknown[]) => void, ms: number) => (...args: unknown[]) => void
export const debounce: TDebounce = (fn, ms) => {
  let timer: NodeJS.Timeout;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
};

const formatted = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').split(' ');
export const sortByQuery = (query: TQueryParams, array: TTicket[]) => {
  let result = [...array];
  if (query.order) {
    const [type, order] = query.order.split('-');
    if (type === 'date' && order === 'asc') {
      result.sort((a, b) => a.createdAt - b.createdAt);
    } else if (type === 'date' && order === 'desc') {
      result.sort((a, b) => b.createdAt - a.createdAt);
    } else if (type === 'priority' && order === 'asc') {
      result.sort((a, b) => priorityLevels[a.priority] - priorityLevels[b.priority]);
    } else if (type === 'priority' && order === 'desc') {
      result.sort((a, b) => priorityLevels[b.priority] - priorityLevels[a.priority]);
    }
  }
  if (query.search) {
    result = result.filter(
      (ticket) => formatted(query.search)
        .every((searchWord) => formatted(ticket.title)
          .some((word) => word.includes(searchWord))),
    );
  }
  return result;
};

type TMessageTransformer = (type: TType, arg: TMessage) => TMessageTransformed

export const messageTransformer: TMessageTransformer = (type, arg) => ({
  id: nanoid(),
  type,
  content: arg.message,
});

type TCalc = (tickets: TTicket[]) => TStatistic
export const calculateStatistic: TCalc = (tickets) => tickets.reduce((acc, ticket, i, array) => ({
  ...acc,
  [ticket.priority]: { count: acc[ticket.priority].count + 1 },
  uncompleted: {
    count: acc.uncompleted.count + Number(!ticket.completed),
    percentage: ((acc.uncompleted.count + Number(!ticket.completed)) / array.length) * 100,
  },
}), {
  high: { count: 0 },
  low: { count: 0 },
  normal: { count: 0 },
  uncompleted: {
    count: 0,
    percentage: 0,
  },
});

export const getChartData = (days: number, tickets: TTicket[]): TChartData => {
  const DAY = 1000 * 60 * 60 * 24;
  const result: { [key in string]: TChartBar } = {};
  let day = new Date();
  for (let i = 0; i < days; i += 1) {
    const date = new Date(day).getDate().toString().padStart(3, '+0');
    result[date] = {
      label: date,
      high: 0,
      low: 0,
      normal: 0,
    };
    day = new Date(day.getTime() - DAY);
  }
  const todayMS = Date.now();
  const lastCompletedTickets = tickets.filter(
    (ticket) => ticket.completed && (todayMS - (ticket.updatedAt || ticket.createdAt) <= DAY * 14),
  );
  lastCompletedTickets.forEach((ticket) => {
    const date = new Date((ticket.updatedAt || ticket.createdAt)).getDate().toString().padStart(3, '+0');
    result[date][ticket.priority] += 1;
  });

  return Object
    .entries(result)
    .reverse()
    .map(([_, value]) => ({ ...value, label: value.label.slice(1) }));
};

type TTime = {
  seconds: number,
  nanoseconds: number,
}
type TUntransformedTicket = TTicket & {
  createdAt: TTime,
  updatedAt: TTime,
}
type TTransform = (arg: TUntransformedTicket) => TTicket;

export const transformTicket: TTransform = ({ updatedAt, createdAt, ...doc }) => ({
  ...doc,
  ...(createdAt ?
    { createdAt: createdAt.seconds * 1000 + createdAt.nanoseconds / 1000 } :
    {}),
  ...(updatedAt ?
    { updatedAt: updatedAt.seconds * 1000 + updatedAt.nanoseconds / 1000 } :
    {}),
});
export const transformTotal = (arg: { value: number }) => arg.value;

export const getFromLocalStorage = (name: string) => JSON.parse(localStorage.getItem(name));
export const setToLocalStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};
