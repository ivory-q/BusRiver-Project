import { createContext, useContext } from 'react';
import { makePersistable } from 'mobx-persist-store';
import { action, makeAutoObservable, makeObservable, observable } from 'mobx';
import { Route } from '../types/Route';

export class RootStore {
  public route: Route = {
    badge: '',
    cars: [],
    date: '',
    from: '',
    to: '',
    id: 0,
    price: 0,
    time: 'string',
  };
  public seat: number = 0;
  public buyer: string = '';

  constructor() {
    makeObservable(this, {
      route: observable,
      seat: observable,
      buyer: observable,
      setRoute: action,
      setSeat: action,
      setBuyer: action,
    });
    makePersistable(this, {
      name: 'RootStore',
      properties: ['route', 'seat', 'buyer'],
      storage: window.localStorage,
    });
  }

  setRoute(newRoute: Route) {
    this.route = newRoute;
  }
  setSeat(newSeat: number) {
    this.seat = newSeat;
  }
  setBuyer(newBuyer: string) {
    this.buyer = newBuyer;
  }
}

export const rootStore = new RootStore();
export const StoreContext = createContext(rootStore);
export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);
