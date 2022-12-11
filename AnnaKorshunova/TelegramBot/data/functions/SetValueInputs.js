const users = require('../base/users.json')
let bot = require('../../index.js')


// Поболтать
let LiveTeame = (msg) => {
    var user = users.filter(x => x.id === msg.from.id)[0]
    let chatId = msg.chat.id
    let message = `В каком формате вы хотите вести общение?`
    let text = msg.text
    console.log(2)

    user.search_user_speek.teame = text
    user.me_options_speek.teame = text

    bot.sendMessage(chatId, message, onlineOffline);
    bot.removeListener("message", LiveTeame);
};
let LiveRegion = (msg) => {
    var user = users.filter(x => x.id === msg.from.id)[0]
    let chatId = msg.chat.id
    let message = `Введите тему

Пример: Программирование`
    let text = msg.text
    console.log(1)
    
    user.search_user_speek.region = text
    user.me_options_speek.region = text

    bot.sendMessage(chatId, message);
    bot.removeListener("message", LiveRegion);
    bot.on("message", LiveTeame);

};
// Консультация
let realLiveTeame = (msg) => {
    var user = users.filter(x => x.id === msg.from.id)[0]
    let chatId = msg.chat.id
    let message = `Отлично! Спасибо! Я начинаю искать
тебе партнеров. Это не займет много времени`
    let text = msg.text
    console.log(2)
    user.search_user.teame = text
    user.me_options.teame = text

    bot.sendMessage(chatId, message);
    bot.removeListener("message", realLiveTeame);

    user.search_user.searchType = 0
    user.search_user.searchedUsers = [null]

    setTimeout(() => {
        searchUsers(chatId, msg)

    }, 1000)
};
let realLiveRegion = (msg) => {
    var user = users.filter(x => x.id === msg.from.id)[0]
    let chatId = msg.chat.id
    let message = `Выбери тему из списка`
    let text = msg.text
    console.log(1)
    user.search_user.region = text
    user.me_options.region = text

    bot.sendMessage(chatId, message, consultationCommand);
    bot.removeListener("message", realLiveRegion);
};
// Редактор профиля
let reductorDetV = (msg) => {
    var user = users.filter(x => x.id === msg.from.id)[0]
    let chatId = msg.chat.id
    let message = `какая тебе нужна помощь?`
    let text = msg.text
    console.log(text)
    user.fieldOfActivity = text

    bot.sendMessage(chatId, message, helpToReducter);
    bot.removeListener("message", reductorDetV);
};
let reductorDet = (msg) => {
    var user = users.filter(x => x.id === msg.from.id)[0]
    let chatId = msg.chat.id
    let message = `Выбери из списка свою сферу деятельности
(один или несколько вариантов) или напиши
чем занимаешься.`
    let text = msg.text
    console.log(text)
    user.activity = text

    bot.sendMessage(chatId, message, activityCommandReducter);
    bot.removeListener("message", reductorDet);
};
let reductorRegion = (msg) => {
    var user = users.filter(x => x.id === msg.from.id)[0]
    let chatId = msg.chat.id
    let message = `Выбери из списка свой род деятельности или введи свой`
    let text = msg.text
    console.log(text)
    user.region = text

    console.log('step 3')
    bot.sendMessage(chatId, message, reductorCommand);
    bot.removeListener("message", reductorRegion);
};
let reductorName = (msg) => {
    var user = users.filter(x => x.id === msg.from.id)[0]
    let chatId = msg.chat.id
    let message = `Где ты живешь?
Напиши в формате: Страна, Город`
    let text = msg.text
    console.log(text)
    user.name = text
    console.log('step 2')
    bot.sendMessage(chatId, message);
    bot.removeListener("message", reductorName);
    bot.on("message", reductorRegion);

};
// Логин
let loginDetV = (msg) => {
    var user = users.filter(x => x.id === msg.from.id)[0]
    let chatId = msg.chat.id
    let message = `какая тебе нужна помощь?`
    let text = msg.text
    console.log(`loginDetV ${text}`)
    user.fieldOfActivity = text

    bot.sendMessage(chatId, message, helpTo);
    bot.removeListener("message", loginDetV);
};
let loginEndTheF = (msg) => {
    var user = users.filter(x => x.id === msg.from.id)[0]
    let chatId = msg.chat.id
    let message = `уточни сферу деятельности`
    let text = msg.text
    console.log(`loginEndTheF ${text}`)
    user.endThe = text

    bot.sendMessage(chatId, message, activityCommand);
    bot.removeListener("message", loginEndTheF);
};
let loginDet = (msg) => {
    var user = users.filter(x => x.id === msg.from.id)[0]
    let chatId = msg.chat.id
    let message = `А ещё?`
    let text = msg.text
    console.log(`loginDet ${text}`)
    user.activity = text

    bot.sendMessage(chatId, message, loginEndThe);
    bot.removeListener("message", loginDet);
};
let loginRegion = (msg) => {
    var user = users.filter(x => x.id === msg.from.id)[0]
    let chatId = msg.chat.id
    let message = `Выбери из списка свой род деятельности или введи свой`
    let text = msg.text
    console.log(`loginRegion ${text}`)
    user.region = text

    bot.sendMessage(chatId, message, occupationCommand);
    bot.removeListener("message", loginRegion);
};
let loginName = (msg) => {
    var user = users.filter(x => x.id === msg.from.id)[0]
    let chatId = msg.chat.id
    let message = `Где ты живешь?
Напиши в формате: Страна, Город`
    let text = msg.text
    console.log(`loginName ${text}`)
    user.name = text

    bot.sendMessage(chatId, message);
    bot.removeListener("message", loginName);
    bot.on("message", loginRegion);

};

module.exports = {loginName, loginRegion, loginDet,
    loginEndTheF, loginDetV, reductorName,
     reductorRegion, reductorDet, reductorDetV,
      LiveRegion, LiveTeame}


