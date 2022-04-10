import { useNavigate } from 'react-router-dom';
import { rootStore } from '../stores/index.store';
import '../styles/purchase.css';

import { Reservation } from '../types/Reservation';

export default function Payment() {
  const navigator = useNavigate();

  return (
    <main>
      <section id="payment">
        <div className="breadcrums">
          <span>Выбор рейса</span>
          <img src="images/vector/icons/arr-bread.svg" alt="" />
          <span>Выбор мест</span>
          <img src="images/vector/icons/arr-bread.svg" alt="" />
          <span>Пассажиры</span>
          <img src="images/vector/icons/arr-bread.svg" alt="" />
          <span className="active-bread">Оплата</span>
        </div>
        <form
          className="global-form"
          onSubmit={async (e) => {
            e.preventDefault();
            let newReservation: Reservation = {
              person: rootStore.buyer,
              time: rootStore.route.time,
              seat: rootStore.seat,
              route: rootStore.route,
            };
            try {
              await fetch('/api/reservation/create', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  reservation: newReservation,
                  routeId: rootStore.route?.id,
                }),
              });
              navigator('/result');
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <div className="form-col1">
            <div className="form-card">
              <div className="header">
                <h2>Оплата</h2>
              </div>
              <div className="divider"></div>
              <div className="pay-group">
                <div className="payment-form">
                  <div className="payment-form-group">
                    <div className="d-group">
                      <div className="inp-group">
                        <label htmlFor="">Номер карты</label>
                        <input
                          placeholder="xxxx-xxxx-xxxx-xxxx"
                          type="text"
                          name=""
                          id=""
                          required
                        />
                      </div>
                      <div className="inp-group">
                        <label htmlFor="">Срок истечения</label>
                        <input type="text" placeholder="мм/гг" required />
                      </div>
                      <div className="inp-group">
                        <label htmlFor="">CVV</label>
                        <input type="text" placeholder="xxx" required />
                      </div>
                    </div>
                    <div className="security">
                      <div className="payment-icons">
                        <img
                          src="images/vector/payment/logos_visa.svg"
                          alt=""
                        />
                        <img
                          src="images/vector/payment/logo_mastercard.svg"
                          alt=""
                        />
                        <img
                          src="images/vector/payment/logos_paypal.svg"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="recepit">
                  <div className="row1">
                    <div className="time">
                      <span>{rootStore.route.time}</span>
                      <br />
                      <span>{rootStore.route.date}</span>
                    </div>
                    <div className="marker">
                      <div></div>
                    </div>
                    <div className="place">
                      <h4>{rootStore.route.from}</h4>
                      <p>
                        Автостанция “Новоясеневская”, метро Новоясеневская,
                        Новоясеневская тупик;
                      </p>
                    </div>
                  </div>
                  <div className="row2">
                    <div className="time">
                      <span>
                        {Number(rootStore.route.time?.split(':')[0]) + 3}:00
                      </span>
                      <br />
                      <span>{rootStore.route.date}</span>
                    </div>
                    <div className="marker">
                      <div></div>
                    </div>
                    <div className="place">
                      <h4>{rootStore.route.to}</h4>
                      <p>
                        Автостанция “Новоясеневская”, метро Новоясеневская,
                        Новоясеневская тупик;
                      </p>
                    </div>
                  </div>
                  <div className="total2">
                    <span>
                      <b>К оплате</b>
                      <br />
                      (1 взрослый)
                    </span>
                    <span>{rootStore.route.price} руб</span>
                  </div>
                </div>
              </div>
              <div className="divider"></div>
              <div className="btn-group">
                <span>{rootStore.route.price} руб</span>
                <input type="submit" value="Оплатить" />
                <div className="sec-sub-info">
                  <img src="images/vector/icons/shield-lock.svg" alt="" />
                  <p>Ваши платежные и личные данные надежно защищены</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
