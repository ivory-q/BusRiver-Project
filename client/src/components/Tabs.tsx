import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Car } from '../types/Car';
import { Reservation } from '../types/Reservation';
import { Route } from '../types/Route';

import Table from './Table';

const types = ['Маршруты', 'Транспорт', 'Билеты'];
export default function TabGroup() {
  const [active, setActive] = useState(types[0]);
  const [activeData, setActiveData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const tableRef = useRef<HTMLTableElement>();

  useEffect(() => {
    let reqMethod = 'GET';
    if (active == 'Билеты') {
      reqMethod = 'POST';
    }

    fetch(`/api/${getSource(active)}/get`, { method: reqMethod })
      .then((result) => result.json())
      .then((res) => {
        setActiveData(res);
        setIsLoaded(true);
      });

    return () => {};
  }, [active, updateTrigger]);

  function getSource(active: string) {
    let source;
    switch (active) {
      case 'Маршруты':
        source = 'route';
        break;
      case 'Транспорт':
        source = 'car';
        break;
      case 'Билеты':
        source = 'reservation';
        break;
    }
    return source;
  }

  async function deleteFromTable(id: number, table: string) {
    console.log('delete ', id, 'from ', table);
    await fetch(`/api/${table}/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
      }),
    }).then(() => {
      setUpdateTrigger(Math.random());
    });
  }

  function getActive(active: string) {
    let flat;
    switch (active) {
      case 'Маршруты':
        activeData as Array<Route>;
        flat = activeData.map((data: Route) => {
          return { ...data, cars: data.cars.map((car) => car.id + ', ') };
        });
        return (
          <Table
            data={flat}
            source={getSource(active)}
            tableRef={tableRef}
            trigger={setUpdateTrigger}
            deleteAction={(row: Route) => {
              if (row.id) deleteFromTable(row.id, 'route');
            }}
          />
        );
      case 'Транспорт':
        return (
          <Table
            data={activeData}
            source={getSource(active)}
            tableRef={tableRef}
            trigger={setUpdateTrigger}
            deleteAction={(row: Car) => {
              if (row.id) deleteFromTable(row.id, 'car');
            }}
          />
        );
      case 'Билеты':
        activeData as Array<Reservation>;
        flat = activeData.map((data: Reservation) => {
          return { ...data, route: data.route?.id };
        });
        return (
          <Table
            data={flat}
            source={getSource(active)}
            tableRef={tableRef}
            trigger={setUpdateTrigger}
            deleteAction={(row: Reservation) => {
              if (row.id) deleteFromTable(row.id, 'reservation');
            }}
          />
        );
    }
  }

  return (
    <>
      <div className="tabs">
        {types.map((type) => (
          <button
            key={type}
            className={active === type ? 'active' : ''}
            onClick={() => {
              if (type != active) {
                setIsLoaded(false);
                setActive(type);
              }
            }}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="table">
        {' '}
        {isLoaded && activeData.length > 0 ? (
          getActive(active)
        ) : (
          <Table
            data={[]}
            source={getSource(active)}
            tableRef={tableRef}
            trigger={setUpdateTrigger}
            deleteAction={(row: Reservation) => {
              if (row.id) deleteFromTable(row.id, 'reservation');
            }}
          />
        )}{' '}
      </div>
    </>
  );
}
