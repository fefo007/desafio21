const axios = require('axios')

let url = "http://localhost:8080/productos/cargarProductos"


// CON ASYNC AWAIT
const getDataAsync = async (url)=>{
    try {
        const response = await axios.get(url)
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}
const postDataAsync = async (url,data)=>{
    try {
        const response = await axios.post(url,data)
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}

const putDataAsync = async (url,id,data)=>{
    try {
        const response = await axios.put(`${url}/${id}`,data)
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}

const deleteDataAsync = async (url,id)=>{
    try {
        const response = await axios.delete(`${url}/${id}`)
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}
// CON PROMESAS
const getData = (url)=>{
    axios(url)
    .then((res) => {
        console.log(res.data)
    }).catch((err) => {
        console.log(err)
    });
}
const postData = (url,data)=>{
axios({
    method: 'post',
    url: `${url}`,
    data: data
    })
    .then((res) => {
        console.log(res.data)
    }).catch((err) => {
        console.log(err)
    })
}
const putData = (url,id,data)=>{
axios({
    method: 'put',
    url: `${url}/${id}`,
    data: data
    })
    .then((res) => {
        console.log(res.data)
    }).catch((err) => {
        console.log(err)
    })
}
const deleteData = (url,id)=>{
axios({
    method: 'delete',
    url: `${url}/${id}`,
    })
    .then((res) => {
        console.log(res.data)
    }).catch((err) => {
        console.log(err)
    })
}

data = {
    nombre: 'Elden Ring',
    precio: 12000,
    url:'https://asasasasasasa'
    }

data2 = {
    nombre: 'Sonic',
    precio: 20000,
    url:'https://papapapapa'
    }

data3 = {
    nombre: 'HogwartsLegacy',
    precio: 15000,
    url:'https://jajajajajajaj'
    }

data4 = {
    nombre: 'Tekken 7',
    precio: 12500,
    url:'https://osososososos'
    }

getDataAsync(url)
postDataAsync(url,data2)
putDataAsync(url,2,data4)
deleteDataAsync(url,1)

// getData(url)
// postData(url,data4)
// putData(url,3,data3)
// deleteData(url,3)
