import { createContext, useContext } from 'react';
import { makePersistable } from 'mobx-persist-store';
import { action, makeObservable, observable } from 'mobx';

export class AdminStore {
  public isAuth: boolean = false;
  public username: string = '';

  constructor() {
    makeObservable(this, {
      isAuth: observable,
      username: observable,
      setIsAdmin: action,
      setUsername: action,
    });
  }

  setIsAdmin(bool: boolean) {
    this.isAuth = bool;
  }
  setUsername(username: string) {
    this.username = username;
  }
}

export const adminStore = new AdminStore();
export const StoreContext = createContext(adminStore);
export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);
