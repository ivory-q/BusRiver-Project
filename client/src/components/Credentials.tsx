import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../stores/index.store';

import '../styles/passengers.css';

export default function Credentials() {
  const rootStore = useStore();
  const navigator = useNavigate();

  let [seat, setSeat] = useState(0);
  let [buyer, setBuyer] = useState({ name: '', surname: '' });

  useEffect(() => {
    setSeat(rootStore.seat);
  }, []);

  return (
    <>
      <main>
        <section id="passenger">
          <div className="breadcrums">
            <span>Выбор рейса</span>
            <img src="images/vector/icons/arr-bread.svg" alt="" />
            <span>Выбор мест</span>
            <img src="images/vector/icons/arr-bread.svg" alt="" />
            <span className="active-bread">Пассажиры</span>
            <img src="images/vector/icons/arr-bread.svg" alt="" />
            <span>Оплата</span>
          </div>
          <form
            className="global-form"
            onSubmit={(e) => {
              e.preventDefault();
              rootStore.setBuyer(buyer.name + ' ' + buyer.surname);
              navigator('/payment');
            }}
          >
            <div className="form-col1">
              <div className="form-card">
                <h2>Оформление билета</h2>
                <p>
                  Указанные данные необходимы для совершения бронирования и
                  будут проверены при посадке в автобус
                </p>
                <div className="d-group">
                  <div className="inp-group">
                    <label htmlFor="">Фамилия</label>
                    <input
                      placeholder="Иванов"
                      type="text"
                      name=""
                      id=""
                      required
                      onInput={(e) => {
                        let elem = e.target as HTMLInputElement;
                        setBuyer({ ...buyer, surname: elem.value });
                      }}
                    />
                  </div>
                  <div className="inp-group">
                    <label htmlFor="">Имя</label>
                    <input
                      placeholder="Иван"
                      type="text"
                      name=""
                      id=""
                      required
                      onInput={(e) => {
                        let elem = e.target as HTMLInputElement;
                        setBuyer({ ...buyer, name: elem.value });
                      }}
                    />
                  </div>
                </div>
                <div className="d-group">
                  <div className="inp-group">
                    <label htmlFor="">Отчество</label>
                    <input placeholder="Иванович" type="text" name="" id="" />
                  </div>
                  <div className="inp-group">
                    <label htmlFor="">Дата рождения</label>
                    <input placeholder="дд.мм.гггг" type="text" name="" id="" />
                  </div>
                </div>
                <div className="d-group">
                  <div className="inp-group">
                    <label htmlFor="">Пол</label>
                    <select name="" id="">
                      <option value="m">Мужской</option>
                      <option value="f">Женский</option>
                    </select>
                  </div>
                  <div className="inp-group">
                    <label htmlFor="">Гражданство</label>
                    <select name="" id="">
                      <option value="r">Российская Федерация</option>
                      <option value="u">Украина</option>
                      <option value="y">Узбекистан</option>
                    </select>
                  </div>
                </div>

                <div className="d-group">
                  <div className="inp-group">
                    <label htmlFor="">Документ</label>
                    <select name="" id="">
                      <option value="p">Паспорт</option>
                      <option value="c">Студенческий билет</option>
                      <option value="v">Водительское удостоверение</option>
                    </select>
                  </div>
                  <div className="inp-group">
                    <label htmlFor="">Номер документа</label>
                    <input
                      placeholder="серия и номер: 10 цифр"
                      type="text"
                      name=""
                      id=""
                    />
                  </div>
                </div>
                <div className="d-group">
                  <div className="inp-group seat-group">
                    <label htmlFor="">Место в автобусе</label>
                    <div className="seat-place">
                      <img src="images/vector/icons/seat.svg" alt="" />
                      <span>Место: {seat}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-card">
                <h2>Оформление билета</h2>
                <p>
                  Указывайте корректные e-mail и номер телефона, т.к. они
                  необходимы для идентификации пользователя, получения билета,
                  возможности авторизации в ЛК и возможности вернуть билет.
                </p>
                <div className="d-group">
                  <div className="inp-group">
                    <label htmlFor="">E-mail</label>
                    <input
                      placeholder="ivanovpetr@mail.ru"
                      type="email"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="inp-group">
                    <label htmlFor="">Телефон</label>
                    <input
                      type="tel"
                      placeholder="+7 ___ ___-__-__"
                      id="phone"
                      name="phone"
                    />
                  </div>
                </div>
              </div>
              <div className="form-card">
                <div className="header">
                  <h2>К оплате</h2>
                  <h2>{rootStore.route.price} руб</h2>
                </div>
                <div className="divider"></div>
                <div className="security">
                  <p className="sec-text">
                    Ваши платежные и личные данные надежно защищены в
                    соответствии с международными стандартами безопасности.
                  </p>
                  <div className="payment-icons">
                    <img src="images/vector/payment/logos_visa.svg" alt="" />
                    <img
                      src="images/vector/payment/logo_mastercard.svg"
                      alt=""
                    />
                    <img src="images/vector/payment/logos_paypal.svg" alt="" />
                  </div>
                </div>
                <div className="d-group col">
                  <div className="inp-group">
                    <label className="container">
                      <input type="checkbox" defaultChecked={true} />
                      <span className="checkmark"></span>
                    </label>
                    <label htmlFor="">
                      Я принимаю условия
                      <b>Пользовательского соглашения</b> (публичной оферты) и
                      <b>политики конфиденциальности</b>.
                    </label>
                  </div>
                  <div className="inp-group">
                    <label className="container">
                      <input type="checkbox" defaultChecked={true} />
                      <span className="checkmark"></span>
                    </label>
                    <label htmlFor="">
                      Я даю
                      <b>согласие на обработку персональных данных</b>.
                    </label>
                  </div>
                </div>
              </div>
              <div className="btn-group">
                <input type="submit" value="Перейти к оплате" />
                <div className="sec-sub-info">
                  <img src="images/vector/icons/shield-lock.svg" alt="" />
                  <p>Ваши платежные и личные данные надежно защищены</p>
                </div>
              </div>
            </div>
            <div className="form-col2">
              <div className="recepit">
                <h2>О рейсе</h2>
                <div className="divider"></div>
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
                <div className="total1">
                  <div>Цена:</div>
                  <div>{rootStore.route.price} руб</div>
                </div>
                <div className="total2">
                  <span>
                    <b>К оплате</b>
                    <br />
                    (1 взрослый)
                  </span>
                  <span>{rootStore.route.price} руб</span>
                </div>
                <div className="divider"></div>
                <div className="return-ticket">
                  <a href="">Условия возврата</a>
                </div>
              </div>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
