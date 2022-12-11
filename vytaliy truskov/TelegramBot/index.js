const TelegramBotApi = require('node-telegram-bot-api')
// Тестовый для дебагов
const token = '5426231221:AAH5gVmqpj-_RuSHV8zSy1WBIP0rVMyuxJk'

// Новый бот (актуальный)
// const token = '5441891363:AAG0qf8GqlIAVUJyCug5T-dyvXzCCKYyHUk'

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
            region: null,
            age: null,


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


// Выбор возраста кнопки

const setAge = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Да', callback_data: `setAge18` }],
            [{ text: 'Нет', callback_data: `No` }],

        ]
    })
}

// Главная менюшка


const menuPanel = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: '💰 Подбор займа', callback_data: `step1` }],
            [{ text: '💫 Популярные предложения', callback_data: `step2` }],
            [{ text: '⚙️ Настройки', callback_data: `step3` }, { text: '🆘 Помощь', callback_data: `step4` }],
        ]
    })
}


// Под менюшка Популярные предложения

const popular = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: '0️⃣ Под 0%', callback_data: `popularStep1` }, { text: '🥝 На Киви', callback_data: `popularStep2` }],
            [{ text: '💳 С плохой кредитной историей', callback_data: `popularStep3` }],
            [{ text: '💸 Наличные', callback_data: `popularStep4` }, { text: '💫 Все варианты', callback_data: `popularStep5` }],
        ]
    })
}

// Настройки

const setings = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: '🏔 Выберите страну', callback_data: `setingsStep2` }],
        ]
    })
}

// Подбор займ 1-вый этап

const selection = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: '💵 до 10.000руб', callback_data: `selectionStep1` }],
            [{ text: '💵 от 10.000 до 30.000руб', callback_data: `selectionStep2` }],
            [{ text: '💵 от 30.000руб', callback_data: `selectionStep3` }],

        ]
    })
}

// Подбор займ 2-рой этап

const loan = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: '⏳ До 10 дней', callback_data: `loanStep1` }],
            [{ text: '⏳ От 11 до 20 дней', callback_data: `loanStep2` }],
            [{ text: '⏳ От 21 до 30 дней', callback_data: `loanStep3` }],
            [{ text: '⏳ Больше 30 дней', callback_data: `loanStep4` }],


        ]
    })
}

// Подбор займ 3-тий этап

const sentence = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: '0%', callback_data: `sentenceStep1` }],
            [{ text: '⤴️ Назад', callback_data: `selectionStep1` }],

        ]
    })
}
// Страницы офферов

const pages = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: '📜 Группа МФО 1', callback_data: `pages1` }],
            [{ text: '📜 Группа МФО 2', callback_data: `pages2` }],
            [{ text: '📜 Группа МФО 3', callback_data: `pages3` }],
            [{ text: '📜 Группа МФО 4', callback_data: `pages4` }],
            [{ text: '📜 Группа МФО 5', callback_data: `pages5` }],
            [{ text: '📜 Группа МФО 6', callback_data: `pages6` }],
            [{ text: '📜 Группа МФО 7', callback_data: `pages7` }],
            [{ text: '📜 Группа МФО 8', callback_data: `pages8` }],
            [{ text: '📜 Группа МФО 9', callback_data: `pages9` }],
            [{ text: '📜 Группа МФО 10', callback_data: `pages10` }],


        ]
    })
}


// Помощь

const help = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: `Как подобрать выгодный займ?`, callback_data: `helpStep1` }],
            [{ text: 'Как выбрать займ в Популярных Предложениях', callback_data: `helpStep2` }],
            [{ text: 'Как сменить страну', callback_data: `helpStep3` }],
        ]
    })
}


// Команда start

bot.setMyCommands([
    { command: 'start', description: 'Начать' }
])


// Первая команда /start 

bot.on('message', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]

    const chatId = msg.chat.id
    const text = msg.text

    if (text === "/start") {
        bot.sendMessage(chatId, "👨‍🦱 Вам есть 18?", setAge)
    }


})

// Это пока не нужно

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data

    if (data === "setRegionNone") {
        const user = users.filter(x => x.id == msg.from.id)[0]
        bot.sendMessage(chatId, "Временно не доступно 😕❌")
        user.region = "uk"
    }

    if (data === "setRegionOnRu") {
        user.region = "ru"
        if (user.region === `ru`) {
            const user = users.filter(x => x.id == msg.from.id)[0]
            bot.sendMessage(chatId, "Вам есть 18? 👨‍🦱", setAge)
        } else {
            bot.sendMessage(chatId, 'Не доступно')
        }


    }

    if (data === "setRegionOnKz") {
        user.region = "kz"
        if (user.region === `kz`) {
            const user = users.filter(x => x.id == msg.from.id)[0]
            bot.sendMessage(chatId, "Вам есть 18? 👨‍🦱", setAge)
        } else {
            bot.sendMessage(chatId, 'Не доступно')
        }

    }



})

// Отрисовка сколько вам лет *

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data


    if (data === 'setAge18') {

        bot.sendMessage(chatId, "Выберите параметры 📔", menuPanel)
        user.age = '18'
    }
    if (data === 'No') {

        bot.sendMessage(chatId, "Благодарим за Ваше внимание к нашему сервису, но к сожалению займы выдаются гражданам от 18 лет.")
        user.age = '-18'
    }



})

// Популярные предложения под менюшка

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data



    if (data === "step2") {
        bot.sendMessage(chatId, 'Выберите параметры 📔', popular)
    }

})

// Настройки под меню

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data



    if (data === "step3") {
        bot.sendMessage(chatId, `Выберите параметры 📔
Актуальные данные
🏔 Страна | ${user.region}
👨 Возраст | ${user.age}
        `, setings)

    }
    if (data === "setingsStep1") {
        bot.sendMessage(chatId, 'Выберите возраст 📔', setAge)
    }
    if (data === "setingsStep2") {
        bot.sendMessage(chatId, 'Выберите страну 📔', setRegion)
    }


})

// Помощь под меню

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data



    if (data === "step4") {
        bot.sendMessage(chatId, `Выберите параметры 📔`, help)

    }
    if (data === "helpStep1") {
 //       bot.sendVideo(chatId, `http://techslides.com/demos/sample-videos/small.mp4`)
        bot.sendMessage(chatId, "1. Нажимаете кнопку 💰 Подбор займа 💰. \n 2. Выбираете сумму займа. \n 3.Выбираете срок займа. \n 4.Выбираете тип займа. \n\n Далее в каждой группе организаций представлено 5 популярных МФО.  \n\n Жмите любой, далее выбирайте подходящий и жмете кнопку Получить деньги. Заполняете заявку. \n\n Обратите внимание - чтобы получить займ без процентов вам необходимо выбрать МФО, услугами которой вы еще не пользовались. Чтобы получить займ наверняка отправляйте заявки в несколько организаций. ")
//        bot.sendPhoto(chatId, `http://www.rosphoto.com/images/u/articles/1510/4_8.jpg`)
    }
    if (data === "helpStep2") {
 //       bot.sendVideo(chatId, `http://techslides.com/demos/sample-videos/small.mp4`)
        bot.sendMessage(chatId, "Нажимате кнопку 💫 Популярные предложения 💫. Далее выбирате более подходящую для вас подборку и вам будут предложены популярные варианты. \n Обратите внимание - чтобы получить займ без процентов вам необходимо выбрать МФО, услугами которой вы еще не пользовались.  \n Чтобы получить займ наверняка отправляйте заявки в несколько организаций. ")
//        bot.sendPhoto(chatId, `http://www.rosphoto.com/images/u/articles/1510/4_8.jpg`)
    }
    if (data === "helpStep3") {
 //       bot.sendVideo(chatId, `http://techslides.com/demos/sample-videos/small.mp4`)
        bot.sendMessage(chatId, "Нажимаете кнопку ⚙️ Настройки ⚙️. Вам будут показана страна, которая сейчас выставлены у вас. \n Далее нажав на кнопку 📔Выберите страну📔, вы сможете изменить страну. ")
 //       bot.sendPhoto(chatId, `http://www.rosphoto.com/images/u/articles/1510/4_8.jpg`)
    }

})

// Подбор займ второй этап отрисовка

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data


    if (data === "selectionStep1") {
        bot.sendMessage(chatId, 'Выбор срока займа📔', loan)
    }
    if (data === "selectionStep2") {
        bot.sendMessage(chatId, 'Выбор срока займа📔', loan)
    }
    if (data === "selectionStep3") {
        bot.sendMessage(chatId, 'Выбор срока займа📔', loan)
    }


})

// Подбор займ 3-тий этап отрисовка

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data



    if (data === "step1") {
        bot.sendMessage(chatId, `Выберите сумму займа 📔`, selection)

    }
    if (data === "loanStep1") {
        bot.sendMessage(chatId, 'Выбор % займа 📔', sentence)
    }
    if (data === "loanStep2") {
        bot.sendMessage(chatId, 'Выбор % займа 📔', sentence)
    }
    if (data === "loanStep3") {
        bot.sendMessage(chatId, 'Выбор % займа 📔', sentence)
    }
    if (data === "loanStep4") {
        bot.sendMessage(chatId, 'Выбор % займа 📔', sentence)
    }

    if (data === "sentenceStep3") {
        bot.sendMessage(chatId, 'Выбор % займа 📔', loan)
    }

})

// Выдача страниц

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data
    if (data === "sentenceStep1") {
        bot.sendMessage(chatId, `Выберите группу МФО 📔
❗️ В каждой группе содержатся 5 разных популярных МФО. Выбирайте любую. ❗️`, pages)
    }




})

// КНопка назад

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data

    if (data === "offerback") {
        bot.sendMessage(chatId, `Выберите группу МФО 📔
❗️ В каждой группе содержатся 5 разных популярных МФО. Выбирайте любую. ❗️`, pages)
    }

    if (data === "offerback1") {
        bot.sendMessage(chatId, `Выберите параметры 📔`, popular)
    }





})
// 1 страница офферов

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data


    const offer1 = 1
    const offer2 = 2
    const offer3 = 3
    const offer4 = 4
    const offer5 = 5

    const offersTime1 = 100
    const offersTime2 = 500
    const offersTime3 = 1500
    const offersTime4 = 2000
    const offersTime5 = 3000
    const offersTime6 = 3500
    const offersTime7 = 4500
    const offersTime8 = 5000
    const offersTime9 = 6000
    const offersTime10 = 6500


    // Оффер кнопка

    if (data === "pages1") {

        const offersKeyboard1 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer1].buttonText}`, callback_data: `offerlink`, url: `${offers[offer1].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback` }],
                ]
            })
        }
        const offersKeyboard2 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer2].buttonText}`, callback_data: `offerlink`, url: `${offers[offer2].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback` }],
                ]
            })
        }
        const offersKeyboard3 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer3].buttonText}`, callback_data: `offerlink`, url: `${offers[offer3].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback` }],
                ]
            })
        }
        const offersKeyboard4 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer4].buttonText}`, callback_data: `offerlink`, url: `${offers[offer4].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback` }],
                ]
            })
        }
        const offersKeyboard5 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer5].buttonText}`, callback_data: `offerlink`, url: `${offers[offer5].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback` }],
                ]
            })
        }

        bot.sendPhoto(chatId, offers[offer1].img, {caption:offers[offer1].titleText, reply_markup:offersKeyboard1})
        bot.sendPhoto(chatId, offers[offer2].img, {caption:offers[offer2].titleText, reply_markup:offersKeyboard2})
        bot.sendPhoto(chatId, offers[offer3].img, {caption:offers[offer3].titleText, reply_markup:offersKeyboard3})
        bot.sendPhoto(chatId, offers[offer4].img, {caption:offers[offer4].titleText, reply_markup:offersKeyboard4})
        bot.sendPhoto(chatId, offers[offer5].img, {caption:offers[offer5].titleText, reply_markup:offersKeyboard5})

    }


    if (data === "popularStep1") {

        const offersKeyboard6 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer1].buttonText}`, callback_data: `offerlink`, url: `${offers[offer1].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback1` }],
                ]
            })
        }
        const offersKeyboard7 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer2].buttonText}`, callback_data: `offerlink`, url: `${offers[offer2].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback1` }],
                ]
            })
        }
        const offersKeyboard8 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer3].buttonText}`, callback_data: `offerlink`, url: `${offers[offer3].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback1` }],
                ]
            })
        }
        const offersKeyboard9 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer4].buttonText}`, callback_data: `offerlink`, url: `${offers[offer4].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback1` }],
                ]
            })
        }
        const offersKeyboard10 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer5].buttonText}`, callback_data: `offerlink`, url: `${offers[offer5].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback1` }],
                ]
            })
        }

        bot.sendPhoto(chatId, offers[offer1].img, {caption:offers[offer1].titleText, reply_markup:offersKeyboard6})
        bot.sendPhoto(chatId, offers[offer2].img, {caption:offers[offer2].titleText, reply_markup:offersKeyboard7})
        bot.sendPhoto(chatId, offers[offer3].img, {caption:offers[offer3].titleText, reply_markup:offersKeyboard8})
        bot.sendPhoto(chatId, offers[offer4].img, {caption:offers[offer4].titleText, reply_markup:offersKeyboard9})
        bot.sendPhoto(chatId, offers[offer5].img, {caption:offers[offer5].titleText, reply_markup:offersKeyboard10})

    }


})

// 2 страница офферов

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data


    const offer1 = 6
    const offer2 = 7
    const offer3 = 8
    const offer4 = 9
    const offer5 = 10

    const offersTime1 = 100
    const offersTime2 = 500
    const offersTime3 = 1500
    const offersTime4 = 2000
    const offersTime5 = 3000
    const offersTime6 = 3500
    const offersTime7 = 4500
    const offersTime8 = 5000
    const offersTime9 = 6000
    const offersTime10 = 6500


    const offersKeyboard1 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer1].buttonText}`, callback_data: `offerlink`, url: `${offers[offer1].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard2 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer2].buttonText}`, callback_data: `offerlink`, url: `${offers[offer2].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard3 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer3].buttonText}`, callback_data: `offerlink`, url: `${offers[offer3].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard4 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer4].buttonText}`, callback_data: `offerlink`, url: `${offers[offer4].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard5 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer5].buttonText}`, callback_data: `offerlink`, url: `${offers[offer5].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }

    // Оффер кнопка
    if (data === "pages2") {


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer1].img}`)
        }, offersTime1)

        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer1].titleText}`, offersKeyboard1)
        }, offersTime2)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer2].img}`)
        }, offersTime3)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer2].titleText}`, offersKeyboard2)
        }, offersTime4)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer3].img}`)
        }, offersTime5)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer3].titleText}`, offersKeyboard3)
        }, offersTime6)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer4].img}`)
        }, offersTime7)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer4].titleText}`, offersKeyboard4)
        }, offersTime8)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer5].img}`)
        }, offersTime9)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer5].titleText}`, offersKeyboard5)
        }, offersTime10)







    }


    if (data === "popularStep2") {

        const offersKeyboard6 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer1].buttonText}`, callback_data: `offerlink`, url: `${offers[offer1].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback1` }],
                ]
            })
        }
        const offersKeyboard7 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer2].buttonText}`, callback_data: `offerlink`, url: `${offers[offer2].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback1` }],
                ]
            })
        }
        const offersKeyboard8 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer3].buttonText}`, callback_data: `offerlink`, url: `${offers[offer3].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback1` }],
                ]
            })
        }
        const offersKeyboard9 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer4].buttonText}`, callback_data: `offerlink`, url: `${offers[offer4].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback1` }],
                ]
            })
        }
        const offersKeyboard10 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer5].buttonText}`, callback_data: `offerlink`, url: `${offers[offer5].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback1` }],
                ]
            })
        }
        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer1].img}`)
        }, offersTime1)

        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer1].titleText}`, offersKeyboard6)
        }, offersTime2)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer2].img}`)
        }, offersTime3)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer2].titleText}`, offersKeyboard7)
        }, offersTime4)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer3].img}`)
        }, offersTime5)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer3].titleText}`, offersKeyboard8)
        }, offersTime6)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer4].img}`)
        }, offersTime7)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer4].titleText}`, offersKeyboard9)
        }, offersTime8)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer5].img}`)
        }, offersTime9)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer5].titleText}`, offersKeyboard10)
        }, offersTime10)
    }


})

// 3 страница офферов


bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data


    const offer1 = 11
    const offer2 = 12
    const offer3 = 13
    const offer4 = 14
    const offer5 = 15

    const offersTime1 = 100
    const offersTime2 = 500
    const offersTime3 = 1500
    const offersTime4 = 2000
    const offersTime5 = 3000
    const offersTime6 = 3500
    const offersTime7 = 4500
    const offersTime8 = 5000
    const offersTime9 = 6000
    const offersTime10 = 6500


    const offersKeyboard1 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer1].buttonText}`, callback_data: `offerlink`, url: `${offers[offer1].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard2 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer2].buttonText}`, callback_data: `offerlink`, url: `${offers[offer2].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard3 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer3].buttonText}`, callback_data: `offerlink`, url: `${offers[offer3].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard4 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer4].buttonText}`, callback_data: `offerlink`, url: `${offers[offer4].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard5 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer5].buttonText}`, callback_data: `offerlink`, url: `${offers[offer5].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }


    if (data === "popularStep5") {

        const offersKeyboard6 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer1].buttonText}`, callback_data: `offerlink`, url: `${offers[offer1].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback1` }],
                ]
            })
        }
        const offersKeyboard7 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer2].buttonText}`, callback_data: `offerlink`, url: `${offers[offer2].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback1` }],
                ]
            })
        }
        const offersKeyboard8 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer3].buttonText}`, callback_data: `offerlink`, url: `${offers[offer3].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback1` }],
                ]
            })
        }
        const offersKeyboard9 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer4].buttonText}`, callback_data: `offerlink`, url: `${offers[offer4].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback1` }],
                ]
            })
        }
        const offersKeyboard10 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer5].buttonText}`, callback_data: `offerlink`, url: `${offers[offer5].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback1` }],
                ]
            })
        }
        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer1].img}`)
        }, offersTime1)

        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer1].titleText}`, offersKeyboard6)
        }, offersTime2)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer2].img}`)
        }, offersTime3)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer2].titleText}`, offersKeyboard7)
        }, offersTime4)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer3].img}`)
        }, offersTime5)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer3].titleText}`, offersKeyboard8)
        }, offersTime6)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer4].img}`)
        }, offersTime7)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer4].titleText}`, offersKeyboard9)
        }, offersTime8)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer5].img}`)
        }, offersTime9)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer5].titleText}`, offersKeyboard10)
        }, offersTime10)
    }
    if (data === "popularStep4") {

        const offersKeyboard6 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer1].buttonText}`, callback_data: `offerlink`, url: `${offers[offer1].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback1` }],
                ]
            })
        }
        const offersKeyboard7 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer2].buttonText}`, callback_data: `offerlink`, url: `${offers[offer2].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback1` }],
                ]
            })
        }
        const offersKeyboard8 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer3].buttonText}`, callback_data: `offerlink`, url: `${offers[offer3].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback1` }],
                ]
            })
        }
        const offersKeyboard9 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer4].buttonText}`, callback_data: `offerlink`, url: `${offers[offer4].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback1` }],
                ]
            })
        }
        const offersKeyboard10 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer5].buttonText}`, callback_data: `offerlink`, url: `${offers[offer5].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback1` }],
                ]
            })
        }
        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer1].img}`)
        }, offersTime1)

        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer1].titleText}`, offersKeyboard6)
        }, offersTime2)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer2].img}`)
        }, offersTime3)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer2].titleText}`, offersKeyboard7)
        }, offersTime4)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer3].img}`)
        }, offersTime5)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer3].titleText}`, offersKeyboard8)
        }, offersTime6)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer4].img}`)
        }, offersTime7)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer4].titleText}`, offersKeyboard9)
        }, offersTime8)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer5].img}`)
        }, offersTime9)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer5].titleText}`, offersKeyboard10)
        }, offersTime10)
    }
    if (data === "popularStep3") {

        const offersKeyboard6 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer1].buttonText}`, callback_data: `offerlink`, url: `${offers[offer1].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback1` }],
                ]
            })
        }
        const offersKeyboard7 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer2].buttonText}`, callback_data: `offerlink`, url: `${offers[offer2].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback1` }],
                ]
            })
        }
        const offersKeyboard8 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer3].buttonText}`, callback_data: `offerlink`, url: `${offers[offer3].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback1` }],
                ]
            })
        }
        const offersKeyboard9 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer4].buttonText}`, callback_data: `offerlink`, url: `${offers[offer4].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback1` }],
                ]
            })
        }
        const offersKeyboard10 = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: `${offers[offer5].buttonText}`, callback_data: `offerlink`, url: `${offers[offer5].buttonHref}` }],
                    [{ text: "Назад", callback_data: `offerback1` }],
                ]
            })
        }
        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer1].img}`)
        }, offersTime1)

        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer1].titleText}`, offersKeyboard6)
        }, offersTime2)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer2].img}`)
        }, offersTime3)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer2].titleText}`, offersKeyboard7)
        }, offersTime4)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer3].img}`)
        }, offersTime5)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer3].titleText}`, offersKeyboard8)
        }, offersTime6)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer4].img}`)
        }, offersTime7)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer4].titleText}`, offersKeyboard9)
        }, offersTime8)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer5].img}`)
        }, offersTime9)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer5].titleText}`, offersKeyboard10)
        }, offersTime10)
    }
    // Оффер кнопка
    if (data === "pages3") {


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer1].img}`)
        }, offersTime1)

        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer1].titleText}`, offersKeyboard1)
        }, offersTime2)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer2].img}`)
        }, offersTime3)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer2].titleText}`, offersKeyboard2)
        }, offersTime4)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer3].img}`)
        }, offersTime5)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer3].titleText}`, offersKeyboard3)
        }, offersTime6)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer4].img}`)
        }, offersTime7)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer4].titleText}`, offersKeyboard4)
        }, offersTime8)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer5].img}`)
        }, offersTime9)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer5].titleText}`, offersKeyboard5)
        }, offersTime10)







    }


})

// 4 страница офферов

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data


    const offer1 = 16
    const offer2 = 17
    const offer3 = 18
    const offer4 = 19
    const offer5 = 20

    const offersTime1 = 100
    const offersTime2 = 500
    const offersTime3 = 1500
    const offersTime4 = 2000
    const offersTime5 = 3000
    const offersTime6 = 3500
    const offersTime7 = 4500
    const offersTime8 = 5000
    const offersTime9 = 6000
    const offersTime10 = 6500


    const offersKeyboard1 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer1].buttonText}`, callback_data: `offerlink`, url: `${offers[offer1].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard2 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer2].buttonText}`, callback_data: `offerlink`, url: `${offers[offer2].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard3 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer3].buttonText}`, callback_data: `offerlink`, url: `${offers[offer3].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard4 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer4].buttonText}`, callback_data: `offerlink`, url: `${offers[offer4].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard5 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer5].buttonText}`, callback_data: `offerlink`, url: `${offers[offer5].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }

    // Оффер кнопка
    if (data === "pages4") {


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer1].img}`)
        }, offersTime1)

        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer1].titleText}`, offersKeyboard1)
        }, offersTime2)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer2].img}`)
        }, offersTime3)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer2].titleText}`, offersKeyboard2)
        }, offersTime4)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer3].img}`)
        }, offersTime5)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer3].titleText}`, offersKeyboard3)
        }, offersTime6)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer4].img}`)
        }, offersTime7)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer4].titleText}`, offersKeyboard4)
        }, offersTime8)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer5].img}`)
        }, offersTime9)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer5].titleText}`, offersKeyboard5)
        }, offersTime10)







    }


})


// 5 страница офферов

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data


    const offer1 = 21
    const offer2 = 22
    const offer3 = 23
    const offer4 = 24
    const offer5 = 25

    const offersTime1 = 100
    const offersTime2 = 500
    const offersTime3 = 1500
    const offersTime4 = 2000
    const offersTime5 = 3000
    const offersTime6 = 3500
    const offersTime7 = 4500
    const offersTime8 = 5000
    const offersTime9 = 6000
    const offersTime10 = 6500


    const offersKeyboard1 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer1].buttonText}`, callback_data: `offerlink`, url: `${offers[offer1].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard2 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer2].buttonText}`, callback_data: `offerlink`, url: `${offers[offer2].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard3 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer3].buttonText}`, callback_data: `offerlink`, url: `${offers[offer3].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard4 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer4].buttonText}`, callback_data: `offerlink`, url: `${offers[offer4].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard5 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer5].buttonText}`, callback_data: `offerlink`, url: `${offers[offer5].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }

    // Оффер кнопка
    if (data === "pages5") {


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer1].img}`)
        }, offersTime1)

        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer1].titleText}`, offersKeyboard1)
        }, offersTime2)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer2].img}`)
        }, offersTime3)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer2].titleText}`, offersKeyboard2)
        }, offersTime4)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer3].img}`)
        }, offersTime5)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer3].titleText}`, offersKeyboard3)
        }, offersTime6)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer4].img}`)
        }, offersTime7)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer4].titleText}`, offersKeyboard4)
        }, offersTime8)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer5].img}`)
        }, offersTime9)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer5].titleText}`, offersKeyboard5)
        }, offersTime10)







    }


})


// 6 страница офферов

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data


    const offer1 = 26
    const offer2 = 27
    const offer3 = 28
    const offer4 = 29
    const offer5 = 30

    const offersTime1 = 100
    const offersTime2 = 500
    const offersTime3 = 1500
    const offersTime4 = 2000
    const offersTime5 = 3000
    const offersTime6 = 3500
    const offersTime7 = 4500
    const offersTime8 = 5000
    const offersTime9 = 6000
    const offersTime10 = 6500


    const offersKeyboard1 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer1].buttonText}`, callback_data: `offerlink`, url: `${offers[offer1].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard2 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer2].buttonText}`, callback_data: `offerlink`, url: `${offers[offer2].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard3 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer3].buttonText}`, callback_data: `offerlink`, url: `${offers[offer3].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard4 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer4].buttonText}`, callback_data: `offerlink`, url: `${offers[offer4].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard5 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer5].buttonText}`, callback_data: `offerlink`, url: `${offers[offer5].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }

    // Оффер кнопка
    if (data === "pages6") {


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer1].img}`)
        }, offersTime1)

        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer1].titleText}`, offersKeyboard1)
        }, offersTime2)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer2].img}`)
        }, offersTime3)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer2].titleText}`, offersKeyboard2)
        }, offersTime4)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer3].img}`)
        }, offersTime5)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer3].titleText}`, offersKeyboard3)
        }, offersTime6)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer4].img}`)
        }, offersTime7)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer4].titleText}`, offersKeyboard4)
        }, offersTime8)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer5].img}`)
        }, offersTime9)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer5].titleText}`, offersKeyboard5)
        }, offersTime10)







    }


})


// 7 страница офферов

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data


    const offer1 = 31
    const offer2 = 32
    const offer3 = 33
    const offer4 = 34
    const offer5 = 35

    const offersTime1 = 100
    const offersTime2 = 500
    const offersTime3 = 1500
    const offersTime4 = 2000
    const offersTime5 = 3000
    const offersTime6 = 3500
    const offersTime7 = 4500
    const offersTime8 = 5000
    const offersTime9 = 6000
    const offersTime10 = 6500


    const offersKeyboard1 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer1].buttonText}`, callback_data: `offerlink`, url: `${offers[offer1].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard2 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer2].buttonText}`, callback_data: `offerlink`, url: `${offers[offer2].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard3 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer3].buttonText}`, callback_data: `offerlink`, url: `${offers[offer3].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard4 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer4].buttonText}`, callback_data: `offerlink`, url: `${offers[offer4].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard5 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer5].buttonText}`, callback_data: `offerlink`, url: `${offers[offer5].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }

    // Оффер кнопка
    if (data === "pages7") {


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer1].img}`)
        }, offersTime1)

        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer1].titleText}`, offersKeyboard1)
        }, offersTime2)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer2].img}`)
        }, offersTime3)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer2].titleText}`, offersKeyboard2)
        }, offersTime4)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer3].img}`)
        }, offersTime5)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer3].titleText}`, offersKeyboard3)
        }, offersTime6)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer4].img}`)
        }, offersTime7)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer4].titleText}`, offersKeyboard4)
        }, offersTime8)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer5].img}`)
        }, offersTime9)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer5].titleText}`, offersKeyboard5)
        }, offersTime10)







    }


})


// 8 страница офферов

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data



    const offer1 = 36
    const offer2 = 37
    const offer3 = 38
    const offer4 = 39
    const offer5 = 40


    const offersTime1 = 100
    const offersTime2 = 500
    const offersTime3 = 1500
    const offersTime4 = 2000
    const offersTime5 = 3000
    const offersTime6 = 3500
    const offersTime7 = 4500
    const offersTime8 = 5000
    const offersTime9 = 6000
    const offersTime10 = 6500


    const offersKeyboard1 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer1].buttonText}`, callback_data: `offerlink`, url: `${offers[offer1].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard2 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer2].buttonText}`, callback_data: `offerlink`, url: `${offers[offer2].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard3 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer3].buttonText}`, callback_data: `offerlink`, url: `${offers[offer3].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard4 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer4].buttonText}`, callback_data: `offerlink`, url: `${offers[offer4].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard5 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer5].buttonText}`, callback_data: `offerlink`, url: `${offers[offer5].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }

    // Оффер кнопка
    if (data === "pages8") {


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer1].img}`)
        }, offersTime1)

        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer1].titleText}`, offersKeyboard1)
        }, offersTime2)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer2].img}`)
        }, offersTime3)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer2].titleText}`, offersKeyboard2)
        }, offersTime4)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer3].img}`)
        }, offersTime5)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer3].titleText}`, offersKeyboard3)
        }, offersTime6)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer4].img}`)
        }, offersTime7)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer4].titleText}`, offersKeyboard4)
        }, offersTime8)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer5].img}`)
        }, offersTime9)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer5].titleText}`, offersKeyboard5)
        }, offersTime10)







    }


})


// 9 страница офферов

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data


    const offer1 = 41
    const offer2 = 42
    const offer3 = 43
    const offer4 = 44
    const offer5 = 45

    const offersTime1 = 100
    const offersTime2 = 500
    const offersTime3 = 1500
    const offersTime4 = 2000
    const offersTime5 = 3000
    const offersTime6 = 3500
    const offersTime7 = 4500
    const offersTime8 = 5000
    const offersTime9 = 6000
    const offersTime10 = 6500


    const offersKeyboard1 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer1].buttonText}`, callback_data: `offerlink`, url: `${offers[offer1].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard2 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer2].buttonText}`, callback_data: `offerlink`, url: `${offers[offer2].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard3 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer3].buttonText}`, callback_data: `offerlink`, url: `${offers[offer3].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard4 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer4].buttonText}`, callback_data: `offerlink`, url: `${offers[offer4].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard5 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer5].buttonText}`, callback_data: `offerlink`, url: `${offers[offer5].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }

    // Оффер кнопка
    if (data === "pages9") {


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer1].img}`)
        }, offersTime1)

        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer1].titleText}`, offersKeyboard1)
        }, offersTime2)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer2].img}`)
        }, offersTime3)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer2].titleText}`, offersKeyboard2)
        }, offersTime4)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer3].img}`)
        }, offersTime5)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer3].titleText}`, offersKeyboard3)
        }, offersTime6)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer4].img}`)
        }, offersTime7)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer4].titleText}`, offersKeyboard4)
        }, offersTime8)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer5].img}`)
        }, offersTime9)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer5].titleText}`, offersKeyboard5)
        }, offersTime10)







    }


})


// 10 страница офферов

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data


    const offer1 = 46
    const offer2 = 47
    const offer3 = 48
    const offer4 = 49
    const offer5 = 50

    const offersTime1 = 100
    const offersTime2 = 500
    const offersTime3 = 1500
    const offersTime4 = 2000
    const offersTime5 = 3000
    const offersTime6 = 3500
    const offersTime7 = 4500
    const offersTime8 = 5000
    const offersTime9 = 6000
    const offersTime10 = 6500


    const offersKeyboard1 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer1].buttonText}`, callback_data: `offerlink`, url: `${offers[offer1].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard2 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer2].buttonText}`, callback_data: `offerlink`, url: `${offers[offer2].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard3 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer3].buttonText}`, callback_data: `offerlink`, url: `${offers[offer3].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard4 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer4].buttonText}`, callback_data: `offerlink`, url: `${offers[offer4].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }
    const offersKeyboard5 = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: `${offers[offer5].buttonText}`, callback_data: `offerlink`, url: `${offers[offer5].buttonHref}` }],
                [{ text: "Назад", callback_data: `offerback` }],
            ]
        })
    }

    // Оффер кнопка
    if (data === "pages10") {


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer1].img}`)
        }, offersTime1)

        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer1].titleText}`, offersKeyboard1)
        }, offersTime2)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer2].img}`)
        }, offersTime3)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer2].titleText}`, offersKeyboard2)
        }, offersTime4)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer3].img}`)
        }, offersTime5)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer3].titleText}`, offersKeyboard3)
        }, offersTime6)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer4].img}`)
        }, offersTime7)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer4].titleText}`, offersKeyboard4)
        }, offersTime8)


        setTimeout(s => {
            bot.sendPhoto(chatId, `${offers[offer5].img}`)
        }, offersTime9)
        setTimeout(s => {
            bot.sendMessage(chatId, `${offers[offer5].titleText}`, offersKeyboard5)
        }, offersTime10)







    }


})
