import { rootStore } from '../stores/index.store';
import '../styles/success.css';

export default function Result() {
  return (
    <main>
      <section id="result">
        <div className="breadcrums">
          <span>Выбор рейса</span>
          <img src="images/vector/icons/arr-bread.svg" alt="" />
          <span>Выбор мест</span>
          <img src="images/vector/icons/arr-bread.svg" alt="" />
          <span>Пассажиры</span>
          <img src="images/vector/icons/arr-bread.svg" alt="" />
          <span className="active-bread">Оплата</span>
        </div>
        <form className="global-form" action="./success.html">
          <div className="form-col1">
            <div className="form-card">
              <div className="header">
                <h2>Успех !</h2>
                <p>
                  Ваш билет был забронирован и был отправлен в электронной форме
                  на указанный ранее E-mail адрес
                </p>
              </div>
              <div className="pay-group">
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
                <div className="payment-form">
                  <img src="images/vector/icons/success.svg" alt="" />
                </div>
              </div>
              <div className="btn-group">
                <a href="/">Вернуться на главную</a>
                <a
                  href="http://mail.google.com/mail"
                  className="accent"
                  target="_blank"
                >
                  Просмотреть
                </a>
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
