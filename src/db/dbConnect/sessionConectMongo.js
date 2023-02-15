const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const config=require('../../config')


const sessionConfig={
    store: MongoStore.create({
        mongoUrl:config.MONGO_STORE,
        mongoOptions: advancedOptions
    }),
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{maxAge:100000}
}

module.exports=sessionConfig