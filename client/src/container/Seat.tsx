import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useStore } from '../stores/index.store';

import '../styles/seat.css';
import { SearchResultsState, SeatsState } from '../types/SearchResult';

export default function Seat() {
  const rootStore = useStore();
  const navigate = useNavigate();

  let [activeSeat, setActiveSeat] = useState<number>();
  let [seatsState, setSeatsState] = useState<SearchResultsState>({
    isLoaded: false,
    items: [],
    error: null,
  });
  let [seats, setSeats] = useState<SeatsState>({
    isLoaded: false,
    row1: [],
    row2: [],
    error: null,
  });

  let row1: any = [];
  let row2: any = [];

  function toggleActiveSeat(clickElem: EventTarget) {
    let elem = clickElem as HTMLElement;
    let seats = document.getElementsByClassName('seat');
    for (let i = 0; i < seats.length; i++) {
      const element = seats[i];
      element.classList.remove('activeseat');
    }
    elem.classList.add('activeseat');
  }

  useEffect(() => {
    fetch('/api/reservation/seats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        routeId: rootStore.route?.id,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setSeatsState({
            isLoaded: true,
            items: result,
          });
          return result;
        },
        (error) => {
          setSeatsState({
            isLoaded: true,
            error,
          });
        }
      )
      .then((result) => {
        let occupied = result;

        function checkOccupied(seat: number) {
          return !occupied.includes(seat);
        }

        let seatsPerRow = rootStore.route.cars[0].seats;
        let flip = false;

        function htmlSeatCard(i: number) {
          return (
            <div key={i} className="seat-group">
              <label
                onClick={(e) => {
                  if (checkOccupied(i)) {
                    setActiveSeat(i);
                    toggleActiveSeat(e.target);
                  }
                }}
                className={'seat ' + (checkOccupied(i) ? 'ava' : '')}
              >
                {i}
              </label>
              <label
                onClick={(e) => {
                  if (checkOccupied(i + 1)) {
                    setActiveSeat(i + 1);
                    toggleActiveSeat(e.target);
                  }
                }}
                className={'seat ' + (checkOccupied(i + 1) ? 'ava' : '')}
              >
                {i + 1}
              </label>
            </div>
          );
        }

        for (let i = 1; i < seatsPerRow; i += 2) {
          flip = !flip;

          if (flip) {
            row1.push(htmlSeatCard(i));
          } else {
            row2.push(htmlSeatCard(i));
          }
        }
        setSeats({ isLoaded: true, row1, row2, error: null });
      });
  }, []);

  return (
    <main>
      <section id="seat">
        <div className="breadcrums">
          <span>Выбор рейса</span>
          <img src="images/vector/icons/arr-bread.svg" alt="" />
          <span className="active-bread">Выбор мест</span>
          <img src="images/vector/icons/arr-bread.svg" alt="" />
          <span>Пассажиры</span>
          <img src="images/vector/icons/arr-bread.svg" alt="" />
          <span>Оплата</span>
        </div>
        <h1>Выберите место на схеме автобуса</h1>
        <p>
          Автобус: <b>THON GUANG M6</b>
        </p>
        <div className="info">
          <div className="inf-1">
            <div></div>
            <span>- свободно</span>
          </div>
          <div className="inf-2">
            <div></div>
            <span>- занято</span>
          </div>
        </div>
        {seats.isLoaded ? (
          <>
            <div className="bus-frame">
              <div className="col1">
                <div className="row1">{seats.row1}</div>
                <div className="row2">{seats.row2}</div>
              </div>
              <div className="col2">
                <img src="images/vector/icons/steering-wheel.svg" alt="" />
              </div>
            </div>
          </>
        ) : (
          'Loading'
        )}
        {activeSeat ? (
          <Link
            to="/passengers"
            onClick={() => rootStore.setSeat(activeSeat ?? 0)}
          >
            <input type="submit" value="Продолжить" />
          </Link>
        ) : (
          ''
        )}
      </section>
    </main>
  );
}
