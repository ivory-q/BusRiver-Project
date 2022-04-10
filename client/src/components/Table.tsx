import { useEffect, useRef, useState } from 'react';
import '../styles/admin.scss';

import { Car } from '../types/Car';
import { Route } from '../types/Route';

export default function Table(props: any) {
  let [addState, setAddState] = useState(false);
  let addFormRef = useRef<HTMLTableRowElement>(null);

  let deleteAction = props.deleteAction || (() => {});

  function getKeys() {
    let data: any;
    if (!props.data[0]) {
      switch (props.source) {
        case 'route':
          data = {
            id: 0,
            badge: '',
            from: '',
            to: '',
            date: '',
            time: '',
            price: 0,
            cars: '',
          };
          break;
        case 'reservation':
          data = {
            id: 0,
            person: '',
            time: '',
            seat: 0,
            route: '',
          };
          break;
        case 'car':
          data = { id: 0, name: '', seats: 0 };
          break;
      }
    } else {
      data = props.data[0];
    }
    return Object.keys(data);
  }

  function getHeader() {
    var keys = getKeys();
    return keys.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  function ApiCreate(source: string, data: any) {
    switch (source) {
      case 'route':
        fetch(`/api/${source}/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            route: { ...data },
            carsIds: [data.cars],
          }),
        }).then(() => {
          props.trigger(Math.random());
          setAddState(false);
        });
        break;
      case 'reservation':
        fetch(`/api/${source}/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reservation: { ...data },
            routeId: data.route,
          }),
        }).then(() => {
          props.trigger(Math.random());
          setAddState(false);
        });
        break;
      case 'car':
        fetch(`/api/${source}/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            car: { ...data },
          }),
        }).then(() => {
          props.trigger(Math.random());
          setAddState(false);
        });
        break;
    }
  }

  function getRowsData() {
    var items = props.data;
    var keys = getKeys();
    let rows = items.map((row: any, index: any) => {
      return (
        <tr key={index} className={'tr tr' + index}>
          <RenderRow key={index} data={row} keys={keys} />
          <button
            className={'deleteTr' + index}
            onClick={() => {
              deleteAction(row);
            }}
          >
            X
          </button>
        </tr>
      );
    });
    rows.push(
      <tr ref={addFormRef} className={!addState ? 'hide' : ''}>
        <RenderForm keys={keys} />
        <button
          className={'accept'}
          onClick={() => {
            let current = addFormRef.current as HTMLElement;

            let inputsValues: any = [];
            keys.forEach((key) => {
              if (key == 'id') return;
              let input: HTMLInputElement | null = current.querySelector(
                '.addInp__' + key
              );
              inputsValues[key] = input?.value;
            });
            ApiCreate(props.source, inputsValues);
          }}
        >
          OK
        </button>
      </tr>
    );
    return rows;
  }

  return (
    <>
      <div className="tableCont">
        <table ref={props.tableRef}>
          <thead>
            <tr>{getHeader()}</tr>
          </thead>
          <tbody>{getRowsData()}</tbody>
        </table>
        <input
          type="submit"
          className={addState ? 'hide' : ''}
          value="Добавить"
          onClick={() => {
            if (addState) {
              setAddState(false);
            } else {
              setAddState(true);
            }
          }}
        ></input>
        <input
          type="submit"
          className={!addState ? 'hide' : ''}
          value="Отменить"
          onClick={() => {
            if (addState) {
              setAddState(false);
            } else {
              setAddState(true);
            }
          }}
        ></input>
      </div>
    </>
  );
}

const RenderForm = (props: any) => {
  let [carOptions, setCarOptions] = useState<Array<HTMLElement>>([]);
  let [routeOptions, setRouteOptions] = useState<Array<HTMLElement>>([]);

  useEffect(() => {
    fetch('/api/car/get')
      .then((res) => res.json())
      .then((res) => {
        let options = res.map((car: Car, index: number) => {
          return (
            <option key={index} value={car.id}>
              {car.id + ': ' + car.name}
            </option>
          );
        });
        setCarOptions(options);
      });

    fetch('/api/route/get')
      .then((res) => res.json())
      .then((res) => {
        let options = res.map((route: Route, index: number) => {
          return (
            <option key={index} value={route.id}>
              {route.id + ': ' + route.from + ' -> ' + route.to}
            </option>
          );
        });
        setRouteOptions(options);
      });
    return () => {};
  }, []);

  return props.keys.map((key: any, index: any) => {
    switch (key) {
      case 'id':
        return <td key={index}>auto</td>;
      case 'cars':
        return (
          <td key={index}>
            <select className={'addInp__' + key}>
              {carOptions
                ? carOptions.map((option) => {
                    return option;
                  })
                : ''}
            </select>
          </td>
        );
      case 'route':
        return (
          <td key={index}>
            <select className={'addInp__' + key}>
              {routeOptions
                ? routeOptions.map((option) => {
                    return option;
                  })
                : ''}
            </select>
          </td>
        );

      default:
        return (
          <td key={index}>
            <input type="text" id="key" className={'addInp__' + key} />
          </td>
        );
    }
  });
};

const RenderRow = (props: any) => {
  return props.keys.map((key: any, index: any) => {
    return <td key={index}>{props.data[key]}</td>;
  });
};
