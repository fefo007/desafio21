const MemoryCart = require('../db/daos/memoryDaos/MemoryCart')
const apiCart = new MemoryCart()
const MemoryProd = require('../db/daos/memoryDaos/MemoryProd')
const apiProd = new MemoryProd()

async function createCart(){
    return apiCart.createCart()
}
async function deleteCartById({id}){
    return apiCart.deleteCart(id)
}
async function getProdsFromCart({id}){
    return apiCart.getById(id)
}
async function saveProdsToCart({id},{idProd}){
    return apiCart.save(id,idProd)
}
async function deleteProdsFromCart({id},{idProd}){
    return apiCart.deleteById(id,idProd)
}
async function getAllProds(){
    return apiProd.getAll()
}
async function getProdById({id}){
    return apiProd.getById(id)
}
async function createProd({data}){
    return apiProd.save(data)
}
async function updateProd({id},{data}){
    return apiProd.updateById(id,data)
}
async function deleteProd({id}){
    return apiProd.deleteById(id)
}

module.exports={
    createCart,
    deleteCartById,
    deleteProd,
    deleteProdsFromCart,
    getAllProds,
    getProdById,
    getProdsFromCart,
    saveProdsToCart,
    createProd,
    updateProd
}