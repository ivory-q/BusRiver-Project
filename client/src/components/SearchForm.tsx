import '../styles/search.css'

export default function SearchForm() {
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
                  <input placeholder="5 июня" type="text" name="date" id="" />
                  <img
                    src="images/vector/icons/calendar.svg"
                    alt=""
                  />
                </div>
              </div>
              <div className="search-inp">
                <span className="search-inp-hint">Пассажиры</span>
                <br />
                <div>
                  <input placeholder="1 взрослый" type="text" name="pass" id="" />
                  <img
                    src="images/vector/icons/bi_person.svg"
                    alt=""
                  />
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
