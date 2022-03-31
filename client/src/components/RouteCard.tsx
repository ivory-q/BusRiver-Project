import { SearchResult } from '../types/SearchResult';

export default function SearchResults(props: SearchResult) {
  return (
    <form action="/seat" className="search-card">
      <div className="badge">{props.badge}</div>
      <div className="ticket-card">
        <div className="ticket-content">
          <p className="hidden carrier">
            Перевозчик: ООО “Пассажирские перевозки”
          </p>
          <div className="ticket-group">
            <div className="col1">
              <div className="date-time">
                <div className="time">{props.time}</div>
                <div className="date">{props.date}</div>
                <div className="waste">12 час. 0 мин. в пути</div>
              </div>
              <h3 className="destination">{props.from}</h3>
              <p className="desc">
                Автостанция “Новоясеневская”, метро Новоясеневская,
                Новоясеневская тупик;...
              </p>
            </div>
            <div className="col2">
              <div className="date-time">
                <div className="time">09:00</div>
                <div className="date">7 июня</div>
                <div className="waste">12 час. 0 мин. в пути</div>
              </div>
              <h3 className="destination">{props.to}</h3>
              <p className="desc">
                Автостанция “Новоясеневская”, метро Новоясеневская,
                Новоясеневская тупик;...
              </p>
            </div>
          </div>
          <div className="separator"></div>
          <div className="price">
            <h3>
              {props.price} <b>руб</b>
            </h3>
            <div className="price-group">
              <input type="submit" value="Найти билет" />

              <span className="seats">0 мест</span>

              <input
                className="hidden altsubmit"
                type="submit"
                value="2000 руб"
              />
            </div>
          </div>
        </div>
        <div className="ticket-add">
          <div className="details">
            <img src="images/arr-down.svg" alt="" /> Детали
          </div>
          <div className="carrier">
            Перевозчик: ООО “Пассажирские перевозки”
          </div>
          <div className="bus">Автобус: {props.car}</div>

          <div className="ticket-icon">
            <img src="images/ticket.svg" alt="" />
          </div>
        </div>
      </div>
    </form>
  );
}
