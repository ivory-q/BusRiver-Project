import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import '../styles/search.css';

interface SearchFormProps {
  from?: string | undefined;
  to?: string | undefined;
  date?: string | undefined;
  pass?: number | undefined;
}

export default function SearchForm(props: SearchFormProps) {
 
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
                  id=""
                />
                <datalist id="from">
                  <option value="Москва">Московская обл.</option>
                  <option value="Домодедово">Московская обл.</option>
                  <option value="Белгород">Белгородская обл.</option>
                  <option value="Беленихино">Белгородская обл.</option>
                  <option value="Красноярск">Красноярская обл.</option>
                  <option value="Краснодар">Краснодарская обл.</option>
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
                  id=""
                />
                <datalist id="to">
                  <option value="Москва">Московская обл.</option>
                  <option value="Домодедово">Московская обл.</option>
                  <option value="Белгород">Белгородская обл.</option>
                  <option value="Беленихино">Белгородская обл.</option>
                  <option value="Красноярск">Красноярская обл.</option>
                  <option value="Краснодар">Краснодарская обл.</option>
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
