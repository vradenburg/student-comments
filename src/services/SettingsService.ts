const storageKey = "settings";

export class SettingsService {
  protected state: Record<string, string>;

  constructor() {
    const data = localStorage.getItem(storageKey);
    this.state = data ? JSON.parse(data) : {};
  }

  protected saveState = () => {
    localStorage.setItem(storageKey, JSON.stringify(this.state));
  };

  public getState() {
    return this.state;
  }

  public setState(state: Record<string, string>) {
    this.state = state;
    this.saveState();
  }

  public save = (key: string, value: string) => {
    this.state[key] = value;
    this.saveState();
  };

  public deleteByKey = (key: string) => {
    delete this.state[key];
    this.saveState();
  };

  public getByKey = (key: string): string | undefined => {
    return this.state[key];
  };

  public getLevels = (): number => {
    return parseInt(this.getByKey("levels") || "4");
  };
  public setLevels = (levels: number) => {
    this.save("levels", `${levels}`);
  };
}

const settingsService = new SettingsService();
export default settingsService;
