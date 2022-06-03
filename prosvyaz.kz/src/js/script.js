window.addEventListener('DOMContentLoaded', function () {

  new WOW().init();

  const gallery = document.querySelector('.gallery');

  let tabs = document.querySelector('.tabs'),
    items = document.querySelector('.items'),
    nameRubrika = document.querySelectorAll('.name-rubrika'),
    hr = document.querySelector('.hrr'),
    catalog = document.querySelector('#catalog'),
    id = 0,
    formData = new FormData();

  //Функция удаления товара
  function deleteCart() {
    setTimeout(() => {
      let cardB = document.querySelectorAll('#card-button');
      cardB.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const target = e.target;
          let id = target.dataset.id;
          let idCart = new FormData();
          idCart.append("id", id);
          fetch(`api/deleteCarts.php`, {
            method: "post",
            body: idCart
          })
            .then((response) => {
              return response.text();
            })
            .then((data) => {
              getAllCarts();
            });
        });

      });
    }, 1000);
  }

  if (localStorage.getItem('login') == 'admin' && localStorage.getItem('prava') == 10) {
    document.getElementById('x').innerHTML = `  <form id="owner_form" mhetod="post" enctype="multipart/form-data">
                    <select name="category" id="category" class="inputForm">
                        <option value="1">Портативные радиостанции</option>
                        <option value="9">Автомобильные радиостанции</option>
                        <option value="2">Антенны</option>
                        <option value="3">Аккумуляторы</option>
                        <option value="4">Гарнитура</option>
                        <option value="5">Зарядные устройства</option>
                        <option value="6">Ретрансляторы</option>
                        <option value="7">Кабель коаксиальный</option>
                        <option value="8">Усилитель GSM</option>
                    </select>
              <input type="text" name="title" id="title" class="inputForm" placeholder="Название">
              <input type="text" name="desc" id="desc" class="inputForm" placeholder="Описание">
              <input type="text" name="price" id="price" class="inputForm" placeholder="Цена">
              <input type="file"  multiple id="files">
              <input id="upload" type="submit" value="Добавить">
          </form>`;

    const inputElement = document.querySelector('#price');
    const maskOptions = {
      mask: Number,
      thousandsSeparator: ' '
    };
    IMask(inputElement, maskOptions);

    //Добавление товара
    document.getElementById('owner_form').onsubmit = (e) => {
      e.preventDefault();
      let formData = new FormData(document.getElementById('owner_form'));
      let files = document.querySelector('#files').files;
      for (let i = 0; i < files.length; i++) {
        formData.append(i, files[i]);
      }

      // console.log(formData);
      requestFetch = function () {
        //this beforesend
        return fetch.apply(this, arguments);
      };

      requestFetch('api/addCarts.php', {
        method: 'POST',
        body: formData
      }).then((response) => {
        return response.text();
      }).then((data) => {
        //Запрос успешно
        console.log(data);
        getAllCarts();
      }).catch((e) => {
        console.log('Error: ' + e.message);
      });
    };

    //Кнопка выхода из аккаунта
    document.getElementById('singin_div').innerHTML = '<button id="exitBtn">Выйти</button>';
    document.getElementById('exitBtn').onclick = function () {
      localStorage.clear();
      location.reload();
    };

    // document.querySelector('.price')
    deleteCart();


  } else {
    document.getElementById('singin_div').innerHTML = '<button class="singin_button">Войти</button>';

    document.querySelector('.singin_button').onclick = function () {
      document.getElementById('singin_form').style.visibility = 'visible';
    };

    document.querySelector('.close_singin').onclick = function () {
      document.getElementById('singin_form').style.visibility = 'hidden';
    };

    //Форма входа в аккаунт
    document.getElementById('singin_form').onsubmit = (e) => {
      e.preventDefault();
      let formSending = new FormData(document.getElementById('singin_form'));

      requestFetch = function () {
        //this beforesend
        return fetch.apply(this, arguments);
      };

      requestFetch('api/auth.php', {
        method: 'POST',
        body: formSending
      }).then((response) => {
        return response.json();
      }).then((data) => {
        //Запрос успешно
        console.log(data);
        if (data.login != null) {
          localStorage.setItem('login', data.login);
          localStorage.setItem('prava', data.prava);
          location.reload();
        }
      }).catch((e) => {
        console.log('Error: ' + e.message);
      });
    };
  }

  //Функция плавного скролла
  function slideTo(a, b) {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      b.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      document.querySelector('.popup').style.visibility = 'hidden'
      document.querySelector('.popup_dinamyc').style.visibility = 'hidden';
      document.querySelector('body').style.overflow = '';
    });
  }

  let links = document.querySelectorAll('a[href*="#"]');

  slideTo(document.querySelector('.header-button'), document.querySelector('#send-us'));

  slideTo(links[0], document.querySelector('.footer'));
  slideTo(links[1], document.querySelector('.partners'));
  slideTo(links[2], document.querySelector('#awards'));
  slideTo(links[3], document.querySelector('#catalog'));
  slideTo(links[4], document.querySelector('#about'));

  function trackScroll() {
    var scrolled = window.pageYOffset;
    var coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      goTopBtn.classList.add('back_to_top-show');
    }
    if (scrolled < coords) {
      goTopBtn.classList.remove('back_to_top-show');
    }
  }
  var goTopBtn = document.querySelector('.back_to_top');

  window.addEventListener('scroll', trackScroll);
  slideTo(goTopBtn, document.querySelector('.header-line'));

  //Отправка заявки на эмайл
  document.getElementById('send_form').onsubmit = function (e) {
    let formData = new FormData(document.getElementById('send_form'));
    document.getElementById('loader').innerHTML = `<div class="lds-ellipsis">    <div></div>    <div></div>    <div></div>    <div></div></div>`;
    e.preventDefault();
    fetch('registrMail.php', {
      method: 'POST',
      body: formData,
    }).then((response) => {
      return response.text();
    }).then((data) => {
      console.log(data);
      alert('Заявка отправлена');
      document.getElementById('loader').remove();
    }).catch(e => {
      console.log(`error: ${e.message}`);
    });
  };


  //Функция получения товара-конкретной рубрики
  async function getAllCarts() {
    items.innerHTML = '<div class="loaderItem"><div class="lds-ellipsis">    <div></div>    <div></div>    <div></div>    <div></div></div></div>';
    hr.style.border = '4px solid #A4A2A3';
    formData.append('id', localStorage.getItem('idRubriki'));
    if (gallery.classList.contains('show')) {
      gallery.classList.remove('show');
      gallery.classList.add('hide');
    }
    items.classList.remove('hide');
    await fetch('api/getCarts.php', {
      method: 'post',
      body: formData
    }).then(response => {
      return response.json();
    }).then(data => {
      document.querySelector('.loaderItem').remove();

      data.forEach((cart, i) => {
        if (localStorage.getItem('login') == 'admin' && localStorage.getItem('prava') == 10) {
          items.innerHTML += `
          <div class="gallery-card wow fadeInUp" data-id="1" data-wow-offset="100" data-wow-iteration="1" 
                        data-wow-duration="1s"> 
                        <button class="card-button" id="card-button" data-id=${cart.id}>X</button>
                        <div class="img-box"> 
                         <img id="img-car" src="${cart.img}" alt="card">
                        </div> 
                        <div class="card-info"> 
                        <p class="product-name">${cart.title}</p>
                        <p class="product-desc">${cart.decs}</p>
                        <div><span class="price">${cart.price} тг</span> <div data-id=${cart.id} id='moreBtn' class='moreBtn'>Подробнее</div></div>
                        <input class="order-button" type="button" value="Заказать">
                        </div> 
                        
                    </div>`;
        } else {
          items.innerHTML += `          <div class="gallery-card wow fadeInUp" data-id="1" data-wow-offset="100" data-wow-iteration="1" 
          data-wow-duration="1s"> 
          <div class="img-box"> 
           <img id="img-car" src="${cart.img}" alt="card">
          </div> 
          <div class="card-info"> 
          <p class="product-name">${cart.title}</p>
          <p class="product-desc">${cart.decs}</p>
          <div><span class="price">${cart.price} тг</span> <div data-id=${cart.id} id='moreBtn' class='moreBtn'>Подробнее</div></div>
          <input class="order-button" type="button" value="Заказать">
          </div> 
          
      </div>`;
        }
        const btnOrder = document.querySelectorAll('.order-button');
        btnOrder.forEach(btn => {
          slideTo(btn, document.querySelector('.footer'));
        });
      });

      const moreBtn = document.querySelectorAll('#moreBtn'),
        popup_dinamyc = document.querySelector('.popup_dinamyc'),
        popup = document.querySelector('.popup'),
        popup_product_name = document.querySelector('.popup-product-name'),
        popup_product_desc = document.querySelector('.popup-product-desc'),
        popup_price = document.querySelector('.popup-price');

      //Клик на подбронее
      moreBtn.forEach(item => {
        item.addEventListener('click', async (e) => {

          const formData = new FormData();
          formData.append('id', e.target.getAttribute('data-id'))
          await fetch('api/getOneItem.php', {
            method: 'post',
            body: formData
          }).then(response => {
            return response.json();
          }).then(data => {
            pictures = data[0].img;
            img.src = pictures[0];
            popup_product_name.innerHTML = data[0].title;
            popup_product_desc.innerHTML = data[0].decs;
            popup_price.innerHTML = `${data[0].price} тг`;
            popup.style.visibility = 'visible';
            popup_dinamyc.style.visibility = 'visible';
          })
          document.querySelector('body').style.overflow = 'hidden';
        })
      });

      deleteCart();

    }).catch(e => {
      console.log(`warning: ${e.message}`);
    });


  }


  //Клик на название рубрики рядом с каталогом
  tabs.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.classList.contains('name-rubrika')) {

      id = target.dataset.id;
      localStorage.setItem('idRubriki', id);
      nameRubrika.forEach(item => {
        item.classList.remove('active-tab');
      });
      target.classList.add('active-tab');
      getAllCarts();
      if (localStorage.getItem('login') == 'admin' && localStorage.getItem('prava') == 10) {
        deleteCart();
      }

    }

  });

  //Клик на карточку в каталоге
  gallery.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.classList.contains('img-car')) {
      id = target.dataset.id;
      localStorage.setItem('idRubriki', id);
      nameRubrika.forEach(item => {
        if (id === item.dataset.id) {
          item.classList.add('active-tab');
        }
      });
      getAllCarts();
      if (localStorage.getItem('login') == 'admin' && localStorage.getItem('prava') == 10) {
        deleteCart();
      }
    }
  });


  //Клик на каталог чтобы получить все рубрики и карточки
  catalog.addEventListener('click', (e) => {
    hr.style.border = '4px solid #FEC70A';

    nameRubrika.forEach(item => {
      item.classList.remove('active-tab');
    });
    gallery.classList.remove('hide');
    gallery.classList.add('show');
    items.classList.add('hide');
  });

});