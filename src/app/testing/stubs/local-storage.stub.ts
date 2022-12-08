
export class LocalStorageStubService {

  store = {};
  constructor() { }

  public getData(key: string): string | null {
    return key in this.store ? this.store[key as keyof typeof this.store] : null;
  }

  public saveData(key: string, value: string) {
    this.store[key as keyof typeof this.store] = `${value}` as never;
  }

  removeItem(key: string) {
    delete this.store[key as keyof typeof this.store];
  }

  clear() {
    this.store = {};
  }
}
