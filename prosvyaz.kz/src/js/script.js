window.addEventListener('DOMContentLoaded', function () {

  fetch('../../api/getCarts.php').then((response) => {
    return response.json();
  }).then((data) => {
    let div = document.querySelector('.gallery');
    data.forEach(item => {

      if (localStorage.getItem('login') == 'admin' && localStorage.getItem('prava') == 10) {
        div.innerHTML +=
          `<div class="gallery-card wow fadeInUp " data-wow-offset="300" data-wow-iteration="1"
          data-wow-duration="1s"> <button class="card-button" id="card-button">X</button> <img id='img-car' src="./src/upload/${item.name_file}" data-id=${item.id} alt="card№${item.id}"> <p class="product">${item.title}</p></div>`;
      } else {
        div.innerHTML +=
          `<div class="gallery-card wow fadeInUp " data-wow-offset="300" data-wow-iteration="1"
          data-wow-duration="1s"> <img id='img-car' src="./src/upload/${item.name_file}" data-id=${item.id} alt="card№${item.id}"> <p class="product">${item.title}</p></div>`;
      }

    });
  });


  if (localStorage.getItem('login') == 'admin' && localStorage.getItem('prava') == 10) {
    document.getElementById('x').innerHTML = `  <form id="owner_form" mhetod="post">
              <input type="text" name="title" id="title">
              <input type="file" name="files" id="files">
              <input type="submit" value="Загрузить">
          </form>`;

    document.getElementById('owner_form').onsubmit = (e) => {
      e.preventDefault();
      let formData = new FormData(document.getElementById('owner_form'));

      requestFetch = function () {
        //this beforesend
        return fetch.apply(this, arguments);
      };

      requestFetch('./api/addCarts.php', {
        method: 'POST',
        body: formData
      }).then((response) => {
        return response.text();
      }).then((data) => {
        //Запрос успешно
        console.log(data);
        location.reload();
      }).catch((e) => {
        console.log('Error: ' + e.message);
      });
    };
    document.getElementById('singin_div').innerHTML = '<button id="exitBtn">Выйти</button>';
    document.getElementById('exitBtn').onclick = function () {
      localStorage.clear();
      location.reload();
    };


    setTimeout(() => {
      let imgCart = this.document.querySelectorAll('#img-car');
      let cardB = document.querySelectorAll('#card-button');
      cardB.forEach((item, i) => {
        item.onclick = (e) => {
          imgCart.forEach((imgCr, iImg) => {
            if (i == iImg) {
              let dataId = imgCr.getAttribute('data-id');
              let idCart = new FormData();
              idCart.append("id", dataId);
              fetch(`../../api/deleteCarts.php`, {
                  method: "post",
                  body: idCart
                })
                .then((response) => {
                  return response.text();
                })
                .then((data) => {
                  console.log(data);
                  location.reload();
                });
            }
          });
        };

      });
    }, 1000);

  } else {
    document.getElementById('singin_div').innerHTML = '<button class="singin_button">Войти</button>';

    document.querySelector('.singin_button').onclick = function () {
      document.getElementById('singin_form').style.visibility = 'visible';
    };

    document.querySelector('.close_singin').onclick = function () {
      document.getElementById('singin_form').style.visibility = 'hidden';
    };

    document.getElementById('singin_form').onsubmit = (e) => {
      e.preventDefault();
      let formSending = new FormData(document.getElementById('singin_form'));

      requestFetch = function () {
        //this beforesend
        return fetch.apply(this, arguments);
      };

      requestFetch('./api/auth.php', {
        method: 'POST',
        body: formSending
      }).then((response) => {
        return response.json();
      }).then((data) => {
        //Запрос успешно
        console.log(data);
        if (data.login != null) {
          localStorage.setItem('login', data.login);
          localStorage.setItem('password', data.password);
          localStorage.setItem('prava', data.prava);
          location.reload();
        }
      }).catch((e) => {
        console.log('Error: ' + e.message);
        console.log(e.response);
      });
    };
  }
  let links = document.querySelectorAll('#links');

  slideTo(links[0], document.querySelector('.footer'));
  slideTo(links[1], document.querySelector('.partners'));
  slideTo(links[2], document.querySelector('.awards'));
  slideTo(links[3], document.querySelector('.catalog'));
  slideTo(links[4], document.querySelector('.about'));



  function slideTo(a, b) {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      b.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }

});