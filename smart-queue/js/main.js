'use strict';
window.onload = () => {
  const url = 'https://15000pvl.kz/smartqueue';

  const countApartment = document.querySelector('#sub_title'),
    main_content = document.querySelector('#main_content');

  let numberRooms = 0;
  let apply = null;

  function request(url) {
    return axios.get(url);
  }

  function diabledBtn(btn) {
    btn.setAttribute('disabled', 'disabled');
    btn.style.opacity = '0.5';
  }

  function enableBtn(btn) {
    btn.removeAttribute('disabled');
    btn.style.opacity = '10';
  }

  //События при клике на квартиру
  function actions() {
    apply = document.querySelector('.apply');
    const apartments = document.querySelectorAll('.apartment '),
      button_filters = document.querySelectorAll('.button_filters'),
      popup_window_apply = document.querySelector('.popup_window_apply'),
      openWindowApply = document.getElementById('openWindowApply'),
      body = document.querySelector('body'),
      popup_apply_close = document.querySelector('#popup_apply_close'),
      popup_apply_close_done = document.querySelector('#popup_apply_close_done'),
      popup_apply_close_done_btn = document.querySelector('#popup_apply_close_done_btn'),
      popup_apply_phone_close = document.querySelector('#popup_apply_phone_close'),
      popup = document.querySelector('#popup'),
      popup_phone = document.querySelector('#popup_phone'),
      iin = document.getElementById('iin'),
      name = document.getElementById('name'),
      surname = document.getElementById('surname'),
      patronymic = document.getElementById('patronymic'),
      phone = document.getElementById('phone'),
      iinR = document.getElementById('iinR'),
      nameR = document.getElementById('nameR'),
      surnameR = document.getElementById('surnameR'),
      patronymicR = document.getElementById('patronymicR'),
      phoneR = document.getElementById('phoneR'),
      sendAplycation = document.querySelector('#sendAplycation'),
      form_confirm = document.querySelector('#form_confirm'),
      sms = document.querySelector('#code'),
      popup_done = document.querySelector('.popup_done'),
      popup_apply_close_error = document.querySelector('#popup_apply_close_error'),
      popup_error = document.querySelector('#popup_error'),
      popup_apply_close_error_btn = document.querySelector('#popup_apply_close_error_btn'),
      popup_title_err = document.querySelector('#popup_title_err'),
      popup_title_done = document.querySelector('#popup_title_done'),
      popup_reserv = document.querySelector('#popup_reserv'),
      btn_reserv = document.querySelector('#btn_reserv'),
      button_filters_res = document.querySelectorAll('.button_filters_res'),
      reserv_next = document.querySelector('#reserv_next'),
      popup_reserv_app = document.querySelector('#popup_reserv_app'),
      sendAplycation_reserv = document.querySelector('#sendAplycation_reserv'),
      maskIin = {
        mask: '000000000000',
      },
      maskPhone = {
        mask: '+70000000000',
      };

    //InputMask
    IMask(iin, maskIin);
    IMask(document.getElementById('phone'), maskPhone);
    IMask(iinR, maskIin);
    IMask(document.getElementById('phoneR'), maskPhone);

    button_filters.forEach((targetClick, i) => {
      button_filters.forEach((noTarget, k) => {
        targetClick.addEventListener('click', (e) => {
          if (targetClick == noTarget) {
            numberRooms = targetClick.getAttribute('data-countRoom');
            targetClick.classList.add('active');
          } else {
            noTarget.classList.remove('active');
          }
        });
      });
    });

    //Получение инфы квартиры, при клике на квартиру для модального окна
    let idAppartment = 0,
      room = 0,
      square = 0,
      floor = 0;

    apartments.forEach((targetClick, i) => {
      apartments.forEach((noTarget, k) => {
        targetClick.addEventListener('click', (e) => {
          if (targetClick == noTarget) {
            if (targetClick.getAttribute('data-status') != 1) {
              idAppartment = targetClick.getAttribute('data-id');
              room = targetClick.getAttribute('data-room');
              square = targetClick.getAttribute('data-square');
              floor = targetClick.getAttribute('data-floor');
              targetClick.classList.add('active_apartment');
              apply.classList.remove('hidden');
            } else {
              apply.classList.add('hidden');
            }
          } else {
            noTarget.classList.remove('active_apartment');
          }
        });
      });
    });

    //Вставка полученной инфы квартиры в модальное окно при открытии
    openWindowApply.addEventListener('click', () => {
      body.style.overflow = 'hidden';
      popup_reserv.classList.add('hidden');
      popup.classList.remove('hidden');
      document.querySelector('#room').innerHTML = `кол-во комнат: <b>${room}</b>`;
      document.querySelector('#square').innerHTML = `площадь (м2): <b>${square}</b>`;
      document.querySelector('#floor').innerHTML = `этаж: <b>${floor}</b>`;
      popup_window_apply.classList.remove('hidden');
    });

    //Функция закрытия попап
    function closePopup(btnPopupClose, close, open) {
      btnPopupClose.addEventListener('click', () => {
        apply.classList.add('hidden');
        body.style.overflow = '';
        popup_window_apply.classList.add('hidden');
        apartments.forEach((noTarget, k) => {
          // noTarget.classList.remove("active_apartment")
        });
        if (close) {
          close.classList.add('hidden');
          open.classList.remove('hidden');
          // location.reload();
        }
      });
    }

    closePopup(popup_apply_close);
    closePopup(popup_apply_close_done, popup_done);
    closePopup(popup_apply_close_done_btn, popup_done);
    closePopup(popup_apply_phone_close, popup_phone, popup_reserv);
    closePopup(popup_apply_close_error, popup_error, popup);
    closePopup(popup_apply_close_error_btn, popup_error, popup);
    closePopup(popup_reserve_close);
    closePopup(popup_apply_close_reserv_app, popup_reserv_app, popup_reserv);

    //Заявка
    document.querySelector('#form').onsubmit = (e) => {
      e.preventDefault();
      if (
        name.value != '' &&
        surname.value != '' &&
        phone.value != '' &&
        iin.value != '' &&
        patronymic.value != ''
      ) {
        if (
          document.querySelector('#data_processing').checked &&
          document.querySelector('#citizenRK').checked
        ) {
          diabledBtn(sendAplycation);
          let formData = new FormData(form);
          formData.append('home', idAppartment);
          formData.append('phone', phone.value.slice(1));
          formData.append(
            'name',
            document.getElementById('surname').value +
              ' ' +
              document.getElementById('name').value +
              ' ' +
              document.getElementById('patronymic').value,
          );
          axios(`${url}/api/sendRequest.php`, {
            method: 'POST',
            data: formData,
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then(function (res) {
              if (res.data == true) {
                popup.classList.toggle('hidden');
                popup_phone.classList.toggle('hidden');
              } else {
                popup.classList.toggle('hidden');
                popup_error.classList.toggle('hidden');
                popup_title_err.innerHTML = res.data;
                if (
                  res.data == 'Такой ИИН или номер уже использовался ' ||
                  res.data == 'Вы уже встали в резерв'
                ) {
                  document.querySelector('#popup_apply_close_error_btn').innerText = 'Закрыть';
                }
              }
              enableBtn(sendAplycation);
            })
            .catch(function (error) {
              enableBtn(sendAplycation);
              console.log(error);
            });
        } else {
          alert('Согласитесь с условиями заявки!');
        }
      } else {
        alert('Проверьте заполнены ли все поля и повторите попытку!');
      }
    };

    //Отправка sms
    form_confirm.onsubmit = (e) => {
      e.preventDefault();

      if (sms.value != '') {
        let formData = new FormData(document.querySelector('#form_confirm'));

        //Проверка на что отправляется смс true значит бронь, false это резерв
        if (!document.querySelector('#popup_apply_confirm_btn').getAttribute('data-res')) {
          formData.append('phone', phone.value.slice(1));
          axios(`${url}/api/acceptSms.php`, {
            method: 'POST',
            data: formData,
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then(function (res) {
              if (res.data.substr(0, 4) == 'Ваша') {
                popup_phone.classList.toggle('hidden');
                popup_done.classList.toggle('hidden');
                popup_title_done.innerHTML = res.data;
              }
              if (res.data == 'Данные введены не правильно') {
                alert('Код неверный!');
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          formData.append('phone', phoneR.value.slice(1));
          axios(`${url}/api/confirmreservesms.php`, {
            method: 'POST',
            data: formData,
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then(function (res) {
              if (res.data.substr(0, 4) == 'Ваша') {
                popup_phone.classList.toggle('hidden');
                popup_done.classList.toggle('hidden');
                popup_title_done.innerHTML = res.data;
              }
              if (res.data == 'Данные введены не правильно') {
                alert('Код неверный!');
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      } else {
        alert('Введите код из SMS!');
      }
    };

    //Резерв
    btn_reserv.addEventListener('click', () => {
      popup.classList.add('hidden');
      popup_window_apply.classList.remove('hidden');
      popup_reserv.classList.remove('hidden');
    });

    if (room == 0) {
      diabledBtn(reserv_next);
    }

    button_filters_res.forEach((targetClick, i) => {
      button_filters_res.forEach((noTarget, k) => {
        targetClick.addEventListener('click', (e) => {
          if (targetClick == noTarget) {
            room = targetClick.getAttribute('data-countroom');
            targetClick.classList.add('active');
            enableBtn(reserv_next);
          } else {
            noTarget.classList.remove('active');
          }
        });
      });
    });

    //Заявка на резерв
    reserv_next.addEventListener('click', () => {
      popup_reserv.classList.add('hidden');
      document.querySelector('#popup_title_reserv_app').innerHTML = `кол-во комнат: ${room}`;
      popup_reserv_app.classList.remove('hidden');
    });

    document.querySelector('#form_reserv').onsubmit = (e) => {
      e.preventDefault();
      if (
        nameR.value != '' &&
        surnameR.value != '' &&
        phoneR.value != '' &&
        iinR.value != '' &&
        patronymicR.value != ''
      ) {
        if (
          document.querySelector('#data_processing_res').checked &&
          document.querySelector('#citizenRK_res').checked
        ) {
          diabledBtn(sendAplycation_reserv);
          let formData = new FormData(document.querySelector('#form_reserv'));
          formData.append('rooms', room);
          formData.append('phone', phoneR.value.slice(1));
          formData.append(
            'name',
            document.getElementById('surnameR').value +
              ' ' +
              document.getElementById('nameR').value +
              ' ' +
              document.getElementById('patronymicR').value,
          );
          axios(`${url}/api/Reserve.php`, {
            method: 'POST',
            data: formData,
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then(function (res) {
              if (res.data == 1) {
                document.querySelector('#popup_apply_confirm_btn').setAttribute('data-res', 'res');
                popup_reserv_app.classList.toggle('hidden');
                popup_phone.classList.toggle('hidden');
              } else {
                popup_reserv_app.classList.toggle('hidden');
                popup_error.classList.toggle('hidden');
                popup_title_err.innerHTML = res.data;
                if (res.data == 'Вы уже забронировали квартиру') {
                  document.querySelector('#popup_apply_close_error_btn').innerText = 'Закрыть';
                }
              }
              enableBtn(sendAplycation_reserv);
            })
            .catch(function (error) {
              enableBtn(sendAplycation_reserv);
              console.log(error);
            });
        } else {
          alert('Согласитесь с условиями заявки!');
        }
      } else {
        alert('Проверьте заполнены ли все поля и повторите попытку!');
      }
    };
  }

  //Получение кол-во квартир
  request(`${url}/api/AmountFlats.php`)
    .then((res) => {
      const data = res.data;
      countApartment.innerText = `Доступно квартир:${data.amount}`;
    })
    .catch((error) => console.log(error));
  let apartmentCountRoom_1 = 0,
    apartmentCountRoom_2 = 0,
    apartmentCountRoom_3 = 0;

  //Функция для получения квартир
  async function getApartment(fliter = null, floorMin = null, floorMax = null, rooms = null) {
    await request(
      `${url}/api/ShowFlats.php?${fliter != null && 'filtr=true'}&${
        floorMin != null && 'floormin=' + floorMin
      }&${floorMax != null && 'floormax=' + floorMax}&${rooms != null && 'rooms=' + rooms} `,
    ).then((res) => {
      main_content.innerHTML = '';
      res = Object.entries(res.data).map((el) => el[1]);

      res.forEach((el) => {
        el[1].filter((a) => a.status == 1 && a.rooms == 1).length
          ? (apartmentCountRoom_1 += 1)
          : null;
        el[2].filter((a) => a.status == 1 && a.rooms == 2).length
          ? (apartmentCountRoom_2 += 1)
          : null;
        el[3].filter((a) => a.status == 1 && a.rooms == 3).length
          ? (apartmentCountRoom_3 += 1)
          : null;

        if (apartmentCountRoom_1 == 9) {
          diabledBtn(document.querySelectorAll('.button_filters')[0]);
        }
        if (apartmentCountRoom_2 == 9) {
          diabledBtn(document.querySelectorAll('.button_filters')[1]);
        }
        if (apartmentCountRoom_3 == 9) {
          diabledBtn(document.querySelectorAll('.button_filters')[2]);
        }

        main_content.innerHTML += `
      <div div class="scroll_content" >
      <div class="left_sidebar"  ${
        el[1].length == el[1].filter((a) => a.status == 1).length &&
        el[2].length == el[2].filter((a) => a.status == 1).length &&
        el[3].length == el[3].filter((a) => a.status == 1).length &&
        'style="opacity: 0.5;"'
      } >
        ${el[1][0].floor}-Этаж
      </div>
      <div class="entrances" >
        <div class="number_entrance" id="1_entrance">
          <div class="entrance">
            <p>1 - подъезд</p>
          </div>
          ${el['1']
            .map(
              (el) => `
            <div class="apartment " ${el.status == 1 && 'style="opacity: 0.5;"'} data-status=${
                el.status
              } data-id=${el.id} data-room=${el.rooms} data-square=${el.square} data-floor=${
                el.floor
              }>
            <div class="count_number">${el.rooms}-комнатная</div>
            <div class="info_apartment">
              <span>${el.name}</span>
              <span>общая прощадь: ${el.square}</span>
            </div>
            </div>      
        `,
            )
            .join('')}
        </div >

        <div class="number_entrance" id="2_entrance">
          <div class="number_entrance">
            <p>2 - подъезд</p>
          </div>
          ${el['2']
            .map(
              (el) => `
            <div class="apartment" ${el.status == 1 && 'style="opacity: 0.5;"'} data-status=${
                el.status
              } data-id=${el.id} data-room=${el.rooms} data-square=${el.square} data-floor=${
                el.floor
              }>
            <div class="count_number">${el.rooms}-комнатная</div>
            <div class="info_apartment">
              <span>${el.name}</span>
              <span>общая прощадь: ${el.square}</span>
            </div>
            </div>      
        `,
            )
            .join('')}

        </div>

        <div class="number_entrance" id="3_entrance">
          <div class="number_entrance">
            <p>3 - подъезд</p>
          </div>
          ${el['3']
            .map(
              (el) => `
          <div class="apartment" ${el.status == 1 && 'style="opacity: 0.5;"'} data-status=${
                el.status
              } data-id=${el.id} data-room=${el.rooms} data-square=${el.square} data-floor=${
                el.floor
              }>
          <div class="count_number">${el.rooms}-комнатная</div>
          <div class="info_apartment">
            <span>${el.name}</span>
            <span>общая прощадь: ${el.square}</span>
          </div>
          </div>      
      `,
            )
            .join('')}
        </div>
      </div >
    </div >`;
      });
    });
    apartmentCountRoom_1 = 0;
    apartmentCountRoom_2 = 0;
    apartmentCountRoom_3 = 0;
    await actions();
  }

  //Кнопка для фильтра
  btn_filters.addEventListener('click', (e) => {
    e.target.setAttribute('disabled', 'disabled');
    e.target.style.background = '#00189752';
    apply.classList.add('hidden');
    setTimeout(() => {
      e.target.removeAttribute('disabled', 'disabled');
      e.target.style.background = '#001897';
    }, 1000);
    main_content.innerHTML = '';
    getApartment(
      true,
      document.querySelector('#befFloor').value,
      document.querySelector('#aftFloor').value,
      numberRooms,
    );
    // numberRooms = 0;
  });

  getApartment();
};
