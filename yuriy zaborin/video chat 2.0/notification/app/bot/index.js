
const TelegramBotApi = require('node-telegram-bot-api')
const token = '5323841938:AAFfv-y1LxpRK2tqoD6osNdEl5Sflg61n_c'
const bot = new TelegramBotApi(token, { polling: true })
const users = require('./data/base/users.json')
const { setInterval } = require('timers')
const counter = require('../data.json')
const file = require("../data.json");
const fs = require("fs");
const funcFIle = file[0].click
const JsonObjectPath = '../data.json'

let newClickFalse = [{
    click: false
}]

let dataFalse = JSON.stringify(newClickFalse);

function prettify(number) {
    return String(number).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ").replace(/\s/g, '.')
}
setInterval(() => {
    require('fs').writeFileSync('./data/base/users.json', JSON.stringify(users, null, '\t'))
}, 1000)



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
        bot.sendMessage(chatId,
            "Вы успешно авторизовались теперь вам нужно настроить интревал прихода сообщений напишите ТАЙМЕР и ваше время время нужно указывать в таком формате 1000 - одна секунда 10000 - одна минута ")
    }else{
        bot.sendMessage(chatId, 'Ключь не опознон, либо вы его не установили')
    }


})

bot.onText(/ТАЙМЕР/, msg => {

    var user = users.filter(x => x.id === msg.from.id)[0]
    const chatId = msg.chat.id
    const text = msg.text.replace('ТАЙМЕР ', '')

    if(user.userPass != null){
        bot.sendMessage(chatId, `Вы успешно установили таймер на ${text}, по его окончанию вам придет сообщение, в течении этого таймера вам будут приходить сообщение о том вступил ли кто то в вашу комнату`)
        console.log(funcFIle)
        setTimeout(() => {
            if(funcFIle === false){
                console.log(funcFIle)
            }else{
                console.log('true')
                bot.sendMessage(chatId, 'Участник зашел в комнату!')
                console.log(funcFIle)
                fs.writeFileSync(JsonObjectPath, dataFalse)
                console.log(funcFIle)
            }
        }, text)
    }else{
        bot.sendMessage(chatId, 'Вы ещё не авторизованы')
    }


})

bot.on("polling_error", console.log);


