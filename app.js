const puppeteer = require('puppeteer');
const fs = require('fs');
var now = require('./data');
const {execFile} = require('child_process');

//Decedir quantas vezes por hora. Máximo 60X por hora(uma requisição por minuto), minimo 1X por hora (uma requisição por hora)
var L = 20;

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

(async () => {
    for(var i = 0; i < L ;i++){
    
    var data = new Date();
    
    var dia = ("Day:" + now + " " + data.getHours() + ':' + data.getMinutes())
    console.log(dia);
    
    const browser = await puppeteer.launch({ /*headless: false,*/ timeout: 0 });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://www.infomoney.com.br/cotacoes/dogecoin-doge/');
    //await page.screenshot({ path: 'instagram.png' });
    
    

    const percentage = await page.evaluate(() => {
        const nodelist = document.querySelectorAll('.value p')

        console.log(nodelist)

        const imgarray = [...nodelist]
        
        const percentage = imgarray.map( p => ({ 
            percentage: p.innerText
            //percetage: p.textContent.split(' ')
            //.filter((item)  => item != '')
            //.pop()
            //pegar a hora(para colocar que horas foi pegado o valor) e não sobre escrever mais o arquivo e sim adicionar mais uma linha
            //saber como posso estruturar melhor o json 
        }))

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
    
    //SETTIMEOUT()      MILISEGUNDOS//
    //                       |
    //                       V
    var end = Date.now() + 60000;
    
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
})();