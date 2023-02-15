const UserFactoryDao = require('../../db/daos/UserFactoryDao')
const { asUserDto } = require('../../db/dtos/userDto')
const UserModel = require('../userModel')

class UserRepo {
    #dao
    constructor(){
        this.#dao=UserFactoryDao.getDao()
    }
    async getAll(){
        const users= await this.#dao.getAll()
        return users.map(user=>new UserModel(user))
    }
    async getUser(username){
        const dto = await this.#dao.getUser(username)
        return new UserModel(dto)
    }
    async saveUser(newUser){
        await this.#dao.saveUser(asUserDto(newUser))
    }
}module.exports=UserRepo