export const debounce = (fn, ms = 1000) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
};
export const saveToLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
export const getFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key));
export const saveToLocalStorageWithDebounce = debounce(saveToLocalStorage, 500);
