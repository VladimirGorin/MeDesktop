const express = require("express")
const fs = require('fs')
const app = express()
const JsonObjectPath = '../data.json'
const jsonParser = express.json()
const file = require('../data.json')

app.post('/user', jsonParser, function (req, res){
    console.log(req.body)
    if(!req.body) return res.sendStatus(400)
    res.json(req.body)
    let newClickTrue = [{
        click: true
    }]
    let dataTrue = JSON.stringify(newClickTrue);

    fs.writeFileSync(JsonObjectPath, dataTrue)
    console.log(file)



})

app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html')
})
console.log('server started!')
app.listen(3000)