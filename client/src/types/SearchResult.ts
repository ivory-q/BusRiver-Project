type ResultCar = {
  name: string;
  seats: number;
};

export type SearchResult = {
  id: number | null;
  badge?: string | null;
  from: string | null;
  to: string | null;
  date: string | null;
  time: string | null;
  price: number | undefined;
  cars: ResultCar[];
};

export interface SearchResultsState {
  isLoaded: boolean;
  items?: [];
  error?: string | null;
}

export interface SeatsState extends SearchResultsState {
  isLoaded: boolean;
  row1: any;
  row2: any;
  error?: string | null;
}
