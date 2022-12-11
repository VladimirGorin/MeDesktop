const TelegramBotApi = require('node-telegram-bot-api')

const token = '5603125917:AAHu4gTsMxvvRMhz0PG5Lf6fbJtZaaUMVZE'

const bot = new TelegramBotApi(token, { polling: true })

const users = require('./base/users.json')
const offers = require('./base/offers.json')
const { randomBytes } = require('crypto')
const { setInterval } = require('timers')


function prettify(number) {
    return String(number).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ").replace(/\s/g, '.')
}

setInterval(() => {
    require('fs').writeFileSync('./base/users.json', JSON.stringify(users, null, '\t'))
}, 8000)


bot.on('message', msg => {
    var user = users.filter(x => x.id === msg.from.id)[0]
    if (!user) {
        users.push({
            id: msg.from.id,
            nick: msg.from.username,


        })
        user = users.filter(x => x.id === msg.from.id)[0]
    }
})

// Выбор страны кнопки

const setRegion = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: '🇷🇺 Россия', callback_data: `setRegionOnRu` }],
        ]
    })
}






bot.setMyCommands([
    { command: 'start', description: 'Начать' }
])



bot.on('message', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]

    const chatId = msg.chat.id
    const text = msg.text

    if (text === "/start") {
        bot.sendMessage(chatId, "👨‍🦱 Вам есть 18?", setAge)
    }


})