type TMessageTransformer = (type: TType, array: TMessage[]) => TMessageTransformed[]

export const messageTransformer: TMessageTransformer = (type, array) => array.map((item) => ({
  type,
  content: item.message,
}));

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
