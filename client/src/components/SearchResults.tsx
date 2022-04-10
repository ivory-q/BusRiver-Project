import RouteCard from './RouteCard';

import { SearchResult } from '../types/SearchResult';
import { SearchResultsState } from '../types/SearchResult';
import { Route } from '../types/Route';

export default function SearchResults(props: SearchResultsState) {
  if (!props.isLoaded) {
    return <h1>No results</h1>;
  } else {
    return (
      <div className="search-cards">
        {props.items?.map((result: Route, index) => {
          
          return (
            <RouteCard
              key={index}
              route={result}
            />
          );
        })}
      </div>
    );
  }
}
