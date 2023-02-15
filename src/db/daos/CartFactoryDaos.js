
const MemoryCart = require('./memoryDaos/MemoryCart')
const MongoDbCart = require('./mongoDaos/MongoDbCart')

const option = process.argv[2] || 'mem'

let dao
switch (option) {
    case 'Mongo':
        dao = new MongoDbCart(collectionName,schema)
        break;
    default: 'Memory'
        dao =new MemoryCart()
        break;
}

class CartFactoryDaos{
    static getDao(){
        return dao
    }
}

module.exports=CartFactoryDaos