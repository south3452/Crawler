const express = require('express')
const requsicao = require('./app')
const app = express()
const port = 3000

app.use(express.static(__dirname + '/public/'))

 
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

app.post('/',(req,res) => {
    requsicao(req.headers.requi, req.headers.temp, 0)
    console.log(requsicao.saida)
})

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/views/index.html")
})


app.listen(port, () => {
    //requsicao(2, 60000)
    console.log(`Servidor aberto na porta http://localhost:${port}`)
})
  