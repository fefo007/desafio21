const mongoose = require("mongoose");
const config = require ('../../../config')
const logger = require('../../../utils/loggers/loggers')


mongoose.set('strictQuery', false);
try {
    mongoose.connect(config.MONGO_STORE)
    logger.info('base de datos conectada')
} catch (error) {
    logger.error(error)
}

let instance = null

class MongoDbUser{
    constructor(collectionName,schema){
        this.collection = mongoose.model(collectionName,schema)
    }

    async getUser(username){
        try{
            let file = await this.collection.findOne({username:`${username}`})
            return file
        }
        catch(err){
            logger.error('no se pudo cargar el archivo')
        }
    }
    async saveUser(user){
        try{
            const userSave= await this.collection.create(user)
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

    static getInstance(collectionName,schema){
        if(!instance){
            instance =  new MongoDbUser(collectionName,schema)
        }
        return instance
    }
}

module.exports = MongoDbUser