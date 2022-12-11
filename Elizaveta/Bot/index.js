const TelegramBotApi = require('node-telegram-bot-api')
const {token} = require("./data/settings.js")
const bot = new TelegramBotApi(token, { polling: true })
const users = require('./data/base/users.json')
const fs = require('fs');
const {getData} = require("./data/fucntion/getData.js")
const getPosts = require("./data/fucntion/getKeyboard.js")



function prettify(number) {
    return String(number).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ").replace(/\s/g, '.')
}
setInterval(() => {
    require('fs').writeFileSync('./data/base/users.json', JSON.stringify(users, null, '\t'))
}, 9000)


bot.setMyCommands([
    { command: '/start', description: 'Начать' }
])


bot.on('message', msg => {
    var user = users.filter(x => x.id === msg.from.id)[0]
    if (!user) {
        users.push({
            id: msg.from.id,
            nick: msg.from.username
        })
        user = users.filter(x => x.id === msg.from.id)[0]
    }
})

const startKeyboard = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Начать', callback_data: `startKeyboard1` }],

        ]
    })
}

bot.on("message", msg => {
    var user = users.filter(x => x.id === msg.from.id)[0]
    let chatId = msg.chat.id
    let text = msg.text

    if (text == "/start"){
        bot.sendMessage(chatId, "Нажми кнопку что бы просмотреть все посты", startKeyboard)
       
    }
})



bot.on("callback_query", msg => {
    var user = users.filter(x => x.id === msg.from.id)[0]
    let chatId = msg.from.id
    let data = msg.data

    let res = getData(chatId, bot)
    let dict = []

    for(var key in res){
        dict.push(res[key]["messages"])

        if(data == `groupsKeyboard${key}`){
            
            let messages = []
            let message = []

            messages.push(dict[key])

            for(var key in messages[0]){
                message.push(messages[0][key])

            }


            for(var key in message[0]){
                bot.sendMessage(chatId, `Имя:${message[0][key]}\nСообщение:\n${message[1][key]}`)
            }

            
        }  
    }


    if(data == "startKeyboard1"){
        getPosts(chatId, bot)
    }  

    

})

bot.on("polling_error", (msg) => console.log(msg));