var data = new Date();

/*const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);

setTimeoutPromise(4000).then((value) => {
    // value === 'foobar' (passing values is optional)
    // This is executed after about 4000 milliseconds.
    console.log('teste')
});*/

function dute() {
    var mes = data.getMonth()
    if(mes < 9){
        mes = '0' + (mes + 1)
    }else if(mes > 9 ){
        mes++
    }
    
    return mes
}

function hoje(){
    return data.getDate() + "/" + dute()
}

module.exports = hoje();