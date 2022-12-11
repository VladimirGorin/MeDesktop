module.exports = let occupationCommand = {
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