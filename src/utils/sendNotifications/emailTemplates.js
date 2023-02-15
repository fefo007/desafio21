
const newUserEmail = (data)=>{
    return `
    <h2>Nuevo usuario registrado</h2>
    <p>se acaba de seguistrar un nuevo usuario en la API con los siguientes datos</p>
    <ul>
        <li><strong>email:</strong> ${data.email}
        <li><strong>password:</strong> ${data.password}
        <li><strong>nombre:</strong> ${data.username}
        <li><strong>direccion:</strong> ${data.direcction}
        <li><strong>edad:</strong> ${data.age}
        <li><strong>imagen:</strong> ${data.cel}
        <li><strong>imagen:</strong> ${data.image}
    `
    
} 

const newUserBuy = (data)=>{
    return `
    <h2>Nueva compra realizada</h2>
    <p>pedido realizado por ${data.username},email:${data.email}</p>
    <p>productos seleccionados:${data.prods}</p>`
}

module.exports={newUserEmail,newUserBuy}