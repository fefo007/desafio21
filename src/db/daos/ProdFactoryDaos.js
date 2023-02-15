const MemoryProd = require('./memoryDaos/MemoryProd')
const MongoDbProd= require('./mongoDaos/MongoDbProd')

const option = process.argv[2] || 'mem'

let dao
switch (option) {
    case 'Mongo':
        dao = new MongoDbProd(collectionName,schema)
        break;
    default: 'Memory'
        dao =new MemoryProd()
        break;
}

class ProdFactoryDaos{
    static getDao(){
        return dao
    }
}

module.exports=ProdFactoryDaos