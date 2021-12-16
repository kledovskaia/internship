import { $ } from '../dom';
import { ActiveRoute } from './ActiveRoute';
import { Loader } from '../../components/Loader';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router');
    }

    this.$placeholder = $(selector);
    this.routes = routes;

    this.loader = new Loader();

    this.page = null;

    this.init();
  }

  init() {
    // DONE: 1. Закрепила контекст changePageHandler за текущим классом. Т.к. при передаче this.changePageHandler, контекст теряется
    window.addEventListener('hashchange', this.changePageHandler.bind(this));
    this.changePageHandler();
  }

  async changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }

    // TODO: 1. Нужно исправить баг, возникающий при переходе между роутами приложения (дописать код где-то в приложении).
    // Здесь this указывает на объект window, у которого нет $placeholder
    this.$placeholder.clear().append(this.loader);

    const Page = ActiveRoute.path.includes('excel') ? this.routes.excel : this.routes.dashboard;

    this.page = new Page(ActiveRoute.param);

    const root = await this.page.getRoot();

    this.$placeholder.clear().append(root);

    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
