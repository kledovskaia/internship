type TDebounce = (fn: () => void, ms: number) => (...args: unknown[]) => void
export const debounce: TDebounce = (fn, ms) => {
  let timer: NodeJS.Timeout;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
};

type TMessageTransformer = (type: TType, array: TMessage[]) => TMessageTransformed[]

export const messageTransformer: TMessageTransformer = (type, array) => array.map((item) => ({
  type,
  content: item.message,
}));

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
