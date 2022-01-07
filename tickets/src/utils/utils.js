export const messageTransformer = (type, array) => array.map(item => ({
  type,
  content: item.message ?? item
}))
export const debounce = (fn, ms) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
};