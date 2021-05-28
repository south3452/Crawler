const express = require('express')
const requsicao = require('./app')
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const app = express()
const port = 3000

const chamada = new MyEmitter();

chamada.on('chamadinha',  (Reki, qntd) =>{
    /*requsicao(Reki,qntd).then(t => console.log(t))
    .catch(err => console.log(err))*/
    //Promise.all([requsicao(Reki,qntd)]).then(valores => console.log(valores))
})

app.use(express.static(__dirname + '/public/'))

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

app.post('/',(req,res) => {
    //chamada.emit('chamadinha', req.headers.requi, req.headers.temp)
    var requi = req.headers.requi

    for(var i = 0; i < requi ;i++){
        if (i == 0){
            requsicao(i)
        }else{
            setTimeout(() => {
                
            }, 30000); 
        }
    }
})

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/views/index.html")
})

app.listen(port, () => {
    //requsicao(2, 60000)
    console.log(`Servidor aberto na porta http://localhost:${port}`)
})
  