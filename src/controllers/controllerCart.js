
const MemoryCart = require('../db/daos/memoryDaos/MemoryCart')
const apiCart = new MemoryCart()

const getCart = async (req,res)=>{
    await apiCart.createCart()
    res.render('carrito')
}

const deleteCart = async (req,res)=>{
    let id = parseInt(req.params.id)
    let cartDeleted = JSON.stringify(apiCart.deleteCart(id))
    if (cartDeleted){
        res.json(`Se elimino correctamente el carrito`)}
    else{
        res.status(404).send({ error: "Product not found" })
    }
}

const getCartProducts = async (req,res)=>{
    let selectedCart =JSON.stringify(apiCart.getById(req.params.id))
    if (selectedCart){
            res.json(`Su carrito contiene los siguientes productos : ${selectedCart}`)}
    else{
        res.status(404).send({ error: "Product not found" })
    }
}

const postCartProducts = async (req,res)=>{
    let {id,id_prod} = parseInt(req.params)
    apiCart.save(id,id_prod)
    let productSaved = JSON.stringify(id,id_prod)
    res.json(`Se agrego el producto : ${productSaved}`)
}

const deleteCartProducts = async (req,res)=>{
    let {id,id_prod} = parseInt(req.params)
    let productDeleted =JSON.stringify(apiCart.deleteById(id,id_prod))
    if (productDeleted){
        res.json(`Se elimino correctamente el producto ${productDeleted}`)}
    else{
        res.status(404).send({ error: "Product not found" })
    }
}

module.exports={getCart,
    deleteCart,
    getCartProducts,
    postCartProducts,
    deleteCartProducts}