const express = require('express')
const requsicao = require('./app')
const EventEmitter = require('events');
const { stdout } = require('process');
class MyEmitter extends EventEmitter {}
const app = express()
const port = 3000

const chamada = new MyEmitter();

chamada.on('chamadinha', (Reki, qntd) =>{
    requsicao(Reki, qntd)
})

app.use(express.static(__dirname + '/public/'))

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

app.post('/',async (req,res) => {
    //chamada.emit('chamadinha', req.headers.requi, req.headers.temp)
    await requsicao(req.headers.requi,req.headers.temp)
    res.sendStatus(200)
})

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/views/index.html")
})

app.listen(port, () => {
    //requsicao(2, 60000)
    console.log(`Servidor aberto na porta http://localhost:${port}`)
})
  