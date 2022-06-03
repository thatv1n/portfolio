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
                    <input id="reg_NAME" type="text" name="NAME" required class="input-material" autocomplete="off" placeholder="Название бутика">
                    <label for="reg_NAME" class="label-material"></label>
                  </div>

                  <div class="form-group">
                    <label class="label-material form-radio" style="color:#878787">Форма&nbsp&nbsp&nbsp
                      <input id="yes" value="ИП" type="radio" name="question">
                      <label for="yes" style="color:#303030">ИП</label>

                      <input id="no" value="ТОО" type="radio" name="question">
                      <label for="no" style="color:#303030">ТОО</label>

                    </label>

                  </div>
                  <div class="form-group">
                    <input id="reg_TD" type="text" name="TD" required class="input-material" autocomplete="off" placeholder="Название">
                    <label for="reg_TD" class="label-material"></label>
                  </div>
                  <div class="form-group">
                    <input id="PROP" type="text" name="PROP" class="input-material" autocomplete="off" placeholder="Реквизиты">
                    <label for="PROP" class="label-material"></label>
                  </div>
                  <div class="form-group">
                    <input id="reg_ADDRESS" type="text" name="reg_ADDRESS" class="input-material" autocomplete="off" placeholder="Адрес юридический">
                    <label for="reg_ADDRESS" class="label-material"></label>
                  </div>
                  <div class="form-group">
                    <input id="reg_ADDRESS_ACTUAL" type="text" name="reg_ADDRESS_ACTUAL" class="input-material" autocomplete="off" placeholder="Адрес фактический">
                    <label for="reg_ADDRESS_ACTUAL" class="label-material"></label>
                  </div>
                  <div class="form-group">
                    <input id="reg_NUMBER" type="text" name="reg_NUMBER" class="input-material" autocomplete="off" placeholder="Номер бутика">
                    <label for="reg_NUMBER" class="label-material"></label>
                  </div>
                  <div class="form-group">
                    <input id="reg_FIO" type="text" name="reg_FIO" required class="input-material" autocomplete="off" placeholder="ФИО руководителя">
                    <label for="reg_FIO" class="label-material"></label>
                  </div>
                  <div class="form-group">
                    <input id="reg_BZD" type="text" name="reg_BZD" class="input-material" autocomplete="off" placeholder="Дата рождения руководителя">
                    <label for="reg_BZD" class="label-material"></label>
                  </div>
                  <div class="form-group">
                    <input id="reg_PHONE" type="text" name="reg_PHONE" required class="input-material" autocomplete="off" placeholder="Контактный телефон руководителя">

                    <label for="reg_PHONE" class="label-material"></label>
                  </div>
                  <div class="form-group">
                    <input id="reg_EMAIL" type="text" name="reg_EMAIL" class="input-material" autocomplete="off" placeholder="Почта">
                    <!-- <input id="reg_EMAIL" type="text" name="reg_EMAIL" required class="input-material" autocomplete="off" placeholder="Почта"> -->

                    <label for="reg_EMAIL" class="label-material"></label>
                  </div>
                  <div class="form-group">
                    <input id="reg_PHONE_EMPLOYEE" type="text" name="reg_PHONE_EMPLOYEE" class="input-material" autocomplete="off" placeholder="Тел сотрудника, кто имеет доступ к программе">

                    <label for="reg_PHONE_EMPLOYEE" class="label-material"></label>
                  </div>
                  <div class="form-group">
                    <input id="reg_FIO_EMPLOYEE" type="text" name="reg_FIO_EMPLOYEE" class="input-material" autocomplete="off" placeholder="ФИО сотрудника">
                    <label for="reg_FIO_EMPLOYEE" class="label-material"></label>
                  </div>
                  <div class="form-group">
                    <button id="regidter" name="registerSubmit" class="btn btn-primary">РЕГИСТРАЦИЯ</button>
                  </div>

                </form>


                <div class="">
                  <input type="checkbox" id='checked'>

                  Принимаю условия <a href="./contract.pdf" target="_blank" id="sogl"> Пользовательского соглашения</a>

                </div>
                <!-- <iframe src="contract.pdf" width=500 height=200 embedded=true width="700" height="820" style="border: none;"> -->
                <div class=" loader" style="display: flex; justify-content: center; align-items: center;"></div>
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
  <!-- JavaScript files-->
  <script src="vendor/jquery/jquery.min.js"></script>
  <script src="vendor/popper.js/umd/popper.min.js"> </script>
  <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
  <script src="vendor/jquery.cookie/jquery.cookie.js"> </script>
  <script src="vendor/chart.js/Chart.min.js"></script>
  <script src="vendor/jquery-validation/jquery.validate.min.js"></script>
  <!-- Main File-->
  <!-- <script src="js/front.js"></script> -->

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="./js/jquery-mask.js"></script>
  <script>
    $('input[name="reg_BZD"]').inputmask("99.99.9999");
    $('input[name="reg_PHONE"]').inputmask({
      "mask": "+9 (999) 999-99-99"
    });
    $('input[name="reg_PHONE_EMPLOYEE"]').inputmask({
      "mask": "+9 (999) 999-99-99"
    });
    $('input[name="reg_EMAIL"]').inputmask("email");

    let checker = document.getElementById('checked')


    let button = document.getElementById('regidter')
    document.getElementById('reg_EMAIL').onchange = () => {
      document.getElementById('reg_EMAIL').style = "border-bottom:1px solid #eee";
    }
    document.getElementById('reg_FIO').onchange = () => {
      document.getElementById('reg_FIO').style = "border-bottom:1px solid #eee";
    }
    document.getElementById('reg_PHONE').onchange = () => {
      document.getElementById('reg_PHONE').style = "border-bottom:1px solid #eee";
    }
    document.getElementById('reg_NAME').onchange = () => {
      document.getElementById('reg_NAME').style = "border-bottom:1px solid #eee";
    }

    $('#regidter').click(function(e) {
      e.preventDefault();
      if (document.getElementById('reg_NAME').value == '') {
        document.getElementById('reg_NAME').focus();
        document.getElementById('reg_NAME').style = "border-bottom:2px solid red";
      } else {
        if (document.getElementById('reg_FIO').value == '') {
          document.getElementById('reg_FIO').focus();
          document.getElementById('reg_FIO').style = "border-bottom:2px solid red";
        } else {
          if (document.getElementById('reg_PHONE').value == '') {
            document.getElementById('reg_PHONE').focus();
            document.getElementById('reg_PHONE').style = "border-bottom:2px solid red";
          } else {
            if (document.getElementById('reg_EMAIL').value == '') {
              document.getElementById('reg_EMAIL').focus();
              document.getElementById('reg_EMAIL').style = "border-bottom:2px solid red";
            } else {

              if ($('#checked').prop('checked')) {
                let form = document.getElementById('form_send')

                let formData = new FormData(form)

                $.ajax({
                  url: "./api/registrMail.php",
                  type: "POST", //метод отправки
                  dataType: "html", //формат данных
                  data: formData,
                  processData: false,
                  contentType: false,
                  beforeSend: function() {
                    $('.loader').append(' Регистрация...<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
                  },
                  success: function(response) { //Данные отправлены успешно
                    $('.loader').remove();
                    console.log('OK')
                    alert("Вы успешно зарегестрировались, ожидайте письмо с логином и паролем на электронную почту/мобильный телефон")
                    $('#regidter').attr("disabled", "disabled");

                  },
                  error: function(response) { // Данные не отправлены
                    $('.loader').remove();
                    console.log('ERROR')
                  }
                });
              } else {
                alert('Прочтите и согласитесь с условиями пользовательского соглашения');
                sogl.focus();
              }
            }
          }
        }
      }




    })
  </script>
</body>

</html>