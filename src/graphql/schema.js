const {buildSchema}= require('graphql')
const {newProduc} = require('./inputs/newProduc')
const {updateProduc} = require('./inputs/updateProduc')
const {createCart} = require('./mutations/createCart')
const {createCartProd} = require('./mutations/createCartProd')
const {deleteCartById} = require('./mutations/deleteCartById')
const {deleteProducById} = require('./mutations/deleteProducById')
const {deleteProducInCart} = require('./mutations/deleteProducInCart')
const {saveProducInCart} = require('./mutations/saveProducInCart')
const {updateProducById} = require('./mutations/updateProducById')
const {getProducInCart} = require('./queries/getProducInCart')
const {getProductById} = require('./queries/getProductById')
const {getProducts} = require('./queries/getProducts')
const {carts} = require('./types/carts')
const {product} = require('./types/product')


const schema = buildSchema(`
${product}    
${newProduc}
${carts}
${updateProduc}

type query{
${getProducInCart}
${getProductById}
${getProducts}
}

type Mutation{
${createCart}
${createCartProd}
${deleteCartById}
${deleteProducById}
${deleteProducInCart}
${saveProducInCart}
${updateProducById}
}`)

module.exports=schema