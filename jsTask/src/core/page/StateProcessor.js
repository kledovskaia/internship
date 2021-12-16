export class StateProcessor {
  constructor(client) {
    this.client = client;
    this.listen = this.listen.bind(this);
  }

  listen(state) {
    this.client.save(state);
  }

  get() {
    return this.client.get();
  }
}
