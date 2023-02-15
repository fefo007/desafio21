
const MemoryUsers = require('./memoryDaos/MemoryUsers')
const MongoDbUser =require('./mongoDaos/MongoDbUser')
const {userSchema} = require('../mongoSchemas/mongoSchemas')

const option = process.argv[2] || 'Memory'

let dao
switch (option) {
    case 'Mongo':
        dao = MongoDbUser.getInstance('usuarios',userSchema)
        break;
    default: 'Memory'
        dao = MemoryUsers.getInstance()
        break;
}

class UserFactoryDaos{
    static getDao(){
        return dao
    }
}

module.exports=UserFactoryDaos