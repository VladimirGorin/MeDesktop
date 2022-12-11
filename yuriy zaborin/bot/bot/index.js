"use strict"
const TelegramBotApi = require('node-telegram-bot-api')
const token = '5323841938:AAFfv-y1LxpRK2tqoD6osNdEl5Sflg61n_c'
const bot = new TelegramBotApi(token, { polling: true })
const users = require('./data/base/users.json')
const { setInterval } = require('timers')
const fs = require("fs");
var zmq = require('zeromq'),sock = zmq.socket('sub');

sock.connect('tcp://127.0.0.1:3900');
sock.subscribe('tg_bot');
console.log('Subscriber connected to port 3900');


function prettify(number) {
    return String(number).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ").replace(/\s/g, '.')
}
setInterval(() => {
    require('fs').writeFileSync('./data/base/users.json', JSON.stringify(users, null, '\t'))
}, 5000)



bot.on('message', msg => {
    var user = users.filter(x => x.id === msg.from.id)[0]
    if (!user) {
        users.push({
            id: msg.from.id,
            nick: msg.from.username,
            userPass: null,
        })
        user = users.filter(x => x.id === msg.from.id)[0]
    }
})


const startCommand = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Я менеджер', callback_data: "startCommand1", }],
            [{ text: 'Я пользователь', callback_data: "startCommand2", }]
        ]
    })
}


const SelectAdminCommand = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Авторизоватся', callback_data: "selectAdminCommand1", }],
            [{ text: 'Войти', callback_data: "selectAdminCommand2", }]
        ]
    })
}


bot.on('message', msg => {
    const chatId = msg.chat.id
    const text = msg.text



    if(text === '/start'){
        bot.sendMessage(chatId, '«Приветствую! Вы попали в чат-бот Vichat.TV. Что Вас интересует?»', startCommand)
    }

})


bot.on("callback_query", msg => {

    const data = msg.data
    const chatId = msg.message.chat.id
    user = users.filter(x => x.id === msg.from.id)[0]

    if (data === "startCommand1") {
        bot.sendMessage(chatId, "Вы уже заходили ранее? Нет тогда войдите!", SelectAdminCommand)
    }
    if (data === "startCommand2"){
        bot.sendMessage(chatId, 'Тут пока нету нечего :(')
    }
})

bot.on("callback_query", msg => {

    const data = msg.data
    const chatId = msg.message.chat.id
    user = users.filter(x => x.id === msg.from.id)[0]

    if (data === "selectAdminCommand1") {
        bot.sendMessage(chatId, "Для того что бы авторизоватся введите команду ВХОД и ваш уникальный ключ")
    }

    if (data === "selectAdminCommand2"){
        bot.sendMessage(chatId, 'Для указание ключа напишите команду КЛЮЧ Ваш уникальный ключ')
    }
})


bot.onText(/КЛЮЧ/, msg => {

    var user = users.filter(x => x.id === msg.from.id)[0]
    const chatId = msg.chat.id
    const text = msg.text.replace('КЛЮЧ ', '')

    bot.sendMessage(chatId, "Ключ успешно установлен далее Авторизуйтесь")

    user.userPass = text

})

bot.onText(/ВХОД/, msg => {

    var user = users.filter(x => x.id === msg.from.id)[0]
    const chatId = msg.chat.id
    const text = msg.text.replace('ВХОД ', '')

    if(user.userPass === text){
        bot.sendMessage(chatId, `Вы успешно вошли в аккаунт, теперь вам нужно включить прослушку нажмите на кнопку - /on`)
    }else{
        bot.sendMessage(chatId, 'Ключь не опознон, либо вы его не установили')
    }


})

bot.on("text", msg => {
    var user = users.filter(x => x.id === msg.from.id)[0]
    const chatId = msg.chat.id
    const text = msg.text

    if(text === "/on"){
        if(user.userPass != null){
            let i = 0;
            bot.sendMessage(chatId, "Поиск")
            while (i < 1) { // выводит 0, затем 1, затем 2
                setTimeout(() => {
                    sock.on('message', function(topic, message) {
                        console.log('sended');
                        bot.sendMessage(chatId, 'Участник зашел в комнату!')
                    })        
                }, 1000)
            i++;
            }
        }else{

            bot.sendMessage(chatId, "Вы не авторизовались, или ещё не указали ключ")
        }
    }
})


bot.on("polling_error", console.log);


