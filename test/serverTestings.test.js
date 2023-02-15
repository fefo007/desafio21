const request = require('supertest')('http://localhost:8080')
const expect = require('chai').expect

const prod = {
    nombre:'farcry5',
    precio:15000,
    url:'https://sasasasasasas'
}


describe('comprobando funcionamiento de la ruta propductos',function (){
    it('deberia guardar un producto',async function (){

        await request.post('/productos/cargarProductos').send(prod)
        const product =request.body
        expect(product).to.include.keys('nombre','precio','url')
        expect(product.nombre).to.eql(prod.nombre)
        expect(product.precio).to.eql(prod.precio)
        expect(product.url).to.eql(prod.url)
    })
    it('deberia mostrar el producto cargado en la anterior prueba',async function(){
        const response = await request.get('/productos/cargarProductos') 
        expect(response.body).to.eql(prod)
    })
    it('deberia modificar el producto pasado por id,con la data elegida',async function (){
        let id = 1
        const data = {
            nombre:'the Last of Us',
            precio:12000,
            url:'https://papapappapa'
        }
        await request.put(`/productos/cargarProductos/${id}`).send(data)
        const product = request.body
        expect(product).to.include.keys('nombre','precio','url')
        expect(product.nombre).to.eql(data.nombre)
        expect(product.precio).to.eql(data.precio)
        expect(product.url).to.eql(data.url)
    })
    it('deberia eliminar el producto previamente cargado y luego modificado',async function(){
        let id = 1
        await request.delete(`/productos/cargarProductos/${id}`)
        const product = request.body
        expect(product).to.eql([])
    })
})