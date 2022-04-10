// import { SearchResult } from '../types/SearchResult';
import { Link } from 'react-router-dom';

import { useStore } from '../stores/index.store';
import { Route } from '../types/Route';

interface SearchRouteProps {
  route: Route;
}

export default function SearchResults({ route }: SearchRouteProps) {
  const rootStore = useStore();

  return (
    <div className="search-card">
      {route.badge ? (
        <div
          className={
            route.badge == 'Можно не печатать' ? 'no-ticket badge' : 'badge'
          }
        >
          {route.badge}
        </div>
      ) : (
        ' '
      )}

      <div
        className={
          route.badge == 'Можно не печатать'
            ? 'no-ticket ticket-card'
            : 'ticket-card'
        }
      >
        <div className="ticket-content">
          <p className="hidden carrier">
            Перевозчик: ООО “Пассажирские перевозки”
          </p>
          <div className="ticket-group">
            <div className="col1">
              <div className="date-time">
                <div className="time">{route.time}</div>
                <div className="date">{route.date}</div>
                <div className="waste">12 час. 0 мин. в пути</div>
              </div>
              <h3 className="destination">{route.from}</h3>
              <p className="desc">
                Автостанция “Новоясеневская”, метро Новоясеневская,
                Новоясеневская тупик;...
              </p>
            </div>
            <div className="col2">
              <div className="date-time">
                <div className="time">
                  {Number(route.time?.split(':')[0]) + 3}:00
                </div>
                <div className="date">{route.date}</div>
                <div className="waste">3 час. 0 мин. в пути</div>
              </div>
              <h3 className="destination">{route.to}</h3>
              <p className="desc">
                Автостанция “Новоясеневская”, метро Новоясеневская,
                Новоясеневская тупик;...
              </p>
            </div>
          </div>
          <div className="separator"></div>
          <div className="price">
            <h3>
              {route.price} <b>руб</b>
            </h3>
            <div className="price-group">
              <Link
                to="/seat"
                className="desk"
                onClick={() => {
                  rootStore.setRoute(route);
                }}
              >
                <input type="submit" value="Найти билет" />
              </Link>

              <span className="seats">{route?.cars[0]?.seats} мест</span>
              <Link
                to="/seat"
                onClick={() => {
                  rootStore.setRoute(route);
                }}
              >
                <input
                  className="hidden altsubmit"
                  type="submit"
                  value="2000 руб"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="ticket-add">
          <div className="details">
            <img src="images/vector/icons/arr-down.svg" alt="" /> Детали
          </div>
          <div className="carrier">
            Перевозчик: ООО “Пассажирские перевозки”
          </div>
          <div className="bus">Автобус: {route?.cars[0]?.name}</div>

          <div className="ticket-icon">
            <img src="images/vector/icons/ticket.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
