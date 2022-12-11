const TelegramBotApi = require('node-telegram-bot-api')
const token = '5734233561:AAEuZ_ZJqEZi-7eyfKQbOsLaK_8wSY0xrc4'
const bot = new TelegramBotApi(token, { polling: true })
const trainingList = require('./trainingList.js')
const listText = require('./trainingText.js')


const users = require('./config/data/users.json')
const video_path = "./config/video/"

function prettify(number) {
    return String(number).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ").replace(/\s/g, '.')
}

function getLocaltime(){
    return new Date().toLocaleTimeString();
}

function deleteKeyboard(chatId, msgId) {
    bot.deleteMessage(chatId, msgId)
}

setInterval(() => {
    require('fs').writeFileSync('./config/data/users.json', JSON.stringify(users, null, '\t'))
}, 9000)

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function bot_interval_step_1(chatId, user, bot) {
    
    setTimeout(() => {
        startTraining(chatId, user, bot)
    }, 1000) // 60 = 1 min

}

function bot_interval_step_0(chatId, user, bot) {
    let chatid = chatId
    let the_user = user
    setTimeout(() => {
        bot_interval_step_1(chatid, the_user)
    }, 100) // 7140 = 119 min

}

function bot_interval_step_3(chatId, user) {
    setTimeout(() => {
        setTimeout(() => {
            bot.sendMessage(chatId, `Второй этап: ${listText[0].text}`)
            startTrainingStep2(chatId, user)
        }, 3000)
    }, 3000) // 7140 = 119 min

}



bot.on('message', msg => {
    var user = users.filter(x => x.id === msg.from.id)[0]
    if (!user) {
        users.push({
            id: msg.from.id,
            nick: msg.from.username,
            langue: null,
            gender: null,
            age: null,
            name: null,
            coin: 495,
            bank: null,
            step: null,
            complaints: null,
            timePerPc: null,
            breaks: null,
            trainingSteps: null

        })
        user = users.filter(x => x.id === msg.from.id)[0]
    }
})


const selectLangue = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Русский', callback_data: `selectLangue1` }, 
            { text: 'English', callback_data: `selectLangue2` }],

        ]
    })
}

const selectGender= {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'мужчина', callback_data: `selectGender1` }, 
            { text: 'женщина', callback_data: `selectGender2` }],

        ]
    })
}

const nextButton = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Далее', callback_data: `nextButton1` }]
        ]
    })
}

const selectage = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'менее 17', callback_data: "selectage1"},],
            [
            { text: '18-24', callback_data: "selectage2"}, 
            { text: '25-30', callback_data: "selectage3"}, 
            { text: '31-40', callback_data: "selectage4"},
            ],
            [
               { text: '41-50', callback_data: "selectage5"}, 
            { text: 'более 51', callback_data: "selectage6"},
            ],

        ]
    })
}


const lookVideo = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'смотреть видео', callback_data: "lookVideo1"},],
            [{ text: 'пропустить', callback_data: "lookVideo2"},],
        ]
    })
}


const mainMenu = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'основная информация', callback_data: "mainMenu1"},],
            [{ text: 'личный кабинет', callback_data: "mainMenu2"},],
            [{ text: 'расписание', callback_data: "mainMenu3"}, { text: 'баланс', callback_data: "mainMenu4"}],
            [{ text: 'задать вопрос', callback_data: "mainMenu5"}]
        ]
    })
}

const submenu1Block = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Анонс', callback_data: "submenu1Block1"},],
            [{ text: '- договор оферты', callback_data: "submenu1Block2"},],
            [{ text: 'о команде', callback_data: "submenu1Block3"}, { text: 'баланс', callback_data: "submenu1Block4"}],
            [{ text: 'обратная связь', callback_data: "submenu1Block5"}]
        ]
    })
}

const submenu2Block = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'анкета', callback_data: "submenu2Block1"},],
            [{ text: 'расписание', callback_data: "submenu2Block2"},],
            [{ text: 'бонусы', callback_data: "submenu2Block3"}, { text: 'баланс', callback_data: "submenu2Block4"}],
            [{ text: 'отчет', callback_data: "submenu2Block5"}]
        ]
    })
}

const submenuHelps  = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Копить', callback_data: "submenuHelps1"},],
            [{ text: 'Перенести в сейф', callback_data: "submenuHelps2"},],
            [{ text: 'Заморозить', callback_data: "submenuHelps3"}, { text: 'баланс', callback_data: "submenuHelps4"}],
            [{ text: 'Перевести другу', callback_data: "submenuHelps5"}],
            [{ text: 'Положить на счет в Healthlance Банк ', callback_data: "submenuHelps6"}],
            [{ text: 'Перевести в благотворительный детский фонд', callback_data: "submenuHelps7"}]

        ]
    })
}

const submenuHelp  = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Фак', callback_data: "submenuHelp1"},],
            [{ text: 'Задать вопрос тренеру', callback_data: "submenuHelp2"},],
            [{ text: 'Запросить особую программу', callback_data: "submenuHelp3"}]

        ]
    })
}

const submenu3Block = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'день недели - время ', callback_data: "submenu3Block1"},],
        ]
    })
}

const submenu4Block = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'пока не делаем', callback_data: "submenu4Block1"},],
        ]
    })
}

const submenu1Questionnaire = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Начать', callback_data: "submenu1Questionnaire1"},],

        ]
    })
}

const submenu1QuestionnaireDate = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'менее 17', callback_data: "submenu1QuestionnaireDate1"},],
            [
            { text: '18-24', callback_data: "submenu1QuestionnaireDate2"}, 
            { text: '25-30', callback_data: "submenu1QuestionnaireDate3"}, 
            { text: '31-40', callback_data: "submenu1QuestionnaireDate4"},
            ],
            [{ text: '41-50', callback_data: "submenu1QuestionnaireDate5"}, 
            { text: 'более 51', callback_data: "submenu1QuestionnaireDate6"},],


        ]
    })
}

const submenu1QuestionnaireHealth = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'да', callback_data: "submenu1QuestionnaireHealth1"},{ text: 'нет', callback_data: "submenu1QuestionnaireHealth2"},],
            [{ text: 'иногда', callback_data: "submenu1QuestionnaireHealth3"},],


        ]
    })
}
const submenu1QuestionnaireIndividually = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'инд, коллектив', callback_data: "submenu1QuestionnaireIndividually1"},],

        ]
    })
}

const submenu1QuestionnairePerPc = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
            { text: '0-1', callback_data: "submenu1QuestionnairePerPc1"},
            { text: '2-3', callback_data: "submenu1QuestionnairePerPc2"}, 
            ],
            [
            { text: '4-5', callback_data: "submenu1QuestionnairePerPc3"}, 
            { text: '6-7', callback_data: "submenu1QuestionnairePerPc4"},
            ],
            [{ text: '8+', callback_data: "submenu1QuestionnairePerPc5"}],


        ]
    })
}

const submenu1QuestionnaireBreaks = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'каждый час', callback_data: "submenu1QuestionnaireBreaks1"},],
            [{ text: 'каждые два часа', callback_data: "submenu1QuestionnaireBreaks2"},],
            [{ text: 'по назначению тренера (рекомендуется)', callback_data: "submenu1QuestionnaireBreaks3"}],


        ]
    })
}

const startTrainingStep1Keyboard = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Готово', callback_data: "startTrainingStep1Keyboard1"},],
            [{ text: 'След упражнение…', callback_data: "startTrainingStep1Keyboard2"},],
            [{ text: 'Пропустить тренеровку', callback_data: "startTrainingStep1Keyboard3"}],


        ]
    })
}

const startTrainingStep2Keyboard = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Готово', callback_data: "startTrainingStep2Keyboard1"},],
            [{ text: 'След упражнение…', callback_data: "startTrainingStep2Keyboard2"},],
            [{ text: 'Пропустить тренеровку', callback_data: "startTrainingStep2Keyboard3"}],


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
        bot.sendMessage(chatId, "Выберете язык.", selectLangue)
    }



})


bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data

    if(data === "selectLangue1"){
        bot.sendMessage(chatId, "Укажите Ваш пол", selectGender)
        user.langue = "ru"

    }
    if(data === "selectLangue2"){
        bot.sendMessage(chatId, "Укажите Ваш пол", selectGender)
        user.langue = "en"
    }
    const msgId = msg.message.message_id
    deleteKeyboard(chatId, msgId)

})

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data

    if(data === "selectGender1"){
        bot.sendMessage(chatId, "Укажите Ваш возраст", selectage)
        user.gender = "male"

    }
    if(data === "selectGender2"){
        bot.sendMessage(chatId, "Укажите Ваш возраст", selectage)
        user.langue = "woman"
    }
    const msgId = msg.message.message_id
    deleteKeyboard(chatId, msgId)

})

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data
    
    if(data === `selectage1`){
        bot.sendMessage(chatId, "Введите своё имя командой - name ВАШЕ ИМЯ")
        user.age = "-17"
    }
    if(data === `selectage2`){
        bot.sendMessage(chatId, "Введите своё имя командой - name ВАШЕ ИМЯ")
        user.age = "18-24"

    }
    if(data === `selectage3`){
        bot.sendMessage(chatId, "Введите своё имя командой - name ВАШЕ ИМЯ")
        user.age = "25-30"

    }
    if(data === `selectage4`){
        bot.sendMessage(chatId, "Введите своё имя командой - name ВАШЕ ИМЯ")
        user.age = "31-40"

    }
    if(data === `selectage5`){
        bot.sendMessage(chatId, "Введите своё имя командой - name ВАШЕ ИМЯ")
        user.age = "41-50"

    }
    if(data === `selectage6`){
        bot.sendMessage(chatId, "Введите своё имя командой - name ВАШЕ ИМЯ")
        user.age = "51+"

    }
    const msgId = msg.message.message_id
    deleteKeyboard(chatId, msgId)

})

bot.onText(/name/, msg => {
    const chatId = msg.chat.id
    var user = users.filter(x => x.id === msg.from.id)[0]
    const text = msg.text.replace('name ',"")

    user.name = text

    let random_counter = getRandomInt(4)

    if(random_counter === 3){
        bot.sendMessage(chatId, `${user.name}, добро пожаловать в наш канал ! Наш опытный Healthlance-time тренер поможет подобрать индивидуальную программу для обновления энергии Вашего позвоночника, по новой разработанной технологии! Вы можете заниматься прямо на рабочем месте в любое время. 

Эта программа для всех, кто работает за компьютером более 4 часов. 

В целом продолжительность непрерывной работы за компьютером не должна превышать 2-х часов. И обратите внимание, что 70 % людей работают более 6 часов в день. Эксперты рекомендуют делать перерыв, который зависит от вида и сложности осуществляемой работы. Последствия - застой лимфотоков и слабое снабжение кровью жизненно важных органов человека. Некоторые из-за этого   на всю жизнь не расстаются с болью в спине и шейного отдела, и она преследует практически везде, где бы Вы не находились… 

Мы нашли решение …

Представляем Вам вашего индивидуального Healthlance-time тренера, который устраивает для вас и вашего коллектива полезные пятиминутки.”
Картинка ******************* (рандом из папки)


    `, nextButton)
    }

    if(random_counter === 2){
        bot.sendMessage(chatId, `${user.name}, добро пожаловать в наш канал ! Наш опытный Healthlance-time тренер поможет подобрать индивидуальную программу для обновления энергии Вашего позвоночника, по новой разработанной технологии! Вы можете заниматься прямо на рабочем месте в любое время. 

Хотите бюджетно сэкономить и при этом быть здоровыми? На самом деле самые сложные вещи являются в то же время и простыми, если вы изучите сам процесс и проникнитесь им. Так и с нашим здоровьем, где бы вы не находились у вас, может возникнуть в любой момент- дискомфортное состояние, которое зависит от многих факторов. И одним из них является режим и стиль вашей работы. Мы знаем, что вы очень много проводите время за компьютером, ноутбуком или телефоном, и при однотонном режиме у вас может неожиданно в любой момент, возникнуть болевые ощущения в области позвоночника и шейного отдела. Мы пришли чтобы вам помочь!!! У нас есть решение, чтобы вы были всегда здоровы и чтобы вас ничто не отвлекало - теперь за вашим состоянием будет наблюдать ваш личный тренер.
           
Пользуясь нашим Healthlance-time тренером, вы почувствуете улучшение… ведь наша технология проверена временем, все упражнения подобраны с учетом индивидуальных особенностей вашего организма и вашего распорядка дня.  

Вы можете заниматься на рабочем месте, при этом вам не потребуются специальные тренажеры и оборудование, и у вас будет свой личный наставник, который поможет не только избавиться от дискомфорта и боли, но и оставаться здоровым в течении всей рабочей недели… Он зарядит вас энергией на весь день!!!

Прямо сейчас ты можешь заполнить небольшую анкету, и наш Healthlance-time тренер подберет именно для вас упражнения на время небольшого перерыва, прямо на рабочем месте!
Картинка ******************* (рандом из папки)
        
        
    `, nextButton)
    }

    if(random_counter === 1){
        bot.sendMessage(chatId, `${user.name}, добро пожаловать в наш канал ! Наш опытный Healthlance-time тренер поможет подобрать индивидуальную программу для обновления энергии Вашего позвоночника, по новой разработанной технологии! Вы можете заниматься прямо на рабочем месте в любое время. 

Оставаться здоровым и быть успешным!! Многие из вас, наверное, замечали, как в середине дня, а особенно после обеда, наступает расслабление, слабость, сонливость, а если вы работаете за компьютером, то у вас могут появляться боли в позвоночнике и шейной зоне.

И все это является отвлекающим фактором, который не позволяет вам достичь поставленной цели и оставаться на позитиве. Наша команда врачей и тренеров разработала комплекс упражнений, который позволит вам оставаться всегда в бодром настроении в течении всего рабочего дня. При этом вам не нужны сложные тренажеры, у вас не займет это много времени, и вам не нужно одевать спортивную одежду, при этом у вас будет свой Healthlance-time тренер. Ну что попробуем!!!! 

Прямо сейчас ты можешь заполнить небольшую анкету, которую проанализирует спортивный врач и сразу предложит несколько вариантов индивидуальных упражнений во время небольшого перерыва, прямо на рабочем месте!        

Картинка ******************* (рандом из папки)`, nextButton)
    }

    const msgId = msg.message_id
    deleteKeyboard(chatId, msgId)
})

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data

    let random_counter = getRandomInt(2)


    if(data === "nextButton1"){
        if(random_counter = 0){
            bot.sendMessage(chatId, "Есть сомнения -тогда посмотри небольшое видео для ознакомление", lookVideo)
        }
        if(random_counter = 1){
            bot.sendMessage(chatId, "Есть сомнения - тогда давайте проведем небольшой тест-драйв, чтобы вы почувствовали на своем личном опыте и приняли решение.", lookVideo)
        }

    }
    const msgId = msg.message.message_id
    deleteKeyboard(chatId, msgId)


})

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data

    if(data === "lookVideo1"){
        bot.sendMessage(chatId, "Здесь будет видео - будут после установки на сервер", mainMenu)
    }


    if(data === "lookVideo2"){
        bot.sendMessage(chatId, `********Картинка**********`, mainMenu)
    }
    const msgId = msg.message.message_id
    deleteKeyboard(chatId, msgId)
})

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data
    
    if(data === "mainMenu1"){
        bot.sendMessage(chatId, "***КАРТИНКА***", submenu1Block)
    }
    if(data === "mainMenu2"){
        bot.sendMessage(chatId, `***КАРТИНКА***`, submenu2Block)
    }
    
    if(data === "mainMenu3"){
        bot.sendMessage(chatId, `***КАРТИНКА***`, submenu3Block)
    }

    if(data === "mainMenu4"){
        bot.sendMessage(chatId, `***КАРТИНКА***`, submenu4Block)
    }

    if(data === "mainMenu5"){
        bot.sendMessage(chatId, `***КАРТИНКА***`, submenuHelp)
    }
})
// submenu2Block3
bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data

    if(data === "submenu2Block3"){
        bot.sendMessage(chatId, "***КАРТИНКА***")
    }
    const msgId = msg.message.message_id
    deleteKeyboard(chatId, msgId)
})
// submenu1Block5
bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data

    if(data === "submenu1Block5"){
        bot.sendMessage(chatId, `***КАРТИНКА***

Фак - задать вопрос тренеру -запросить особую программу        
        `, submenuHelp)
    }

    if(data === "submenuHelp1"){
        bot.sendMessage(chatId, "https://t.me/Andrey022020")
    }

    if(data === "submenuHelp2"){
        bot.sendMessage(chatId, "https://t.me/Andrey022020")
    }

    if(data === "submenuHelp3"){
        bot.sendMessage(chatId, "Технические работы")
    }
})
// submenu2Block1
bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data

    if(data === "submenu2Block1"){
        bot.sendMessage(chatId, `***КАРТИНКА***
Заполнение анкеты. 
Мы очень рады ${user.name}, что Вы к нам присоединились. 
Скорее заполняйте анкету и переходите к началу наших совместных рабочих тренировок.
        
        `, submenu1Questionnaire)
    }

    if(data === "submenu1Questionnaire1"){
        bot.sendMessage(chatId, 'Дата Вашего рождения.', submenu1QuestionnaireDate)
    }
    const msgId = msg.message.message_id
    deleteKeyboard(chatId, msgId)

})

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data
    const text = `Вы хотите заниматься индивидуально или использовать функцию коллективной тренировки? Ответ - инд, коллектив`

    if(data === `submenu1QuestionnaireDate1`){
        bot.sendMessage(chatId, text, submenu1QuestionnaireIndividually)
        user.age = "-17"
    }
    if(data === `submenu1QuestionnaireDate2`){
        bot.sendMessage(chatId, text, submenu1QuestionnaireIndividually)
        user.age = "18-24"

    }
    if(data === `submenu1QuestionnaireDate3`){
        bot.sendMessage(chatId, text, submenu1QuestionnaireIndividually)
        user.age = "25-30"

    }
    if(data === `submenu1QuestionnaireDate4`){
        bot.sendMessage(chatId,text, submenu1QuestionnaireIndividually)
        user.age = "31-40"

    }
    if(data === `submenu1QuestionnaireDate5`){
        bot.sendMessage(chatId, text, submenu1QuestionnaireIndividually)
        user.age = "41-50"

    }
    if(data === `submenu1QuestionnaireDate6`){
        bot.sendMessage(chatId, text, submenu1QuestionnaireIndividually)
        user.age = "51+"

    }

    if(data === 'submenu1QuestionnaireIndividually1'){
        bot.sendMessage(chatId, "Есть ли жалобы на здоровье в целом.", submenu1QuestionnaireHealth)

        
    }
    const msgId = msg.message.message_id
    deleteKeyboard(chatId, msgId)
})

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data
    const text1 = `Сколько времени проводите за компьютером или телевизором после рабочего дня.`
    const text2 = `Как вы хотите делать перерыв? Ответы:

Пояснение к п.3 - если выберите вариант 3 (по назначению тренера, то перерыв будет назначать тренер исходя из вашей нагрузки и временем работы (настройки можно поменять)`

    if(data === `submenu1QuestionnaireHealth1`){
        bot.sendMessage(chatId, text1, submenu1QuestionnairePerPc)
        user.complaints = 'yes'
    }
    if(data === `submenu1QuestionnaireHealth2`){
        bot.sendMessage(chatId, text1, submenu1QuestionnairePerPc)
        user.complaints = 'no'
    }
    if(data === `submenu1QuestionnaireHealth3`){
        bot.sendMessage(chatId, text1, submenu1QuestionnairePerPc)
        user.complaints = 'sometimes'
    }

    if(data === "submenu1QuestionnairePerPc1"){
        bot.sendMessage(chatId, text2, submenu1QuestionnaireBreaks)
        user.timePerPc = "0-1"
    }
    if(data === "submenu1QuestionnairePerPc2"){
        bot.sendMessage(chatId, text2, submenu1QuestionnaireBreaks)
        user.timePerPc = "2-3"
    }
    if(data === "submenu1QuestionnairePerPc3"){
        bot.sendMessage(chatId, text2, submenu1QuestionnaireBreaks)
        user.timePerPc = "4-5"
    }
    if(data === "submenu1QuestionnairePerPc4"){
        bot.sendMessage(chatId, text2, submenu1QuestionnaireBreaks)
        user.timePerPc = "6-7"
    }
    if(data === "submenu1QuestionnairePerPc5"){
        bot.sendMessage(chatId, text2, submenu1QuestionnaireBreaks)
        user.timePerPc = "8+"
    }
    const msgId = msg.message.message_id
    deleteKeyboard(chatId, msgId)
})

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    const data = msg.data
    const text1 = `Ожидайте!`

    if(data === `submenu1QuestionnaireBreaks1`){
        bot.sendMessage(chatId, text1)
        user.breaks = '1Hour'
        bot_interval_step_0(chatId, user)
    }
    if(data === `submenu1QuestionnaireBreaks2`){
        bot.sendMessage(chatId, text1)
        user.breaks = '2Hour'
        bot_interval_step_0(chatId, user)
    }
    if(data === `submenu1QuestionnaireBreaks3`){
        bot.sendMessage(chatId, text1)
        user.breaks = 'byAppointment'
        bot_interval_step_0(chatId, user)
    }

    const msgId = msg.message.message_id
    deleteKeyboard(chatId, msgId)

})

function startTraining (chatId, user) {
    let random_counter = getRandomInt(10)

    bot.sendMessage(chatId, listText[0].text)

    
    setTimeout(() => {
        startTrainingStep1(chatId, user)
    }, 2000)
} 


function startTrainingStep1 (chatId, user, msgId) {

    let random_counter = getRandomInt(16)

    if(user.trainingSteps === 10){
        bot.deleteMessage(chatId, msgId)
        bot.sendMessage(chatId, "Первый этап тренеровки был пройден!")
        bot_interval_step_3(chatId, user)
    }else{
        user.coin += 5
        user.trainingSteps += 1
        bot.deleteMessage(chatId, msgId)
        bot.sendMessage(chatId, `Здесь будет видео - будут после установки на сервер
У вас на счету ${user.coin} coin

${trainingList[random_counter].text}    
        `, startTrainingStep1Keyboard)

    }
}
bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    var msgId = msg.message.message_id;//получаем Id сообщения
    const data = msg.data



    if(data === `startTrainingStep1Keyboard1`){
        startTrainingStep1(chatId, user, msgId)
    }
    if(data === `startTrainingStep1Keyboard2`){
        startTrainingStep1(chatId, user, msgId)
    }
    if(data === `startTrainingStep1Keyboard3`){
        bot.sendMessage(chatId, "Вы пропустили тренеровку! - 10 coin")
        user.coin -= 10
        // Тут функция скипа
        bot_interval_step_3(chatId, user)
    }



})

function startTrainingStep2 (chatId, user, msgId) {
    let random_counter = getRandomInt(16)
    console.log(user.trainingSteps)
    if(user.trainingSteps === 20){
        bot.sendMessage(chatId, "Второй этап тренеровки был пройден!")
        user.trainingSteps = null
        console.log(user.trainingSteps)

    }else{
        console.log(user.trainingSteps)

        user.coin += 5
        user.trainingSteps += 1
        bot.deleteMessage(chatId, msgId)
        bot.sendMessage(chatId, `Здесь будет видео - будут после установки на сервер
У вас на счету ${user.coin} coin

${trainingList[random_counter].text}    
        `, startTrainingStep2Keyboard)

    }
}

bot.on('callback_query', msg => {

    const user = users.filter(x => x.id == msg.from.id)[0]
    const chatId = msg.message.chat.id
    var msgId = msg.message.message_id; //получаем Id сообщения
    const data = msg.data



    if(data === `startTrainingStep2Keyboard1`){
        startTrainingStep2(chatId, user, msgId)
    }
    if(data === `startTrainingStep2Keyboard2`){
        startTrainingStep2(chatId, user, msgId)
    }
    if(data === `startTrainingStep2Keyboard3`){
        bot.sendMessage(chatId, "Вы пропустили тренеровку! - 10 coin")
        user.coin -= 10
        // Тут функция скипа
        bot.sendMessage(chatId, "Сеанс завершён")
    }



})


bot.on("polling_error", console.log);

