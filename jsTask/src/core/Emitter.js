// TODO: 5. Каждый раз когда мы меняем state приложения, например,
// если пишем что-то в ячейку, на каждый ввод символа сохраняется state в localStorage.
// Или если стрелками быстро перемещаемся между ячейками, на каждое нажатие по клавише стрелки сохраняется state
// Мы хотим оптимизировать приложение и сохранять в localStorage через 300мс после последнего изменения стейта
// Изменения в коде могут быть не в этом файле

export class Emitter {
  constructor() {
    this.listeners = {};
  }

  // dispatch, fire, trigger
  // Уведомляем слушателей если они есть
  // table.emit('table:select', {a: 1})
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
    return true;
  }

  // on, listen
  // Подписываемся на уведомление
  // Добавляем нового слушателя
  // formula.subscribe('table:select', () => {})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    return () => {
      this.listeners[event] = this.listeners[event].filter((listener) => listener !== fn);
    };
  }
}
