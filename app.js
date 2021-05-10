const puppeteer = require('puppeteer');
const fs = require('fs');
var now = require('./data');
const {execFile} = require('child_process');
var saida 

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

module.exports = async (L,temp,teste) => {
    //Definir quantas requisições serão feitas
    L = 2;
    
    for(var i = 0; i < L ;i++){
        if(teste == 0){
            saida = true 
            return saida 
            break
        }
        var data = new Date();
        
        var dia = ("Day:" + now + " " + data.getHours() + ':' + data.getMinutes())
        console.log(dia);
        
        //Abrindo o navegador
        const browser = await puppeteer.launch({ /*headless: false,*/ timeout: 0 });
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);
        await page.goto('https://www.infomoney.com.br/cotacoes/dogecoin-doge/');
        //await page.screenshot({ path: 'instagram.png' });
        
        

        const percentage = await page.evaluate(() => {
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

        await browser.close();
        
        //Definir o intervalo de tempo das requisições em MS 
        //SETTIMEOUT()      MILISEGUNDOS//
        //                       |
        //                       V
        var end = Date.now() + temp;
        
        if(i == (L - 1)){
            fs.appendFile('retorno.txt', "final", err => {
                if(err){throw new Error('alguma coisa deu errado')}
        
                console.log('deu certo')
            })
            
            break;
        }else{
            executar();

            while(Date.now() < end);
        }
}
    executar();
};