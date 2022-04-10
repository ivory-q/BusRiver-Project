import { useEffect, useState } from 'react';
import '../styles/search.css';
import { ApiAwait } from '../types/ApiAwait';

interface SearchFormHandlers {
  from: Function;
  to: Function;
  date: Function;
  pass: Function;
}

interface SearchFormProps {
  from?: string | undefined;
  to?: string | undefined;
  date?: string | undefined;
  pass?: number | undefined;
  handlers?: SearchFormHandlers;
}

export default function SearchForm(props: SearchFormProps) {
  let [options, setOptions] = useState<ApiAwait<Array<string[]>>>({
    isLoaded: false,
    items: [[], []],
    error: null,
  });

  useEffect(() => {
    fetch('/api/route/options', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setOptions({
            isLoaded: true,
            items: result as Array<string[]>,
          });
        },
        (error) => {
          setOptions({
            isLoaded: true,
            error,
          });
        }
      );
  }, []);

  return (
    <>
      <div className="jumbo-search-form">
        <form action="/search" method="get">
          <div className="search-inp-group">
            <div className="search-inp-sub">
              <div className="search-inp">
                <span className="search-inp-hint">Откуда</span>
                <br />
                <input
                  placeholder="Москва"
                  type="text"
                  list="from"
                  name="from"
                  value={props.from}
                  onChange={(e) => {
                    if (props.handlers) props.handlers.from(e.target.value);
                  }}
                  id=""
                />
                <datalist id="from">
                  {options.items &&
                    options.items[0].map((option, index) => {
                      return (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      );
                    })}
                </datalist>
              </div>
              <div className="search-inp">
                <span className="search-inp-hint">Куда</span>
                <br />
                <input
                  placeholder="Краснодар"
                  type="text"
                  list="to"
                  name="to"
                  value={props.to}
                  onChange={(e) => {
                    if (props.handlers) props.handlers.to(e.target.value);
                  }}
                  id=""
                />
                <datalist id="to">
                  {options.items &&
                    options.items[1].map((option, index) => {
                      return (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      );
                    })}
                </datalist>
              </div>
            </div>
            <div className="search-inp-sub">
              <div className="search-inp">
                <span className="search-inp-hint">Дата поездки</span>
                <br />
                <div>
                  <input
                    placeholder="5 июня"
                    type="text"
                    name="date"
                    value={props.date}
                    onChange={(e) => {
                      if (props.handlers) props.handlers.date(e.target.value);
                    }}
                    id=""
                  />
                  <img src="images/vector/icons/calendar.svg" alt="" />
                </div>
              </div>
              <div className="search-inp">
                <span className="search-inp-hint">Пассажиры</span>
                <br />
                <div>
                  <input
                    placeholder="1 взрослый"
                    type="text"
                    name="pass"
                    value={props.pass}
                    onChange={(e) => {
                      if (props.handlers) props.handlers.pass(e.target.value);
                    }}
                    id=""
                  />
                  <img src="images/vector/icons/bi_person.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
          <input type="submit" value="Найти билет" />
        </form>
      </div>
    </>
  );
}
