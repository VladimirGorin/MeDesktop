const TelegramBotApi = require('node-telegram-bot-api')
const token = '5469830893:AAHTPdqJR4nsD9OJSohjyg0Hka6nmLAlUEg'

const bot = new TelegramBotApi(token, { polling: true })
const providerToken = "401643678:TEST:a55765c9-a11d-48db-8624-f08231e38114"

const users = require('./static/bazes/users.json')

const { setInterval } = require('timers')
const { title } = require('process')


function prettify(number) {
    return String(number).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ").replace(/\s/g, '.')
}

setInterval(() => {
    require('fs').writeFileSync('./static/bazes/users.json', JSON.stringify(users, null, '\t'))
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



bot.on('message', msg => {


    const user = users.filter(x => x.id == msg.from.id)[0]

    const chatId = msg.chat.id
    const text = msg.text

    console.log(`${msg.from.username} Написал ${text} его id ${msg.chat.id}`)

    if (text === "/start") {
        bot.sendMessage(chatId, `Привет ${user.nick} это тест консоли`)


    }




})




