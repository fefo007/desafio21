const express = require('express')
const {engine} = require('express-handlebars')
const logger = require('./utils/loggers/loggers')
const path = require('path')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./graphql/schema')
const {createCart,
    deleteCartById,
    deleteProd,
    deleteProdsFromCart,
    getAllProds,
    getProdById,
    getProdsFromCart,
    saveProdsToCart,
    createProd,
    updateProd} = require('./graphql/rootValues')
// USADO YARGS EN EL PUERTO
// const yargs = require('yargs/yargs')(process.argv.slice(2))
// USANDO MINIMIST EN EL PUERTO
const parseArgs = require('minimist')

const app = express()

app.use(express.static('public'))
app.use('/public',express.static(`${__dirname}/public`))
app.use('/graphql',graphqlHTTP({schema,rootValue:{
    getAllCarts,
    createCart,
    deleteCartById,
    getProdsFromCart,
    saveProdsToCart,
    deleteProdsFromCart,
    getAllProds,
    getProdById,
    createProd,
    updateProd,
    deleteProd
},
graphiql:true,
}))


app.engine("handlebars",engine())
app.set("view engine","handlebars")
app.set("views",path.join(__dirname,'views'))


app.all('*',(req,res)=>{
        logger.warn('ruta inexistente')
        res.status(400).json({error:'ruta inexistente'})
})

const options ={
    alias: {
        'p':'PORT'
    },
    default: {
        'PORT': 8080
    }
}
const {PORT} = parseArgs(process.argv.slice(2), options)

const server = app.listen(PORT, () => { 
    logger.info(`Servidor Http con Websockets escuchando en el puerto ${server.address().port}`);
})
server.on('error', error => logger.error(`Error en servidor ${error}`))

// CLUSTER POR MODULO DE NODE
// const cluster = require('cluster')
// const os = require('os')

// const clusterMode = process.argv[3] == "CLUSTER"

// if(clusterMode && cluster.isMaster){
//     const cpus = os.cpus().length

//     for(let i=0; i<cpus;i++){
//         cluster.fork()
//     }
//     cluster.on('exit',worker=>{
//         console.log('worker',worker.process.pid,'died')
//         cluster.fork()
//     })
// }else{
//     const app=express()
//     const options ={
//         alias: {
//             'p':'PORT'
//         },
//         default: {
//             'PORT': 8080
//         }
//     }
// const {PORT} = parseArgs(process.argv.slice(2), options)

// const server = app.listen(PORT, () => { 
//     console.log(`Servidor Http con Websockets escuchando en el puerto ${server.address().port}`);
// })
// server.on('error', error => console.log(`Error en servidor ${error}`))

// USADO YARGS EN EL PUERTO
// const args = yargs.default({port: 8080}).alias({port: 'p'}).argv
// const PORT = args.port
// USANDO MINIMIST EN EL PUERTO
