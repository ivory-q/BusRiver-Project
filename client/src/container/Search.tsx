import Banner from './Banner';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { SearchResultsState } from '../types/SearchResult';

export default function Search() {
  let [searchParams, setSearchParams] = useSearchParams();
  let [fromInput, fromInputSet] = useState('');
  let [toInput, toInputSet] = useState('');
  let [dateInput, dateInputSet] = useState('');
  let [passInput, passInputSet] = useState<number | undefined>();

  let [searchState, setSearchState] = useState<SearchResultsState>({
    isLoaded: false,
    items: [],
    error: null,
  });

  useEffect(() => {
    fromInput = searchParams.get('from') || '';
    toInput = searchParams.get('to') || '';
    dateInput = searchParams.get('date') || '';
    passInput = Number(searchParams.get('pass')) || undefined;
    fromInputSet(fromInput);
    toInputSet(toInput);
    dateInputSet(dateInput);
    passInputSet(passInput);

    fetch('/api/route/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromInput,
        to: toInput,
        date: dateInput,
        pass: passInput,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setSearchState({
            isLoaded: true,
            items: result,
          });
        },
        (error) => {
          setSearchState({
            isLoaded: true,
            error,
          });
        }
        );
  }, []);
  
  return (
    <>
      <Banner>
        <SearchForm
          from={fromInput}
          to={toInput}
          date={dateInput}
          pass={passInput}
          handlers={{
            from: fromInputSet,
            to: toInputSet,
            date: dateInputSet,
            pass: passInputSet,
          }}
        />
      </Banner>
      <section id="search">
        <div className="search-cont">
          <p className="search-hint">
            Отправление и прибытие по местному времени
          </p>
          <h2 className="search-header">
            Расписание автобусов Краснодар - Москва на 6 июня
          </h2>
          <div className="search-info">
            <div className="info-header">
              <span>Рейсы с пометкой</span>
              <div className="info-bg">
                <span>Можно не печатать</span>
              </div>
            </div>
            <div className="info-text">
              При посадке просто покажите билет с экрана вашего телефона,
              распечатывать необязательно. Не забудьте взять с собой оригинал
              документа, который использовали при оформлении
            </div>
          </div>
          <div className="search-filters">
            <div className="filter-card">Время отправления</div>
            <div className="filter-card">Время в пути</div>
            <div className="filter-card">Время прибытия</div>
            <div className="filter-card active">
              <span> Стоимость</span>{' '}
              <img src="images/vector/icons/small_arr.svg" alt="" />
            </div>
            <div className="filter-card">Популярность</div>
          </div>
          <SearchResults
            isLoaded={searchState.isLoaded}
            items={searchState.items}
            error={searchState.error}
          />
        </div>
      </section>
    </>
  );
}
