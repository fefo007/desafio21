const admin = require('firebase-admin')
const fs = require('fs')
const config = require ('../../../config')
const logger = require('../../../utils/loggers/loggers')


try {
    const serviceAccount = JSON.parse(fs.readFileSync('./gamer-house-ecommerce-firebase-adminsdk-r3y0i-eec17eac6d.json','utf-8'))
    admin.initializeApp({
        credential:admin.credential.cert(serviceAccount)
    })
    logger.info('base de datos conectada con exito')
} catch (error) {
    logger.error(error)
}
const db = admin.firestore()


let instance = null

class FireBaseUser{
    constructor(){
        this.collection = db.collection('usuarios')
    }

    async getUser(username){
        try{
            let file = await this.collection.get({username:`${username}`})
            return file
        }
        catch(err){
            logger.error('no se pudo cargar el archivo')
        }
    }
    async saveUser(user){
        try{
            const userSave= await this.collection.doc().set(user)
            logger.info(`${userSave}guardado con exito`)
            return {...userSave,id:userSave._id}}
        catch (error){
            logger.error('error de escritura')
        }
    }
    async  updateUserByUsername(userUpdate){
        try{
            const updateUser=await this.collection.replaceOne({username:username},userUpdate)
            return updateUser}
        catch(error){
            logger.error('error al actualizar')
        }
    }

    static getInstance(){
        if(!instance){
            instance =  new FireBaseUser()
        }
        return instance
    }
}

module.exports = FireBaseUser