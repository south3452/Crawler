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


while(true){
    var data = new Date();
    console.log(data.getMilliseconds())
    console.log(Date.now())
}