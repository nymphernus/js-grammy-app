require('dotenv').config();
const {Bot, GrammyError, HttpError, session} = require('grammy');
const {hydrate} = require('@grammyjs/hydrate');
const {keyboards} = require('./keyboards');
const {weatherService} = require('./weatherService');
const {users} = require('./users');

const bot = new Bot(process.env.BOT_API_KEY);
bot.use(hydrate());

bot.use(session({
    initial: () => ({ waitingForCity: false, waitingForLocation: false })
}));

//Бургер меню с командами
bot.api.setMyCommands([
    {
        command: 'start',
        description: 'Перезапуск бота'
    },
    {
        command: 'menu',
        description: 'Меню'
    }

]);

//Приветствие бота
bot.command('start', async (ctx) => {
    const msgText = await users.userDataCheck(ctx.from)
    ? `Здравствуй <a href="https://t.me/${ctx.from.username}">${ctx.from.first_name}</a>` 
    : `Не встречал тебя раньше <span class="tg-spoiler">${ctx.from.first_name}</span>. Обновил нашу базу данных, теперь ты зарегистрирован в системе.`;
    await ctx.reply(msgText, {
        parse_mode: 'HTML',
        // reply_parameters: {message_id: ctx.msg.message_id},
        disable_web_page_preview: true
    });
});



bot.command('menu', async (ctx) => {
    await ctx.reply('Выберите пункт меню', {
        reply_markup: keyboards.menuKeyboard
    });
})
// Обработчик кнопки меню 'Узнать свой ID'
bot.callbackQuery('id', async (ctx) => {
    await ctx.callbackQuery.message.editText(`Ваш ID: ${ctx.from.id}`, {
        reply_markup: keyboards.backKeyboard
    });
    await ctx.answerCallbackQuery();
})
// Обработчик кнопки меню 'Узнать температуру в своём городе'
bot.callbackQuery('weather', async (ctx) => {
    await ctx.callbackQuery.message.editText('Нужно уточнить ваше местоположение', {
        reply_markup: keyboards.weatherKeyboard
    });
    await ctx.answerCallbackQuery();
})


// Обработчик кнопки меню 'Поделится геолокацией'
bot.callbackQuery('geo', async (ctx) => {
    await ctx.callbackQuery.message.editText('Узнаём ваше местоположение', {
        reply_markup: keyboards.backKeyboard
    });
    ctx.session.waitingForLocation = true;
    await ctx.reply('Отправьте нам ваше местоположение',{
        reply_markup: keyboards.geoKeyboard
    })
    await ctx.answerCallbackQuery();
})
// Обработчик кнопки меню 'Указать название города'
bot.callbackQuery('city', async (ctx) => {
    await ctx.callbackQuery.message.editText('Отправьте нам название своего города', {
        reply_markup: keyboards.backKeyboard
    });
    ctx.session.waitingForCity = true;
    await ctx.answerCallbackQuery();
})


// Обработчик получения геолокации
bot.on(':location', async (ctx) => {
    let msgText = 'Передал дядечке фсб\'шнику';

    if (ctx.session.waitingForLocation) {msgText = await weatherService.fetchWeather(ctx, true);}

    await ctx.reply(msgText, { 
        reply_markup: {remove_keyboard: true}
    });
});

// Ответ на любой тип сообщений
bot.on('msg', async(ctx) => {
    let msgText = 'Зря ты это сказал...всё упало';

    if (ctx.session.waitingForCity) {msgText = await weatherService.fetchWeather(ctx);}

    await ctx.reply(msgText, { 
            reply_markup: {remove_keyboard: true}
    });
});
// Обработчик кнопки 'Назад'
bot.callbackQuery('back', async (ctx) => {
    await ctx.callbackQuery.message.editText('Выберите пункт меню', {
        reply_markup: keyboards.menuKeyboard
    });
    await ctx.answerCallbackQuery();
})

// Обработчик ошибок
bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;

    if (e instanceof GrammyError) {
        console.error("Error in requst:", e.description);
    }
    else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e);
    }
    else {
        console.error("Unknown error:", e);
    }

});

bot.start();