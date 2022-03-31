import RouteCard from './RouteCard';

import { SearchResult } from '../types/SearchResult';

interface SearchResultsState {
  loading: boolean,
  error: string | null,
  items: JSON[]
}

export default function SearchResults(props: SearchResult[]) {
  return (
    <>
      {props.forEach((result) => {
        <RouteCard
          badge={result.badge}
          from={result.from}
          to={result.to}
          date={result.date}
          time={result.time}
          price={result.price}
          car={result.car}
        />;
      })}
    </>
  );
}
