const TelegramBotApi = require('node-telegram-bot-api')
const token = '5469830893:AAHTPdqJR4nsD9OJSohjyg0Hka6nmLAlUEg'
const bot = new TelegramBotApi(token, { polling: true })
const users = require('./static/bazes/users.json')
const { setInterval } = require('timers')
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


const subChennel = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                { text: 'Подписатся', callback_data: null, url:"https://t.me/asdsadsad213e" }
            ],

        ]
    })
}



bot.setMyCommands([
    { command: '/start', description: 'Запустить бота' },
    { command: '/help', description: 'Помощь' },
    { command: '/ref', description: 'Друзья' },
    { command: '/balance', description: 'Узнать баланс' }

])


bot.on("message", msg => {
    const chatId = msg.chat.id
    const text = msg.text
 
    

    bot.getChatMember("@asdsadsad213e", chatId).then(v => {
        if(v.status === "left"){
            bot.sendMessage(chatId, "Вы не подписаны на канал", subChennel)
        }
    })



})

