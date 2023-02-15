const MemoryProd = require('../db/daos/memoryDaos/MemoryProd')
const apiProd = new MemoryProd()

const getProducts = async (req,res)=>{
    res.render('productos')
}

const getChargeProducts = async (req,res)=>{
    // let completeList=await apiProd.getAll()
    // res.render("form",{completeList})
    let completeList=JSON.stringify(apiProd.getAll())
    res.json(`La lista de producto es : ${completeList}`)
}

const postChargeProducts = async (req,res)=>{
    // await apiProd.save(req.body)
    // res.redirect('/productos/cargarProductos')
    apiProd.save(req.body)
    let productSaved = JSON.stringify(req.body)
    res.json(`Se agrego el producto : ${productSaved}`)
}

const putChargeProducts = async (req,res)=>{
    // let id = parseInt(req.params.id)
    // let newProd = req.body
    // apiProd.updateById(id,newProd)
    // res.redirect('/productos/cargarProductos')
    let id = parseInt(req.params.id)
    let newProd = req.body
    apiProd.updateById(id,newProd)
    let productUpdated = JSON.stringify(req.body)
    res.json(`Se actualizo correctamente.....la nueva informacion es: ${productUpdated}`)
}

const deleteChargeProducts = async (req,res)=>{
    // await apiProd.deleteById(req.params.id)
    // res.redirect('/productos/cargarProductos')
    let id = parseInt(req.params.id)
    let productDeleted =JSON.stringify(apiProd.deleteById(id))
    if (productDeleted){
        res.json(`Se elimino correctamente el producto con id : ${id}`)}
    else{
        res.status(404).send({ error: "Product not found" })
    }
}

module.exports={getProducts,
    getChargeProducts,
    postChargeProducts,
    putChargeProducts,
    deleteChargeProducts}