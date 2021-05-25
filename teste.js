
/*const {execFile} = require('child_process');

execFile('./final.sh', (error, stdout, stderr) => {
    
    if(error){
        console.log(`error: ${error.message}`)
    }

    if(stderr){
        console.log(`stderr: ${stderr}`)
    }

    console.log(`stdout: ${stdout}`)

})*/





/*const {spawn}= require('child_process');

const child = spawn('./final.sh')

child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
});

child.stderr.on('data', (data) => {
    console.log(`stdout: ${data}`)
})

child.on('error', (error) => {
    console.log(`error: ${error}`)
})

child.on('exit', (code, signal) => {
    if(code) console.log(`process exit ith code: ${code}`)
    if(signal) console.log(`process killed with signal: ${signal}`)
    console.log('done')
})*/



module.exports = function(){
    for(var i = 0; i < 2; i++){
        var end = Date.now() + 30000;

        while(Date.now() < end);
    
        console.log('Saiu ' + i)
    }
}