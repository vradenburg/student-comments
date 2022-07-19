interface IDescription {
  description: string;
}
interface IState<TData extends IDescription> {
  nextId: number;
  data: Record<number, TData>;
}

export class BaseService<TData extends IDescription> {
  storageKey: string;
  state: IState<TData>;

  constructor(storageKey: string, defaultState: IState<TData>) {
    this.storageKey = storageKey;

    const data = localStorage.getItem(storageKey);
    this.state = data ? JSON.parse(data) : defaultState;
  }

  protected saveState = () => {
    localStorage.setItem(this.storageKey, JSON.stringify(this.state));
  };

  protected nextId = () => {
    const id = this.state.nextId++;
    this.saveState();
    return id;
  };

  public getList = () => {
    return Object.entries(this.state.data).map(([key, value]) => {
      return { id: parseInt(key), description: value.description };
    });
  };

  public save = (id: number | undefined, data: TData) => {
    if (!id) {
      id = this.nextId();
    }
    this.state.data[id] = data;
    this.saveState();
    return id;
  };

  public deleteById = (id: number) => {
    delete this.state.data[id];
    this.saveState();
  };

  public getById = (id: number | undefined): TData | undefined => {
    if (!id) return;

    return this.state.data[id];
  };
}
