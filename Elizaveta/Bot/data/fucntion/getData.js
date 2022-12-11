const fs = require('fs');


module.exports.getData = (chatId, bot) => {
    const dbData = JSON.parse(fs.readFileSync('./data/base/messages.json', (err, data) => (data)))
    
    let dict = []

    for(let i = 0; i < dbData.length; i++){
        dict.push(dbData[i][`channel${i}`])
    }


    return dict
}

