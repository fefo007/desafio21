const sendMail=require('../utils/sendNotifications/sendEmail')
const {newUserEmail}=require('../utils/sendNotifications/emailTemplates')
const bCrypt = require('bcrypt')
// BASES DE DATOS 
const UserFactory = require('../db/daos/UserFactoryDao')
// const MongoDbUser = require('../db/daos/mongoDaos/MongoDbUser')
// const userSchema = require('../db/mongoSchemas/mongoSchemas')
const userDao = UserFactory.getDao()
// const mongoDbUserContainer = MongoDbUser.getInstance('usuarios',userSchema)
// const mongoDbUserContainer = new MongoDbUser('usuarios',userSchema)

// const MemoryUsers=require('../db/daos/memoryDaos/MemoryUsers')
// const memoryUsers = MemoryUsers.getInstance()
// const memoryUsers=new MemoryUsers()



const passportRegisterConfig = async (req, username, password, done) => {

    const {email,direcction,age,cel} = req.body
    console.log(req.body)
    // BASE DE DATOS--------- 
    let user = await userDao.getUser(username)
    // let user =await memoryUsers.getUser(username)

    if (user) {
    return done('usuario ya existente')
    }
    user = {
        username:username,
        password:bCrypt.hashSync(password,bCrypt.genSaltSync(10),null),
        email:email,
        direcction:direcction,
        age:age,
        cel:cel,
        image:req.file
    }
    // console.log(user)

    // BASE DE DATOS--------- 
    userDao.saveUser(user)
    // memoryUsers.saveUser(user)

    const newuser=newUserEmail(user)
    sendMail('nuevo usuario',newuser)

    return done(null, user)
}

function isValidPass(user,password){
    return bCrypt.compareSync(password,user.password)
}

const passportLoginConfig= async(username, password, done) => {

    // BASE DE DATOS--------- 
    const user =await userDao.getUser(username)
    // const user =await memoryUsers.getUser(username)
    console.log(user)
    if (!user) {
        return done(null, false)
    }

    if (!isValidPass(user,password)) {
        return done(null, false)
    }

    user.contador = 0
    return done(null, user);
}


const passportSerializerConfig=function (user, done) {
    done(null, user.username);
}

const passportDesserializerConfig=async function (username, done) {
    // BASE DE DATOS--------- 
    const user =await userDao.getUser(username)
    // const user =await memoryUsers.getUser(username)
    done(null, user);
}

module.exports={passportRegisterConfig,
    passportLoginConfig,
    passportSerializerConfig,
    passportDesserializerConfig}