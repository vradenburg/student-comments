export interface IDescription {
  description: string;
}
export interface IState<TData extends IDescription> {
  nextId: number;
  data: Record<number, TData>;
}

export class BaseDataService<TData extends IDescription> {
  protected storageKey: string;
  protected state: IState<TData>;

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

  public getState() {
    return this.state;
  }

  public setState(state: IState<TData>) {
    this.state = state;
    this.saveState();
  }

  public getList = () => {
    return Object.entries(this.state.data).map(([key, value]) => {
      return { id: parseInt(key), description: value.description };
    });
  };

  public save = (id: number | undefined, data: TData) => {
    if (id === undefined) {
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
    if (id === undefined) return;

    return this.state.data[id];
  };
}
