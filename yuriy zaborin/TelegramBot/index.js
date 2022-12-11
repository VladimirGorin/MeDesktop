const TelegramBotApi = require('node-telegram-bot-api')
const token = '5777541579:AAGChtSmNUAaZQBskW_RpYRFvzWC-yp0tEc'
//const token = '5695217857:AAGUi8xBw3Tub8HdskLRO6o5OcqLqwx_w2k'

const bot = new TelegramBotApi(token, { polling: true })
const users = require('./data/base/users.json')
const nodemailer = require('nodemailer')
const fs = require('fs');

function prettify(number) {
    return String(number).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ").replace(/\s/g, '.')
}

setInterval(() => {
    require('fs').writeFileSync('./data/base/users.json', JSON.stringify(users, null, '\t'))
}, 9000)



async function sendQuestionnaireMail(nodemailer, userMailActive, userName, userRegion, userActivity, userFieldOfActivity, userNeedHelp, userHelpTo){
    let userMailActiveU = userMailActive 
    if(userMailActiveU === false){
        let testEmailAccount = await nodemailer.createTestAccount()

        let userNameU = userName
        let userRegionU = userRegion
        let userActivityU = userActivity
        let userFieldOfActivityU = userFieldOfActivity
        let userNeedHelpU = userNeedHelp
        let userHelpToU = userHelpTo
        // Вроде бы готово
        // Aidou.aI1IP2
        let transporter = nodemailer.createTransport({
            host: 'smtp.mail.ru',
            port: 465,
            secure: true,
            auth: {
                user:"sadasdsa7343@mail.ru",
                pass:"j8jzKhaszciw9ah6nYkg"
            },
        })

        let sender = "sadasdsa7343@mail.ru"
        let to = "sadasdsa7343@mail.ru"
        let message = `Новый пользователь!`
        let subj = `<strong>Имя</strong>: ${userNameU}<br/><strong>Регион</strong>: ${userRegionU}<br/><strong>Род деятельности</strong>: ${userActivityU}<br/><strong>Cфера деятельности</strong>: ${userFieldOfActivityU}<br/><strong>Помощь</strong>: ${userHelpToU}`

        let result = await transporter.sendMail({
            from: `"От бота archmixer" <${sender}>`,
            to: `${to}, ${to}`,
            subject: `${message}`,
            text: ``,
            html: `${subj}`
        })
    }else{

    }
      
}


bot.on('message', msg => {
    var user = users.filter(x => x.id === msg.from.id)[0]
    var idCounter = users[users.length - 1].presonalId + 1
    if (!user) {
        users.push({
            presonalId: idCounter,
            username: msg.from.username,
            id: msg.from.id,
            nick: msg.from.username,
            name: null,
            chat: msg.chat.id,
            region: null,
            activity: null,
            endThe: null,
            fieldOfActivity: null,
            needHelp: null,
            helpTo: null,
            mailActive: false,
            redirectSteps: 0,
            search_user: {
                region: false,
                teame: false,
                searchType: false,
                searchedUsers: [null,"bot"]
            },
            me_options: {
                region: false,
                teame: false

            },
            search_user_speek: {
                region: false,
                teame: false,
                speek_type: false,
                searchType: false,
                searchedUsers: [null,"bot"]

            },
            me_options_speek: {
                region: false,
                teame: false,
                speek_type: false
                
            }

        })
        user = users.filter(x => x.id === msg.from.id)[0]
    }
})

const occupationCommand = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'архитектор', callback_data: `occupation1` }, { text: 'дизайнер', callback_data: `occupation2` }, { text: 'инженер', callback_data: `occupation3` }],
            [{ text: 'строитель', callback_data: `occupation4` }, { text: 'BIM', callback_data: `occupation5` }, { text: 'менеджер', callback_data: `occupation6` }],
            [{ text: 'проектировщик', callback_data: `occupation7` }, { text: 'дендролог', callback_data: `occupation8` }],
            [{ text: 'скульптор', callback_data: `occupation9` }],
            [{ text: 'муниципальный служащий', callback_data: `occupation10` }],
            [{ text: 'государственный служащий', callback_data: `occupation11` }],
            [{ text: 'социолог', callback_data: `occupation12` }, { text: 'экономист', callback_data: `occupation13` }, { text: 'историк', callback_data: `occupation14` }],
            [{ text: 'психолог', callback_data: `occupation15` }],
            [{ text: 'городской активист', callback_data: `occupation16` }],
            [{ text: 'девелопер', callback_data: `occupation17` }, { text: 'заказчик', callback_data: `occupation18` }],
            [{ text: 'организатор мероприятий', callback_data: `occupation19` }],
            [{ text: 'преподаватель', callback_data: `occupation20` }],
            [{ text: 'Указать свой вариант', callback_data: `occupation21` }],

        ]
    })
}

const reductorCommand = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'архитектор', callback_data: `reductorCommand1` }, { text: 'дизайнер', callback_data: `reductorCommand2` }, { text: 'инженер', callback_data: `reductorCommand3` }],
            [{ text: 'строитель', callback_data: `reductorCommand4` }, { text: 'BIM', callback_data: `reductorCommand5` }, { text: 'менеджер', callback_data: `reductorCommand6` }],
            [{ text: 'проектировщик', callback_data: `reductorCommand7` }, { text: 'дендролог', callback_data: `reductorCommand8` }],
            [{ text: 'скульптор', callback_data: `reductorCommand9` }],
            [{ text: 'муницип альный служащий', callback_data: `reductorCommand10` }],
            [{ text: 'государственный служащий', callback_data: `reductorCommand11` }],
            [{ text: 'социолог', callback_data: `reductorCommand12` }, { text: 'экономист', callback_data: `reductorCommand13` }, { text: 'историк', callback_data: `reductorCommand14` }],
            [{ text: 'психо лог', callback_data: `reductorCommand15` }],
            [{ text: 'городской активист', callback_data: `reductorCommand16` }],
            [{ text: 'девелопер', callback_data: `reductorCommand17` }, { text: 'заказчик', callback_data: `reductorCommand18` }],
            [{ text: 'организатор мероприятий', callback_data: `reductorCommand19` }],
            [{ text: 'преподаватель', callback_data: `reductorCommand20` }],
            [{ text: 'Указать свой вариант', callback_data: `reductorCommand21` }],

        ]
    })
}

const activityCommand = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'архитектурное проектирование', callback_data: `activity1`}],
            [{ text: 'зданий (концепции/ рабочая документация)', callback_data: `activity2`}],
            [{ text: 'реставрация', callback_data: `activity3`}],
            [{ text: 'строительство', callback_data: `activity4`}],
            [{ text: 'дизайн интерьера', callback_data: `activity5`}],
            [{ text: 'градостроительство', callback_data: `activity6`}],
            [{ text: 'редевелопмент', callback_data: `activity7`}],
            [{ text: 'мастерпланирование', callback_data: `activity8`}],
            [{ text: 'комплексное развитие территорий', callback_data: `activity9`}],
            [{ text: 'ландшафтный дизайн', callback_data: `activity10`}],
            [{ text: 'благоустройство', callback_data: `activity11`}],
            [{ text: 'визуализация', callback_data: `activity12`}],
            [{ text: 'краеведение', callback_data: `activity13` }],
            [{ text: 'Свой вариант', callback_data: `activity14` }]

        ]
    })
}

const activityCommandReducter = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'архитектурное проектирование', callback_data: `activityCommandReducter1`}],
            [{ text: 'зданий (концепции/ рабочая документация)', callback_data: `activityCommandReducter2`}],
            [{ text: 'реставрация', callback_data: `activityCommandReducter3`}],
            [{ text: 'строительство', callback_data: `activityCommandReducter4`}],
            [{ text: 'дизайн интерьера', callback_data: `activityCommandReducter5`}],
            [{ text: 'градостроительство', callback_data: `activityCommandReducter6`}],
            [{ text: 'редевелопмент', callback_data: `activityCommandReducter7`}],
            [{ text: 'мастерпланирование', callback_data: `activityCommandReducter8`}],
            [{ text: 'комплексное развитие территорий', callback_data: `activityCommandReducter9`}],
            [{ text: 'ландшафтный дизайн', callback_data: `activityCommandReducter10`}],
            [{ text: 'благоустройство', callback_data: `activityCommandReducter11`}],
            [{ text: 'визуализация', callback_data: `activityCommandReducter12`}],
            [{ text: 'краеведение', callback_data: `activityCommandReducter13` }],
            [{ text: 'Свой вариант', callback_data: `activityCommandReducter14` }]

        ]
    })
}



const searchConsultetion = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'архитектурное проектирование', callback_data: `searchConsultetion1`}],
            [{ text: 'зданий (концепции/ рабочая документация)', callback_data: `searchConsultetion2`}],
            [{ text: 'реставрация', callback_data: `searchConsultetion3`}],
            [{ text: 'строительство', callback_data: `searchConsultetion4`}],
            [{ text: 'дизайн интерьера', callback_data: `searchConsultetion5`}],
            [{ text: 'градостроительство', callback_data: `searchConsultetion6`}],
            [{ text: 'редевелопмент', callback_data: `searchConsultetion7`}],
            [{ text: 'мастерпланирование', callback_data: `searchConsultetion8`}],
            [{ text: 'комплексное развитие территорий', callback_data: `searchConsultetion9`}],
            [{ text: 'ландшафтный дизайн', callback_data: `searchConsultetion10`}],
            [{ text: 'благоустройство', callback_data: `searchConsultetion11`}],
            [{ text: 'визуализация', callback_data: `searchConsultetion12`}],
            [{ text: 'краеведение', callback_data: `searchConsultetion13` }],
            [{ text: 'центр компетенций', callback_data: `searchConsultetion14` }],
            [{ text: 'Свой вариант', callback_data: `searchConsultetion15` }]


        ]
    })
}

const consultationCommand = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'архитектурное проектирование', callback_data: `consultationCommand1`}],
            [{ text: 'зданий (концепции/ рабочая документация)', callback_data: `consultationCommand2`}],
            [{ text: 'реставрация', callback_data: `consultationCommand3`}],
            [{ text: 'строительство', callback_data: `consultationCommand4`}],
            [{ text: 'дизайн интерьера', callback_data: `consultationCommand5`}],
            [{ text: 'градостроительство', callback_data: `consultationCommand6`}],
            [{ text: 'редевелопмент', callback_data: `consultationCommand7`}],
            [{ text: 'мастерпланирование', callback_data: `consultationCommand8`}],
            [{ text: 'комплексное развитие территорий', callback_data: `consultationCommand9`}],
            [{ text: 'ландшафтный дизайн', callback_data: `consultationCommand10`}],
            [{ text: 'благоустройство', callback_data: `consultationCommand11`}],
            [{ text: 'визуализация', callback_data: `consultationCommand12`}],
            [{ text: 'краеведение', callback_data: `consultationCommand13` }],
            [{ text: 'центр компетенций', callback_data: `consultationCommand14` }],
            [{ text: 'Свой вариант', callback_data: `consultationCommand15` }]


        ]
    })
}



const needHelp = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'по работе', callback_data: `needHelp1` }],
            [{ text: 'неформальное общение', callback_data: `needHelp2` }]

        ]
    })
}

const helpTo = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'по работе', callback_data: `helpTo1` }],
            [{ text: 'неформальное общение', callback_data: `helpTo2` }]

        ]
    })
}

const helpToReducter = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'по работе', callback_data: `helpToReducter1` }],
            [{ text: 'неформальное общение', callback_data: `helpToReducter2` }]

        ]
    })
}

const menuCommand = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'редактировать профиль', callback_data: `menuCommand1` }],
            [{ text: 'получить консультацию', callback_data: `menuCommand2` }],
            [{ text: 'поболтать', callback_data: `menuCommand3` }],

        ]
    })
}

const stopIt = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Заглушка на время.', callback_data: `stopIt1` }],


        ]
    })
}

const onlineOffline = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Офлайн общение', callback_data: `onlineOffline1` }],
            [{ text: 'Онлайн общение', callback_data: `onlineOffline2` }],

        ]
    })
}

const loginEndThe = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'архитектурное проектирование', callback_data: `loginEndThe1`}],
            [{ text: 'зданий (концепции/ рабочая документация)', callback_data: `loginEndThe2`}],
            [{ text: 'реставрация', callback_data: `loginEndThe3`}],
            [{ text: 'строительство', callback_data: `loginEndThe4`}],
            [{ text: 'дизайн интерьера', callback_data: `loginEndThe5`}],
            [{ text: 'градостроительство', callback_data: `loginEndThe6`}],
            [{ text: 'редевелопмент', callback_data: `loginEndThe7`}],
            [{ text: 'мастерпланирование', callback_data: `loginEndThe8`}],
            [{ text: 'комплексное развитие территорий', callback_data: `loginEndThe9`}],
            [{ text: 'ландшафтный дизайн', callback_data: `loginEndThe10`}],
            [{ text: 'благоустройство', callback_data: `loginEndThe11`}],
            [{ text: 'визуализация', callback_data: `loginEndThe12`}],
            [{ text: 'краеведение', callback_data: `loginEndThe13` }],
            [{ text: 'центр компетенций', callback_data: `loginEndThe14` }],
            [{ text: 'Свой вариант', callback_data: `loginEndThe15` }]
        ]
    })
}


const realiLiveKeyboard = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Да', callback_data: `realiLiveKeyboard1` }],
            [{ text: 'Нет', callback_data: `realiLiveKeyboard2` }]

        ]
    })
}


const consultationKeyboard = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Да', callback_data: `consultationKeyboard1` }],
            [{ text: 'Нет', callback_data: `consultationKeyboard2` }]

        ]
    })
}


const speekKeyBoard = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Да', callback_data: `speekKeyBoard1` }],
            [{ text: 'Нет', callback_data: `speekKeyBoard2` }]

        ]
    })
}

const yesImSure = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Да', callback_data: `yesImSure1` }],
            [{ text: 'Нет', callback_data: `yesImSure2` }]

        ]
    })
}


const consultationOff = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Выключить поиск консультации?', callback_data: `consultationOff1` }],
        ]
    })
}

const poboltatOff = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Выключить поиск чат?', callback_data: `poboltatOff1` }],
        ]
    })
}


// Консультация
function searchUsers(chatId, msg){
    let interval = setInterval(() => {
        let searchUsersrawdata = fs.readFileSync('./data/base/users.json');
        let student = JSON.parse(searchUsersrawdata);
    
        var idCounter = student[student.length - 1].presonalId + 1
        console.log('searchUsers started')
        for(let i = 0; i < idCounter; i++){
            var user = users.filter(x => x.id === msg.from.id)[0] 
            var region = student[i].search_user.region 
            var teame = student[i].search_user.teame 
            var id = student[i].id
            if(user.search_user.searchType === 0){
                console.log("true")
                if(region === user.search_user.region){
                    if(teame === user.search_user.teame){ 
                        let ct = i
                        let nickname = users[ct].nick
                        if(id === user.id){
                            console.log("me profile")
                        }else{
                            if(user.search_user.searchedUsers[i] === nickname){
                                console.log('user nickname = nickanme')

                            }else{                       
                                bot.sendMessage(chatId, `Мы нашли вам собеседника! Его контакт - https://t.me/${nickname}`, consultationOff)
                                user.search_user.searchedUsers.push(nickname)
                            }
                        }
                    }else{
                        console.log("teame false")

                    }
                }
                else{
                    console.log("region false")
                }

            }else if(user.search_user.searchType === 1){
                console.log('false')
                clearInterval(interval)
            }
            else{
                console.log("non")
            }
        }
    }, 2000)

}

// Поболтать
function startSerachOnline(chatId, msg){

    let interval = setInterval(() => {

        let rawdatastartSerachOnline = fs.readFileSync('./data/base/users.json');
        let student = JSON.parse(rawdatastartSerachOnline);
        
        var idCounter = users[users.length - 1].presonalId + 1
        var user = users.filter(x => x.id === msg.from.id)[0] 

        for(let i = 0; i < idCounter; i++){
            var region = student[i].search_user_speek.region 
            var teame = student[i].search_user_speek.teame 
            var speekType = student[i].search_user_speek.speek_type 
            var id = student[i].id

            if(user.search_user_speek.searchType === 0){
                if(speekType === user.search_user_speek.speek_type){
                    if(region === user.search_user_speek.region){
                        if(teame === user.search_user_speek.teame){ 
                            let nickname = users[i].nick
                            if(id === user.id){
                            }else{

                                if(user.search_user_speek.searchedUsers[i] === nickname){
                                    console.log('user has blocked')
                                }else{
                                    if(user.search_user_speek.searchedUsers[i] != nickname){
                                        bot.sendMessage(chatId, `Мы нашли вам собеседника! Его контакт - https://t.me/${nickname}`, poboltatOff)
                                        user.search_user_speek.searchedUsers.push(nickname) 
                                    }

                                }
                                // while(xt < arrLastIndex){
                                //     if(user.search_user_speek.searchedUsers[xt] === nickname){
                                //         bot.sendMessage(chatId, 'Пользователь в блоке')
                                //     }else{
                                //         if(user.search_user_speek.searchedUsers[xt] != nickname){
                                //             bot.sendMessage(chatId, `Мы нашли вам собеседника! Его контакт - https://t.me/${nickname}`, poboltatOff)
                                //             user.search_user_speek.searchedUsers.push(nickname) 
                                //         }

                                //     }

                                //     xt++
                                // }
                            }
                        
                        }else{
        
                        }
                    }else{
        
                    }
                }else{
                }
            }else if(user.search_user_speek.searchType === 1){
                console.log('false')
                clearInterval(interval)
            }else{
                console.log("non")
            }
        }
    }, 2000)


}

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


bot.setMyCommands([
    { command: 'edit', description: 'Редактировать профиль' },
    { command: 'consultation', description: 'Получить консультацию' },
    { command: 'chat', description: 'Поболтать' }
])

bot.on('callback_query', msg => {
    const chatId = msg.message.chat.id
    var user = users.filter(x => x.id === msg.from.id)[0]
    const text = msg.message.text
    const data = msg.data
    let sendText = `Выбери тему из списка или введите свой вариант

Пример: Программирование`
    let sendText2 = `Введите город 
    
Пример: Россия Москва`
    // Поболтать
    if(data === "consultationKeyboard1"){
        bot.sendMessage(chatId, sendText2)
        bot.on("message", realLiveRegion);


    }else if(data === "consultationKeyboard2"){
        user.search_user.region = false
        user.me_options.region = false
        bot.sendMessage(chatId, sendText, consultationCommand)
    }else{
    }
})

bot.on("message", msg => {
    let chatId = msg.chat.id
    let text = msg.text
    var user = users.filter(x => x.id === msg.from.id)[0]

    if(text === "/start"){
        if(user.mailActive === true){
            bot.sendMessage(chatId, "Вы уже авторизованы!")
        }else if(user.mailActive === false){
            bot.sendMessage(chatId, `Как тебя зовут?
Напиши свое имя и фамилию.

Например: Анна Иванова`)
            bot.on("message", loginName);
        }else{
            console.log("none")
        }      
    }
    if(text === "/edit"){
        let redactorArray = `Ваши настройки:
Имя: ${user.name}
Регион: ${user.region}
Род деятельности: ${user.activity}
Cфера деятельности: ${user.fieldOfActivity}
Помощь: ${user.helpTo}
    
Вы уверены что хотите изменить профиль?`
    
        if(user.mailActive === false){
            bot.sendMessage(chatId, "Вы ещё не авторизовались! Нажмите команду /start и авторизуйтесь!")
        }else{
            bot.sendMessage(chatId, redactorArray, yesImSure)
    
        }
    }
    if(text === "/consultation"){
        let realiLiveArray = `Город важен?`
    
        if(user.mailActive === false){
            bot.sendMessage(chatId, "Вы ещё не авторизовались! Нажмите команду /start и авторизуйтесь!")
    
        }else{
            user.search_user.searchType = 1
            user.search_user.searchedUsers = [null]
            bot.sendMessage(chatId, realiLiveArray, consultationKeyboard)
    
        }
    }
    if(text === "/chat"){
        let realiLiveArray = `Город важен?`
    
        if(user.mailActive === false){
            bot.sendMessage(chatId, "Вы ещё не авторизовались! Нажмите команду /start и авторизуйтесь!")
    
        }else{
            user.search_user_speek.searchType = 1
            user.search_user_speek.searchedUsers = [null]

            bot.sendMessage(chatId, realiLiveArray, realiLiveKeyboard)
    
        }
    }

    


})

bot.on('callback_query', msg => {
    const chatId = msg.message.chat.id
    var user = users.filter(x => x.id === msg.from.id)[0]
    const text = msg.message.text
    const data = msg.data
    let sendText = `Выбери тему из списка или введите свой вариант

Пример: Программирование`
    let sendText2 = `Введите город 
    
Пример: Россия Москва`
    // Поболтать
    if(data === "realiLiveKeyboard1"){
        bot.sendMessage(chatId, sendText2)
        bot.on("message", LiveRegion);


    }else if(data === "realiLiveKeyboard2"){
        user.search_user_speek.region = false
        user.me_options_speek.region = false
        bot.sendMessage(chatId, sendText, searchConsultetion)
    }else{
    }
})
// 1 step
bot.on('callback_query', msg => {
    const chatId = msg.message.chat.id
    var user = users.filter(x => x.id === msg.from.id)[0]
    const text = msg.message.text
    const data = msg.data

    let keyboards = 23

    let theText = "А ещё?"
    // уточни сферу деятельности
    // activityCommand
    let arrayOccupation = [
    "", "архитектор", "дизайнер", "инженер", "строитель", 
    "BIM","менеджер","проектировщик","дендролог",
    "скульптор","муниципальный служащий","государственный служащий","социолог", 
    "экономист", "историк", "психо лог","городской активист",
    "девелопер", "заказчик", "организатор мероприятий", "преподаватель",]


    for(let i = 0; i < keyboards; i++){
        let key = `occupation${i}`
        if(data === key){
            if(i === 1){
                user.activity = arrayOccupation[i]
                bot.sendMessage(chatId, theText, loginEndThe)

            }
            if(i === 2){
                user.activity = arrayOccupation[i]
                bot.sendMessage(chatId, theText, loginEndThe)

            }
            if(i === 3){
                user.activity = arrayOccupation[i]
                bot.sendMessage(chatId, theText, loginEndThe)

            }
            if(i === 4){
                user.activity = arrayOccupation[i]
                bot.sendMessage(chatId, theText, loginEndThe)

            }
            if(i === 5){
                user.activity = arrayOccupation[i]
                bot.sendMessage(chatId, theText, loginEndThe)

            }
            if(i === 6){
                user.activity = arrayOccupation[i]
                bot.sendMessage(chatId, theText, loginEndThe)

            }
            if(i === 7){
                user.activity = arrayOccupation[i]
                bot.sendMessage(chatId, theText, loginEndThe)

            }
            if(i === 8){
                user.activity = arrayOccupation[i]
                bot.sendMessage(chatId, theText, loginEndThe)

            }
            if(i === 9){
                user.activity = arrayOccupation[i]
                bot.sendMessage(chatId, theText, loginEndThe)

            }
            if(i === 10){
                user.activity = arrayOccupation[i]
                bot.sendMessage(chatId, theText, loginEndThe)

            }
            if(i === 11){
                user.activity = arrayOccupation[i]
                bot.sendMessage(chatId, theText, loginEndThe)

            }
            if(i === 12){
                user.activity = arrayOccupation[i]
                bot.sendMessage(chatId, theText, loginEndThe)

            }
            if(i === 13){
                user.activity = arrayOccupation[i]
                bot.sendMessage(chatId, theText, loginEndThe)

            }
            if(i === 14){
                user.activity = arrayOccupation[i]
                bot.sendMessage(chatId, theText, loginEndThe)

            }
            if(i === 15){
                user.activity = arrayOccupation[i]
                bot.sendMessage(chatId, theText, loginEndThe)

            }
            if(i === 16){
                user.activity = arrayOccupation[i]
                bot.sendMessage(chatId, theText, loginEndThe)

            }
            if(i === 17){
                user.activity = arrayOccupation[i]
                bot.sendMessage(chatId, theText, loginEndThe)

            }
            if(i === 18){
                user.activity = arrayOccupation[i]
                bot.sendMessage(chatId, theText, loginEndThe)

            }
            if(i === 19){
                user.activity = arrayOccupation[i]
                bot.sendMessage(chatId, theText, loginEndThe)

            }
            if(i === 20){

                user.activity = arrayOccupation[i]
                bot.sendMessage(chatId, theText, loginEndThe)
            }
            if(i === 21){
                bot.sendMessage(chatId, "Введите свой род деятельности")
                bot.on("message", loginDet);
            }
            


            
        }else{
            
        }

        
    }
    


})

// loginEndThe

bot.on('callback_query', msg => {
    const chatId = msg.message.chat.id
    var user = users.filter(x => x.id === msg.from.id)[0]
    const text = msg.message.text
    const data = msg.data

    let keyboards = 16
    
    let theText = "уточни сферу деятельности"
    // уточни сферу деятельности
    // activityCommand
    let arrayOccupation = [
    "", "архитектор", "дизайнер", "инженер", "строитель", 
    "BIM","менеджер","проектировщик","дендролог",
    "скульптор","муниципальный служащий","государственный служащий","социолог", 
    "экономист", "историк", "психо лог","городской активист",
    "девелопер", "заказчик", "организатор мероприятий", "преподаватель",]

    for(let i = 0; i < keyboards; i++){
        let key = `loginEndThe${i}`
        if(data === key){
            if(i === 1){
                user.endThe = arrayOccupation[i]
                bot.sendMessage(chatId, theText, activityCommand)

            }
            if(i === 2){
                user.endThe = arrayOccupation[i]
                bot.sendMessage(chatId, theText, activityCommand)

            }
            if(i === 3){
                user.endThe = arrayOccupation[i]
                bot.sendMessage(chatId, theText, activityCommand)

            }
            if(i === 4){
                user.endThe = arrayOccupation[i]
                bot.sendMessage(chatId, theText, activityCommand)

            }
            if(i === 5){
                user.endThe = arrayOccupation[i]
                bot.sendMessage(chatId, theText, activityCommand)

            }
            if(i === 6){
                user.endThe = arrayOccupation[i]
                bot.sendMessage(chatId, theText, activityCommand)

            }
            if(i === 7){
                user.endThe = arrayOccupation[i]
                bot.sendMessage(chatId, theText, activityCommand)

            }
            if(i === 8){
                user.endThe = arrayOccupation[i]
                bot.sendMessage(chatId, theText, activityCommand)

            }
            if(i === 9){
                user.endThe = arrayOccupation[i]
                bot.sendMessage(chatId, theText, activityCommand)

            }
            if(i === 10){
                user.endThe = arrayOccupation[i]
                bot.sendMessage(chatId, theText, activityCommand)

            }
            if(i === 11){
                user.endThe = arrayOccupation[i]
                bot.sendMessage(chatId, theText, activityCommand)

            }
            if(i === 12){
                user.endThe = arrayOccupation[i]
                bot.sendMessage(chatId, theText, activityCommand)

            }
            if(i === 13){
                user.endThe = arrayOccupation[i]
                bot.sendMessage(chatId, theText, activityCommand)

            }
            if(i === 14){
                user.endThe = arrayOccupation[i]
                bot.sendMessage(chatId, theText, activityCommand)

            }
            if(i === 15){
                bot.sendMessage(chatId, "Введите свой род деятельности")
                bot.on("message", loginEndTheF);
            }
            
        }else{
            
        }

        
    }
    


})

bot.on('callback_query', msg => {
    const chatId = msg.message.chat.id
    var user = users.filter(x => x.id === msg.from.id)[0]
    const text = msg.message.text
    const data = msg.data

    let keyboards = 23

    let theText = "уточни сферу деятельности"
    let arrayReductor = [
    "", "архитектор", "дизайнер", "инженер", "строитель", 
    "BIM","менеджер","проектировщик","дендролог",
    "скульптор","муницип альный служащий","государственный служащий","социолог", 
    "экономист", "историк", "психо лог","городской активист",
    "девелопер", "заказчик", "организатор мероприятий", "преподаватель",]


    for(let i = 0; i < keyboards; i++){
        let key = `reductorCommand${i}`
        if(data === key){
            if(i === 1){
                user.activity = arrayReductor[i]
                bot.sendMessage(chatId, theText, activityCommandReducter)

            }
            if(i === 2){
                user.activity = arrayReductor[i]
                bot.sendMessage(chatId, theText, activityCommandReducter)

            }
            if(i === 3){
                user.activity = arrayReductor[i]
                bot.sendMessage(chatId, theText, activityCommandReducter)

            }
            if(i === 4){
                user.activity = arrayReductor[i]
                bot.sendMessage(chatId, theText, activityCommandReducter)

            }
            if(i === 5){
                user.activity = arrayReductor[i]
                bot.sendMessage(chatId, theText, activityCommandReducter)

            }
            if(i === 6){
                user.activity = arrayReductor[i]
                bot.sendMessage(chatId, theText, activityCommandReducter)

            }
            if(i === 7){
                user.activity = arrayReductor[i]
                bot.sendMessage(chatId, theText, activityCommandReducter)

            }
            if(i === 8){
                user.activity = arrayReductor[i]
                bot.sendMessage(chatId, theText, activityCommandReducter)

            }
            if(i === 9){
                user.activity = arrayReductor[i]
                bot.sendMessage(chatId, theText, activityCommandReducter)

            }
            if(i === 10){
                user.activity = arrayReductor[i]
                bot.sendMessage(chatId, theText, activityCommandReducter)

            }
            if(i === 11){
                user.activity = arrayReductor[i]
                bot.sendMessage(chatId, theText, activityCommandReducter)

            }
            if(i === 12){
                user.activity = arrayReductor[i]
                bot.sendMessage(chatId, theText, activityCommandReducter)

            }
            if(i === 13){
                user.activity = arrayReductor[i]
                bot.sendMessage(chatId, theText, activityCommandReducter)

            }
            if(i === 14){
                user.activity = arrayReductor[i]
                bot.sendMessage(chatId, theText, activityCommandReducter)

            }
            if(i === 15){
                user.activity = arrayReductor[i]
                bot.sendMessage(chatId, theText, activityCommandReducter)

            }
            if(i === 16){
                user.activity = arrayReductor[i]
                bot.sendMessage(chatId, theText, activityCommandReducter)

            }
            if(i === 17){
                user.activity = arrayReductor[i]
                bot.sendMessage(chatId, theText, activityCommandReducter)

            }
            if(i === 18){
                user.activity = arrayReductor[i]
                bot.sendMessage(chatId, theText, activityCommandReducter)

            }
            if(i === 19){
                user.activity = arrayReductor[i]
                bot.sendMessage(chatId, theText, activityCommandReducter)

            }
            if(i === 20){

                user.activity = arrayReductor[i]
                bot.sendMessage(chatId, theText, activityCommandReducter)

            }
            if(i === 21){
                bot.sendMessage(chatId, "Введите свой род деятельности")
                bot.on("message", reductorDet);
            }


            
        }else{
           
        }

        
    }
    


})


bot.on('callback_query', msg => {
    const chatId = msg.message.chat.id
    var user = users.filter(x => x.id === msg.from.id)[0]
    const text = msg.message.text
    const data = msg.data

    let keyboards = 15

    let theText = "какая тебе нужна помощь?"

    let arrayActivity = [
    "", "архитектурное проектирование", "зданий (концепции/ рабочая документация)", "реставрация", "строительство", 
    "дизайн интерьера","градостроительство","редевелопмент","мастерпланирование",
    "комплексное развитие территорий","ландшафтный дизайн","благоустройство","визуализация", 
    "краеведение"]


    for(let i = 0; i < keyboards; i++){
        let key = `activity${i}`
        if(data === key){
            if(i === 1){
                user.fieldOfActivity = arrayActivity[i]
                bot.sendMessage(chatId, theText, helpTo)

            }
            if(i === 2){
                user.fieldOfActivity = arrayActivity[i]
                bot.sendMessage(chatId, theText, helpTo)

            }
            if(i === 3){
                user.fieldOfActivity = arrayActivity[i]
                bot.sendMessage(chatId, theText, helpTo)

            }
            if(i === 4){
                user.fieldOfActivity = arrayActivity[i]
                bot.sendMessage(chatId, theText, helpTo)

            }
            if(i === 5){
                user.fieldOfActivity = arrayActivity[i]
                bot.sendMessage(chatId, theText, helpTo)

            }
            if(i === 6){
                user.fieldOfActivity = arrayActivity[i]            
                bot.sendMessage(chatId, theText, helpTo)

            }
            if(i === 7){
                user.fieldOfActivity = arrayActivity[i]
                bot.sendMessage(chatId, theText, helpTo)

            }
            if(i === 8){
                user.fieldOfActivity = arrayActivity[i]
                bot.sendMessage(chatId, theText, helpTo)

            }
            if(i === 9){
                user.fieldOfActivity = arrayActivity[i]
                bot.sendMessage(chatId, theText, helpTo)

            }
            if(i === 10){
                user.fieldOfActivity = arrayActivity[i]
                bot.sendMessage(chatId, theText, helpTo)

            }
            if(i === 11){
                user.fieldOfActivity = arrayActivity[i]
                bot.sendMessage(chatId, theText, helpTo)

            }
            if(i === 12){
                user.fieldOfActivity = arrayActivity[i]
                bot.sendMessage(chatId, theText, helpTo)

            }
            if(i === 13){
                user.fieldOfActivity = arrayActivity[i]
                bot.sendMessage(chatId, theText, helpTo)

            }
            if(i === 14){
                bot.sendMessage(chatId, "Введите сферу деятельности")
                bot.on("message", loginDetV);
            }
            
        }else{
           
        }

        
    }
    


})

bot.on('callback_query', msg => {
    const chatId = msg.message.chat.id
    var user = users.filter(x => x.id === msg.from.id)[0]
    const text = msg.message.text
    const data = msg.data

    let keyboards = 15

    let theText = "какая тебе нужна помощь?"

    let arrayActivity = [
    "", "архитектурное проектирование", "зданий (концепции/ рабочая документация)", "реставрация", "строительство", 
    "дизайн интерьера","градостроительство","редевелопмент","мастерпланирование",
    "комплексное развитие территорий","ландшафтный дизайн","благоустройство","визуализация", 
    "краеведение"]


    for(let i = 0; i < keyboards; i++){
        let key = `activityCommandReducter${i}`
        if(data === key){
            if(i === 1){
                user.fieldOfActivity = arrayActivity[i]
                bot.sendMessage(chatId, theText, helpToReducter)

            }
            if(i === 2){
                user.fieldOfActivity = arrayActivity[i]
                bot.sendMessage(chatId, theText, helpToReducter)

            }
            if(i === 3){
                user.fieldOfActivity = arrayActivity[i]
                bot.sendMessage(chatId, theText, helpToReducter)

            }
            if(i === 4){
                user.fieldOfActivity = arrayActivity[i]
                bot.sendMessage(chatId, theText, helpToReducter)

            }
            if(i === 5){
                user.fieldOfActivity = arrayActivity[i]
                bot.sendMessage(chatId, theText, helpToReducter)

            }
            if(i === 6){
                user.fieldOfActivity = arrayActivity[i]            
                bot.sendMessage(chatId, theText, helpToReducter)

            }
            if(i === 7){
                user.fieldOfActivity = arrayActivity[i]
                bot.sendMessage(chatId, theText, helpToReducter)

            }
            if(i === 8){
                user.fieldOfActivity = arrayActivity[i]
                bot.sendMessage(chatId, theText, helpToReducter)

            }
            if(i === 9){
                user.fieldOfActivity = arrayActivity[i]
                bot.sendMessage(chatId, theText, helpToReducter)

            }
            if(i === 10){
                user.fieldOfActivity = arrayActivity[i]
                bot.sendMessage(chatId, theText, helpToReducter)

            }
            if(i === 11){
                user.fieldOfActivity = arrayActivity[i]
                bot.sendMessage(chatId, theText, helpToReducter)

            }
            if(i === 12){
                user.fieldOfActivity = arrayActivity[i]
                bot.sendMessage(chatId, theText, helpToReducter)

            }
            if(i === 13){
                user.fieldOfActivity = arrayActivity[i]
                bot.sendMessage(chatId, theText, helpToReducter)

            }
            if(i === 14){
                bot.sendMessage(chatId, "Введите сферу деятельности")
                bot.on("message", reductorDetV);
            }
            
        }else{
            
        }

        
    }
    


})


bot.on('callback_query', msg => {
    const chatId = msg.message.chat.id
    var user = users.filter(x => x.id === msg.from.id)[0]
    const text = msg.message.text
    const data = msg.data

    let keyboards = 3

    let theText = "как ты можешь помочь?"

    let arrayNeedHelp = ["", "по работе", "неформальное общение"]

    for(let i = 0; i < keyboards; i++){
        let key = `needHelp${i}`
        if(data === key){
            if(i === 1){
                user.needHelp = arrayNeedHelp[i]
            }
            if(i === 2){
                user.needHelp = arrayNeedHelp[i]
            }

            bot.sendMessage(chatId, theText, helpTo)
            
        }else{
            
        }

        
    }
    


})

bot.on('callback_query', msg => {
    const chatId = msg.message.chat.id
    var user = users.filter(x => x.id === msg.from.id)[0]
    const text = msg.message.text
    const data = msg.data

    let keyboards = 3

    let falseText = `Отлично! Ты стал участником Archimixer :)
теперь зайдите в меню и выберите тип общения`
    let trueText = "Вы уже отправляли свою анкету!"

    let arrayhelpTo = ["", "по работе", "неформальное общение"]

    for(let i = 0; i < keyboards; i++){
        let key = `helpTo${i}`
        if(data === key){
            if(i === 1){
                user.helpTo = arrayhelpTo[i]
            }
            if(i === 2){
                user.helpTo = arrayhelpTo[i]
            }
            if(user.mailActive === false){
                bot.sendMessage(chatId, falseText)

            }else{
                bot.sendMessage(chatId, trueText)

            }
            let userMailActive = user.mailActive
            let userName = user.name
            let userRegion = user.region
            let userActivity = user.activity
            let userFieldOfActivity = user.fieldOfActivity
            let userNeedHelp = user.needHelp
            let userHelpTo = user.helpTo
            

            sendQuestionnaireMail(nodemailer, userMailActive, userName, userRegion, userActivity, userFieldOfActivity, userNeedHelp, userHelpTo)
            
            user.mailActive = true

        }else{
            
        }

        
    }


    


})

bot.on('callback_query', msg => {
    const chatId = msg.message.chat.id
    var user = users.filter(x => x.id === msg.from.id)[0]
    const text = msg.message.text
    const data = msg.data

    let keyboards = 3

    let falseText = `Вы изминили свой профиль!
Имя: ${user.name}
Регион: ${user.region}
Род деятельности: ${user.activity}
Cфера деятельности: ${user.fieldOfActivity}
Помощь: ${user.helpTo}
`

    let arrayhelpTo = ["", "по работе", "неформальное общение"]

    for(let i = 0; i < keyboards; i++){
        let key = `helpToReducter${i}`
        if(data === key){
            if(i === 1){
                user.helpTo = arrayhelpTo[i]
            }
            if(i === 2){
                user.helpTo = arrayhelpTo[i]
            }
            bot.sendMessage(chatId, falseText, menuCommand)


        }else{
            
        }

        
    }


    


})

bot.on('callback_query', msg => {
    const chatId = msg.message.chat.id
    var user = users.filter(x => x.id === msg.from.id)[0]
    const text = msg.message.text
    const data = msg.data


    let keyboards = 4

    let redactorArray = `Ваши настройки:
Имя: ${user.name}
Регион: ${user.region}
Род деятельности: ${user.activity}
Cфера деятельности: ${user.fieldOfActivity}
Помощь: ${user.helpTo}

Вы уверены что хотите изменить профиль?`
    let realiLiveArray = `Город важен?`
    let speekArray = `Город важен?`

    for(let i = 0; i < keyboards; i++){
        let key = `menuCommand${i}`
        if(data === key){
            if(i === 1){
                bot.sendMessage(chatId, redactorArray, yesImSure)

            }
            if(i === 2){
                bot.sendMessage(chatId, realiLiveArray, realiLiveKeyboard)

            }
            if(i === 3){
                bot.sendMessage(chatId, speekArray, speekKeyBoard)

            }
            
        }else{
            
        }

        
    }
    
})

bot.on('callback_query', msg => {
    const chatId = msg.message.chat.id
    var user = users.filter(x => x.id === msg.from.id)[0]
    const text = msg.message.text
    const data = msg.data

    let yes = `Как тебя зовут?
Напиши свое имя и фамилию.
    
Например: Анна Иванова`
    let no =`Вы изминили свой профиль!
Имя: ${user.name}
Регион: ${user.region}
Род деятельности: ${user.activity}
Cфера деятельности: ${user.fieldOfActivity}
Помощь: ${user.helpTo}
`

    if(data === "yesImSure1"){
        bot.sendMessage(chatId, yes)
        console.log('step 1')
        bot.on("message", reductorName);

    }
    if(data === "yesImSure2"){
        bot.sendMessage(chatId, no)
    }
    
})



bot.on('callback_query', msg => {
    const chatId = msg.message.chat.id
    var user = users.filter(x => x.id === msg.from.id)[0]
    const text = msg.message.text
    const data = msg.data
    let sendText = `Введите город
    
Пример: Россия Москва`
    let sendText2 = `О чем ты хочешь поговорить? 
Введите тему 

Пример: Архетиктура`

    if(data === "speekKeyBoard1"){
        bot.sendMessage(chatId, sendText)
        bot.on("message", LiveRegion);

    }else if(data === "speekKeyBoard2"){
        
        user.me_options_speek.region = false
        user.search_user_speek.region = false
        
        bot.sendMessage(chatId, sendText2)
        bot.on("message", LiveTeame);
    }else{
    }
})

bot.on('callback_query', msg => {
    const chatId = msg.message.chat.id
    var user = users.filter(x => x.id === msg.from.id)[0]
    const text = msg.message.text
    const data = msg.data
    let sendText2 = `Отлично! Спасибо! Я начинаю искать
тебе партнеров. Это не займет много времени.`

    if(data === "onlineOffline1"){
        user.me_options_speek.speek_type = false
        user.search_user_speek.speek_type = false
        user.search_user_speek.searchType = 0
        user.search_user_speek.searchedUsers = [null]

        bot.sendMessage(chatId, sendText2)
        
        startSerachOnline(chatId, msg)

    }
    if(data === "onlineOffline2"){
        user.me_options_speek.speek_type = true
        user.search_user_speek.speek_type = true
        user.search_user_speek.searchType = 0
        user.search_user_speek.searchedUsers = [null]

        bot.sendMessage(chatId, sendText2)
        startSerachOnline(chatId, msg)
        
    }
})


bot.on('callback_query', msg => {
    const chatId = msg.message.chat.id
    var user = users.filter(x => x.id === msg.from.id)[0]
    const text = msg.message.text
    const data = msg.data

    let keyboards = 16

    let theText = `В каком формате вы хотите вести общение?`


    let arrayActivity = [
    "", "архитектурное проектирование", "зданий (концепции/ рабочая документация)", "реставрация", "строительство", 
    "дизайн интерьера","градостроительство","редевелопмент","мастерпланирование",
    "комплексное развитие территорий","ландшафтный дизайн","благоустройство","визуализация", 
    "краеведение", "центр компетенций"]


    for(let i = 0; i < keyboards; i++){
        let key = `searchConsultetion${i}`
        if(data === key){
            if(i === 1){
                user.search_user_speek.teame = arrayActivity[i]
                user.me_options_speek.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText, onlineOffline)
            }
            if(i === 2){
                user.search_user_speek.teame = arrayActivity[i]
                user.me_options_speek.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText, onlineOffline)
            }
            if(i === 3){
                user.search_user_speek.teame = arrayActivity[i]
                user.me_options_speek.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText, onlineOffline)
            }
            if(i === 4){
                user.search_user_speek.teame = arrayActivity[i]
                user.me_options_speek.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText, onlineOffline)
            }
            if(i === 5){
                user.search_user_speek.teame = arrayActivity[i]
                user.me_options_speek.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText, onlineOffline)
            }
            if(i === 6){
                user.search_user.teame = arrayActivity[i]
                user.me_options.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText, onlineOffline)
            }
            if(i === 7){
                user.search_user_speek.teame = arrayActivity[i]
                user.me_options_speek.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText, onlineOffline)
            }
            if(i === 8){
                user.search_user_speek.teame = arrayActivity[i]
                user.me_options_speek.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText, onlineOffline)
            }
            if(i === 9){
                user.search_user_speek.teame = arrayActivity[i]
                user.me_options_speek.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText, onlineOffline)
            }
            if(i === 10){
                user.search_user_speek.teame = arrayActivity[i]
                user.me_options_speek.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText, onlineOffline)
            }
            if(i === 11){
                user.search_user_speek.teame = arrayActivity[i]
                user.me_options_speek.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText, onlineOffline)
            }
            if(i === 12){
                user.search_user_speek.teame = arrayActivity[i]
                user.me_options_speek.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText, onlineOffline)
            }
            if(i === 13){
                user.search_user_speek.teame = arrayActivity[i]
                user.me_options_speek.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText, onlineOffline)

            }
            if(i === 14){
                user.search_user_speek.teame = arrayActivity[i]
                user.me_options_speek.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText, onlineOffline)
            }
            if(i === 15){
                bot.sendMessage(chatId, 'Укажите свой варинат')
                bot.on("message", LiveTeame);
            }

            
        }else{
            
        }

        
    }
    


})


bot.on('callback_query', msg => {
    const chatId = msg.message.chat.id
    var user = users.filter(x => x.id === msg.from.id)[0]
    const text = msg.message.text
    const data = msg.data

    let keyboards = 16

    let theText = `Отлично! Спасибо! Я начинаю искать
тебе партнеров. Это не займет много времени.`


    let arrayActivity = [
    "", "архитектурное проектирование", "зданий (концепции/ рабочая документация)", "реставрация", "строительство", 
    "дизайн интерьера","градостроительство","редевелопмент","мастерпланирование",
    "комплексное развитие территорий","ландшафтный дизайн","благоустройство","визуализация", 
    "краеведение", "центр компетенций"]
    // consultationCommand

    for(let i = 0; i < keyboards; i++){
        let key = `consultationCommand${i}`
        if(data === key){
            if(i === 1){
                user.search_user.teame = arrayActivity[i]
                user.me_options.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText)
                user.search_user.searchType = 0
                user.search_user.searchedUsers = [null]
                setTimeout(() => {
                    searchUsers(chatId, msg)
            
                }, 1000)
            }
            if(i === 2){
                user.search_user.teame = arrayActivity[i]
                user.me_options.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText)
                user.search_user.searchType = 0
                user.search_user.searchedUsers = [null]
                setTimeout(() => {
                    searchUsers(chatId, msg)
            
                }, 1000)
            }
            if(i === 3){
                user.search_user.teame = arrayActivity[i]
                user.me_options.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText)
                user.search_user.searchType = 0
                user.search_user.searchedUsers = [null]
                setTimeout(() => {
                    searchUsers(chatId, msg)
            
                }, 1000)
            }
            if(i === 4){
                user.search_user.teame = arrayActivity[i]
                user.me_options.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText)
                user.search_user.searchType = 0
                user.search_user.searchedUsers = [null]
                setTimeout(() => {
                    searchUsers(chatId, msg)
            
                }, 1000)
            }
            if(i === 5){
                user.search_user.teame = arrayActivity[i]
                user.me_options.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText)
                user.search_user.searchType = 0
                user.search_user.searchedUsers = [null]
                setTimeout(() => {
                    searchUsers(chatId, msg)
            
                }, 1000)
            }
            if(i === 6){
                user.search_user.teame = arrayActivity[i]
                user.me_options.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText)
                user.search_user.searchType = 0
                user.search_user.searchedUsers = [null]
                setTimeout(() => {
                    searchUsers(chatId, msg)
            
                }, 1000)
            }
            if(i === 7){
                user.search_user.teame = arrayActivity[i]
                user.me_options.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText)
                user.search_user.searchType = 0
                user.search_user.searchedUsers = [null]
                setTimeout(() => {
                    searchUsers(chatId, msg)
            
                }, 1000)
            }
            if(i === 8){
                user.search_user.teame = arrayActivity[i]
                user.me_options.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText)
                user.search_user.searchType = 0
                user.search_user.searchedUsers = [null]
                setTimeout(() => {
                    searchUsers(chatId, msg)
            
                }, 1000)
            }
            if(i === 9){
                user.search_user.teame = arrayActivity[i]
                user.me_options.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText)
                user.search_user.searchType = 0
                user.search_user.searchedUsers = [null]
                setTimeout(() => {
                    searchUsers(chatId, msg)
            
                }, 1000)        
            }
            if(i === 10){
                user.search_user.teame = arrayActivity[i]
                user.me_options.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText)
                user.search_user.searchType = 0
                user.search_user.searchedUsers = [null]
                setTimeout(() => {
                    searchUsers(chatId, msg)
            
                }, 1000)
            }
            if(i === 11){
                user.search_user.teame = arrayActivity[i]
                user.me_options.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText)
                user.search_user.searchType = 0
                user.search_user.searchedUsers = [null]
                setTimeout(() => {
                    searchUsers(chatId, msg)
            
                }, 1000)
            }
            if(i === 12){
                user.search_user.teame = arrayActivity[i]
                user.me_options.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText)
                user.search_user.searchType = 0
                user.search_user.searchedUsers = [null]
                setTimeout(() => {
                    searchUsers(chatId, msg)
            
                }, 1000)
            }
            if(i === 13){
                user.search_user.teame = arrayActivity[i]
                user.me_options.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText)
                user.search_user.searchType = 0
                user.search_user.searchedUsers = [null]
                setTimeout(() => {
                    searchUsers(chatId, msg)
            
                }, 1000)

            }
            if(i === 14){
                user.search_user.teame = arrayActivity[i]
                user.me_options.teame = arrayActivity[i]
                bot.sendMessage(chatId, theText)
                user.search_user.searchType = 0
                user.search_user.searchedUsers = [null]
                setTimeout(() => {
                    searchUsers(chatId, msg)
            
                }, 1000)
            }
            if(i === 15){
                bot.sendMessage(chatId, 'Укажите свой варинат')
                bot.on("message", realLiveTeame);
            }

            
        }else{
            
        }

        
    }
    


})

bot.on('callback_query', msg => {
    const chatId = msg.message.chat.id
    var user = users.filter(x => x.id === msg.from.id)[0]
    const text = msg.message.text
    const data = msg.data


    if(data === "consultationOff1"){
        user.search_user.searchType = 1
        user.search_user.searchedUsers = [null]

        bot.sendMessage(chatId, `Вы успешно отключили прослушку консультации!`)
    }
})

bot.on('callback_query', msg => {
    const chatId = msg.message.chat.id
    var user = users.filter(x => x.id === msg.from.id)[0]
    const text = msg.message.text
    const data = msg.data


    if(data === "poboltatOff1"){
        user.search_user_speek.searchType = 1
        user.search_user_speek.searchedUsers = [null]
    
        bot.sendMessage(chatId, `Вы успешно отключили прослушку чата!`)
    }
})



bot.on("polling_error", console.log);

