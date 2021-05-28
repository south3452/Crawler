const puppeteer = require('puppeteer');
const fs = require('fs');
var now = require('./data');
const {execFile} = require('child_process');
const { resolve } = require('path');
const { rejects } = require('assert');

function executar(){
    execFile('./final.sh', (error, stdout, stderr) => {
    
        if(error){
            console.log(`error: ${error.message}`)
        }
    
        if(stderr){
            console.log(`stderr: ${stderr}`)
        }
    
    });
};

module.exports = async (L) => {/*=> new Promise((resolve, rejects) => {*/
    //Definir quantas requisições serão feitas
    
    //for(var i = 0; i < L ;i++){
        var data = new Date();
        
        var dia = ("Day:" + now + " " + data.getHours() + ':' + data.getMinutes())
        console.log(dia);
        
        //Abrindo o navegador
        const browser = await puppeteer.launch({ headless: false, timeout: 0 });
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://www.infomoney.com.br/cotacoes/dogecoin-doge/');
        //await page.screenshot({ path: 'instagram.png' });

        const percentage = await page.evaluate(async () => {
            const nodelist = document.querySelectorAll('.value p')

            console.log(nodelist)

            const imgarray = [...nodelist]
            
            const percentage = imgarray.map( p => ({ percentage: p.innerText }))

            return percentage
        });

        console.log(percentage)

        fs.appendFile('retorno.txt', JSON.stringify(dia,null, 2), err => {
            if(err){throw new Error('alguma coisa deu errado')}
    
            console.log('deu certo')
        })
    
        fs.appendFile('retorno.txt', JSON.stringify(percentage, null, 2), err => {
            if(err){throw new Error('alguma coisa deu errado')}
    
            console.log('deu certo')
        })
        
        //SETTIMEOUT()      MILISEGUNDOS//
        //                       |
        //                       V
        //var end = Date.now() + temp;
        
        if(L == (L - 1)){
            fs.appendFile('retorno.txt', "final", err => {
                if(err){throw new Error('alguma coisa deu errado')}
        
                console.log('deu certo')
            })
            executar();
            //break;
        }else{
            executar();            
                
            //while(Date.now() < end);

            //setTimeout((err) => console.log(err) ,temp)
        }
    }
//}//)
    
//}