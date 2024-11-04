const {Keyboard, InlineKeyboard} = require('grammy');

const menuKeyboard = new InlineKeyboard()
.text('Узнать свой ID', 'id')
.text('Узнать температуру', 'weather');

const weatherKeyboard = new InlineKeyboard()
.text('Поделится геолокацией', 'geo')
.text('Указать город', 'city').row()
.text('Назад в меню', 'back');

const geoKeyboard = new Keyboard()
.requestLocation('Отправить геолокацию').resized().oneTime().placeholder('Мяукни');

const backKeyboard = new InlineKeyboard()
.text('Назад в меню', 'back');


module.exports = {
    keyboards: {
        menuKeyboard,
        weatherKeyboard,
        geoKeyboard,
        backKeyboard
    }
};