class MemoryProd{
    constructor(){
        this.products=[];
    }
    async getAll(){
        return this.products
    }
    async getById(idProduct){
        let resultProduct=await this.products.find(product=>product.id===Number(idProduct))
            console.log(resultProduct)
            return resultProduct
        }
    async save(product){
        let idProduc=this.products.length > 0 ? this.products.length+1 : 1
        product.id=idProduc
        this.products.push(product)
    }
    async deleteById(idProduct) {
        const arrayFiltrado =this.products.filter(products => products.id !== idProduct);
        return this.products=arrayFiltrado
    }
    async updateById(idProduc,newProduct){
        newProduct.id=idProduc
        this.products.splice(idProduc - 1, 1, newProduct)
            return this.getById(idProduc)
}
}

module.exports=MemoryProd