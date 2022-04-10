export interface ApiAwait<T> {
  isLoaded: boolean;
  items?: T;
  error?: string | null;
}
