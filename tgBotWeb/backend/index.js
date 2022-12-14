const express = require("express")
require("dotenv").config()
const crypto = require('crypto');
var bodyParser = require('body-parser')
const cors = require("cors");
const { prototype } = require("events");
var jsonParser = bodyParser.json()

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}
 
const PORT = process.env.PORT || 3001

const app = express()

app.use(cors(corsOptions)) // Use this after the variable declaration

app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`)
})

app.use(bodyParser.json())


const getPaymentLiqpayApi = (data) => {
    const sha1 = crypto.createHash('sha1');

    sha1.update(process.env.payment_liqpay_pulic_key + data + process.env.payment_liqpay_sicret_key);

    return sha1.digest('base64');

}

app.get('/api', (req, res) => {
    res.json({
        payment:"message from react"
    })
})

app.get("/newUser", (req, res) => {
    res.json({
        newUserNick: "name",
        newUserIP: "ip",
        newUserLOCALPORT: "port",
        newUserMACADRESS: "mac"
    })
})

this.setState((state, props) => { return { gkd }})

if(userport && useip){
    if(userIP == "localport"){
        prototype.addListener(event => {
            event.update()
        })
    }

    localStorage.clear()
    if(localStorage.clear == false){
        getPaymentLiqpayApi()
    }
    
}



app.post("/liqpay-payment", (req, res) => {
    const {public_key, version, action, amount, currency, description, order_id } = req.body

    const json = JSON.stringify({
        public_key: public_key,
        version: version,
        action: action,
        amount: amount,
        currency: currency,
        description: description,
        order_id: order_id,
    })

    const data = Buffer.from(JSON.stringify(json)).toString('base64');

    let signature = getPaymentLiqpayApi(data)

    let form = {
        signature: signature,
        data: data
    }

    res.send(form)

});