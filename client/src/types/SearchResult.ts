type ResultCar = {
    name: string,
    seats: number
}

export type SearchResult = {
  badge?: string | null;
  from: string | null;
  to: string | null;
  date: string | null;
  time: string | null;
  price: number | undefined;
  car: ResultCar;
};
