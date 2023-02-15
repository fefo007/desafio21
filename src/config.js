require('dotenv').config({path:__dirname + '/../.env'})

module.exports={
    MONGO_STORE: process.env.MONGO_STORE,
    SESSION_SECRET: process.env.SESSION_SECRET ,
    GMAIL_ACCOUNT:process.env.GMAIL_ACCOUNT,
    GMAIL_PASS:process.env.GMAIL_PASS,
    TWILIO_SID:process.env.TWILIO_SID,
    TWILIO_TOKEN:process.env.TWILIO_TOKEN,
    APP_HOST:process.env.APP_HOST
}

