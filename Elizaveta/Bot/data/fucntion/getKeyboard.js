const fs = require('fs');
const {getData} = require("./getData.js")

module.exports = function getPosts(chatId, bot) {
    let res = getData(chatId, bot)
    let data = []

    for(var key in res){
        data.push(res[key]["channelTitle"])
    }

    let dict = []

    for(var key in data){
        dict.push([{
            text:data[key],
            callback_data:`groupsKeyboard${key}`
        }])
    }

    let groupsKeyboard = {
        reply_markup: JSON.stringify({
            inline_keyboard: dict
        })
    }

    bot.sendMessage(chatId, "Все Группы!", groupsKeyboard)

}