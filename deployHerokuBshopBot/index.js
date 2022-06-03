const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();
var CronJob = require('cron').CronJob;
var moment = require('moment-timezone');
const axios = require('axios').default;

const bot = new Telegraf(process.env.BOT_TOKEN);

const buttonsStart = Markup.inlineKeyboard([
  [Markup.button.callback('Подписаться на уведомления', 'subscribe')],
]);

const buttonsAny = Markup.inlineKeyboard([[Markup.button.callback('Касса и cтатистика', 'kassa')]]);

bot.start((msg) => {
  const chatId = msg.message.chat.id;
  msg.telegram.sendMessage(chatId, 'Bshop', buttonsStart);
});

bot.action('subscribe', async (msg) => {
  const chatId = msg.update.callback_query.message.chat.id;
  await msg.answerCbQuery();
  await msg.reply(
    'Введите свой номер, который записан на сайте BSHOP (если при регистрации вы указывали номер в формате +77777779999, сюда пишите в таком же формате)',
  );

  //Каждый день в 22:00,получение кассы и статистики за день
  new CronJob(
    '0 22 * * *',
    function () {
      getKassaStaticstick(msg, chatId, buttonsAny);
    },
    null,
    true,
    'Asia/Almaty',
  );

  //Каждый день в 12:00, ПОЗДРАВЛЕНИЕ С ДНЕМ РОЖДЕНИЯ
  new CronJob(
    '0 10 * * *',
    function () {
      const now = moment().tz('Asia/Almaty').format();
      let year = now.slice(0, 4),
        month = now.slice(5, 7),
        day = now.slice(8, 10),
        nowDay = `${day}.${month}.${year}`;
      axios.get('http://bshop.kz/api/birthdaySelTel.php').then(function async(res) {
        res.data.map(async (item) => {
          if (item.chatID == chatId && item.birthday.substr(0, 5) == nowDay.slice(0, 5)) {
            await msg.telegram.sendMessage(
              chatId,
              `С днем рождения! Желаем Вам успеха и процветания`,
            );
          }
        });
      });
    },
    null,
    true,
    'Asia/Almaty',
  );

  //Раз в месяц  , напоминание об оплате
  new CronJob(
    '0 8 1 * *',
    function () {
      const now = moment().tz('Asia/Almaty').format();

      let year = now.slice(0, 4),
        month = now.slice(5, 7),
        day = now.slice(8, 10),
        nowDay = `${day}.${month}.${year}`;
      msg.telegram.sendMessage(chatId, `Напоминание об оплате вашего счета BSHOP, ${nowDay}`);
    },
    null,
    true,
    'Asia/Almaty',
  );
});

bot.on('message', async (msg) => {
  const text = msg.message.text;
  const chatId = msg.message.chat.id;
  try {
    if (text.substring(0, 2) == '+7' || text.substring(0, 1) == '8') {
      const data = new URLSearchParams();
      data.append('id', chatId);
      data.append('phone', text);
      axios({
        method: 'post',
        url: 'http://bshop.kz/api/TelChat.php',
        data: data,
      })
        .then(async (res) => {
          if (res) {
            const now = moment().tz('Asia/Almaty').format();

            let year = now.slice(0, 4),
              month = now.slice(5, 7),
              day = now.slice(8, 10),
              nowDay = `${day}.${month}.${year}`;
            await msg.telegram.sendMessage(
              chatId,
              `Отлично, номер ${text} записан, теперь вы будете получать уведомления о Вашем бутике`,
            );
            await msg.telegram.sendMessage(
              chatId,
              `Далее введите дату рождения в формате ${nowDay}`,
            );
          } else {
            await msg.telegram.sendMessage(chatId, `Такой номер не найден`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (text.length == 10) {
      const data = new URLSearchParams();
      data.append('id', chatId);
      data.append('birthday', text);
      axios({
        method: 'post',
        url: 'http://bshop.kz/api/birthdayTel.php',
        data: data,
      }).then(async (res) => {
        await msg.telegram.sendMessage(
          chatId,
          `Первоначальная настройка закончена, удачного пользования!`,
          buttonsAny,
        );
      });
    }
  } catch (error) {
    console.log(error);
  }
});

bot.action('kassa', async (msg) => {
  const chatId = msg.update.callback_query.message.chat.id;
  msg.telegram.sendMessage(chatId, `Получение данных...`);
  try {
    await msg.answerCbQuery();
    const chatId = msg.update.callback_query.message.chat.id;
    await getKassaStaticstick(msg, chatId, buttonsAny);
  } catch (error) {
    console.log(error);
  }
});

const getKassaStaticstick = async (msg, chatId, buttonsAny) => {
  const data = new URLSearchParams();
  data.append('id', chatId);

  axios({
    method: 'post',
    url: 'http://bshop.kz/api/kassaTelegram.php',
    data: data,
  }).then((res) => {
    const now = moment().tz('Asia/Almaty').format();

    let year = now.slice(0, 4),
      month = now.slice(5, 7),
      day = now.slice(8, 10),
      time = now.slice(11, 16),
      nowDay = `${day}.${month}.${year}`;
    msg.telegram.sendMessage(
      chatId,
      `Бутик: ${res.data[0].name}
Касса:  ${res.data[0].nal + res.data[0].beznal}
Наличие товара ${res.data[0].CountTotal}
На: ${nowDay}, ${time}`,
      buttonsAny,
    );
  });
};

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
