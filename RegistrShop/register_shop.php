<?
session_start();
include('api/mydb.php');
?>
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title><? echo $SYSTEM_NAME; ?></title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="robots" content="all,follow">
  <!-- Bootstrap CSS-->
  <link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css">
  <!-- Font Awesome CSS-->
  <link rel="stylesheet" href="vendor/font-awesome/css/font-awesome.min.css">
  <!-- Fontastic Custom icon font-->
  <link rel="stylesheet" href="css/fontastic.css">
  <!-- Google fonts - Poppins -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,700">
  <!-- theme stylesheet-->
  <link rel="stylesheet" href="css/style.default.css" id="theme-stylesheet">
  <!-- Custom stylesheet - for your changes-->
  <link rel="stylesheet" href="css/custom.css">
  <!-- Favicon-->
  <link rel="shortcut icon" href="img/favicon.ico">
  <!-- Tweaks for older IEs-->
  <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script><![endif]-->
</head>

<body>
  <style>
    .lds-ellipsis {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
    }

    .lds-ellipsis div {
      position: absolute;
      top: 33px;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: #796AEE;
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }

    .lds-ellipsis div:nth-child(1) {
      left: 8px;
      animation: lds-ellipsis1 0.6s infinite;
    }

    .lds-ellipsis div:nth-child(2) {
      left: 8px;
      animation: lds-ellipsis2 0.6s infinite;
    }

    .lds-ellipsis div:nth-child(3) {
      left: 32px;
      animation: lds-ellipsis2 0.6s infinite;
    }

    .lds-ellipsis div:nth-child(4) {
      left: 56px;
      animation: lds-ellipsis3 0.6s infinite;
    }

    @keyframes lds-ellipsis1 {
      0% {
        transform: scale(0);
      }

      100% {
        transform: scale(1);
      }
    }

    @keyframes lds-ellipsis3 {
      0% {
        transform: scale(1);
      }

      100% {
        transform: scale(0);
      }
    }

    @keyframes lds-ellipsis2 {
      0% {
        transform: translate(0, 0);
      }

      100% {
        transform: translate(24px, 0);
      }
    }
  </style>
  <div class="page login-page-reg login-page">
    <div class="container d-flex align-items-center">
      <div class="form-holder has-shadow">
        <div class="row">
          <!-- Logo & Information Panel-->
          <div class="col-lg-6">
            <div class="info d-flex align-items-center" style="min-height: auto">
              <div class="content">
                <div class="logo">
                  <h1><? echo $SYSTEM_NAME; ?></h1>
                </div>
                <p>Система управления Вашего магазина</p>
              </div>
            </div>
          </div>
          <!-- Form Panel    -->
          <div class="col-lg-6 bg-white">
            <div class="form d-flex align-items-center">

              <div class="content">
                <form method="post" class="form-validate" method="post" id="form_send">
                  <div class="form-group">
                    <p>Регистрация магазина</p>
                    <input id="nameShop" type="text" name="nameShop" required class="input-material" require autocomplete="off" placeholder="Название магазина">
                  </div>
                  <div class="form-group">
                    <input id="address" type="text" name="address" class="input-material" autocomplete="off" placeholder="Адрес">
                  </div>
                  <div class="form-group">
                    <input id="phoneShop" type="text" name="phoneShop" class="input-material" require autocomplete="off" placeholder="Телефон">
                  </div>
                  <div class="form-group">
                    <textarea id="commentShop" name="commentShop" class="md-textarea form-control" rows="3" placeholder="Комментарий"></textarea>
                  </div>
                  <p>Регистрация руководителя</p>
                  <div class="form-group">
                    <input id="nameSotr" type="text" name="nameSotr" required class="input-material" autocomplete="off" placeholder="Имя ">
                  </div>
                  <div class="form-group">
                    <input id="loginSotr" type="text" name="loginSotr" required class="input-material" autocomplete="off" placeholder="Логин ">
                  </div>
                  <div class="form-group">
                    <input id="passSotr" type="password" name="passSotr" required class="input-material" autocomplete="off" placeholder="Пароль ">
                  </div>
                  <div class="form-group">
                    <button id="regidter" name="registerSubmit" class="btn btn-primary">РЕГИСТРАЦИЯ</button>
                  </div>


                </form>
                <div class="container loader" style="display: flex; justify-content: center; align-items: center;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="copyrights text-center">
      <p>Design by <a href="https://bootstrapious.com" class="external">Bootstrapious</a>
        <!-- Please do not remove the backlink to us unless you support further theme's development at https://bootstrapious.com/donate. It is part of the license conditions. Thank you for understanding :)-->
      </p>
    </div>
  </div>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="./js/jquery-mask.js"></script>

  <script>
    $('input[name="phoneShop"]').inputmask({
      "mask": "+9 (999) 999-99-99"
    });

    let checker = document.getElementById('checked')

    let button = document.getElementById('regidter')

    document.getElementById('form_send').onsubmit = (e) => {
      e.preventDefault();
      let form = document.getElementById('form_send')

      let formData = new FormData(form);

      requestFetch = function() {
        $('.loader').append(' Регистрация магазина...<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
        return fetch.apply(this, arguments);
      }

      requestFetch('./api/registerShop.php', {
        method: 'POST',
        body: formData
      }).then((response) => {
        return response.text();
      }).then((data) => {
        alert(`Регистрация прошла успешно: ${data}`)
        console.log(data);
        $('.loader').remove();
      }).catch((e) => {
        console.log('Error: ' + e.message);
        console.log(e.response);
      });
    }
  </script>
</body>

</html>