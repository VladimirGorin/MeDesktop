let md = module.exports
md.yesImSure = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Да', callback_data: `yesImSure1` }],
            [{ text: 'Нет', callback_data: `yesImSure2` }]

        ]
    })
}
md.occupationCommand = {
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
md.reductorCommand = {
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
md.activityCommand = {
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
md.activityCommandReducter = {
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
md.searchConsultetion = {
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
md.consultationCommand = {
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
md.needHelp = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'по работе', callback_data: `needHelp1` }],
            [{ text: 'неформальное общение', callback_data: `needHelp2` }]

        ]
    })
}
md.helpTo = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'по работе', callback_data: `helpTo1` }],
            [{ text: 'неформальное общение', callback_data: `helpTo2` }]

        ]
    })
}
md.helpToReducter = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'по работе', callback_data: `helpToReducter1` }],
            [{ text: 'неформальное общение', callback_data: `helpToReducter2` }]

        ]
    })
}
md.menuCommand = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'редактировать профиль', callback_data: `menuCommand1` }],
            [{ text: 'получить консультацию', callback_data: `menuCommand2` }],
            [{ text: 'поболтать', callback_data: `menuCommand3` }],

        ]
    })
}
md.stopIt = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Заглушка на время.', callback_data: `stopIt1` }],


        ]
    })
}
md.onlineOffline = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Офлайн общение', callback_data: `onlineOffline1` }],
            [{ text: 'Онлайн общение', callback_data: `onlineOffline2` }],

        ]
    })
}
md.loginEndThe = {
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
md.realiLiveKeyboard = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Да', callback_data: `realiLiveKeyboard1` }],
            [{ text: 'Нет', callback_data: `realiLiveKeyboard2` }]

        ]
    })
}
md.consultationKeyboard = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Да', callback_data: `consultationKeyboard1` }],
            [{ text: 'Нет', callback_data: `consultationKeyboard2` }]

        ]
    })
}
md.speekKeyBoard = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Да', callback_data: `speekKeyBoard1` }],
            [{ text: 'Нет', callback_data: `speekKeyBoard2` }]

        ]
    })
}
md.consultationOff = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Выключить поиск консультации?', callback_data: `consultationOff1` }],
        ]
    })
}
md.poboltatOff = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Выключить поиск чат?', callback_data: `poboltatOff1` }],
        ]
    })
}
