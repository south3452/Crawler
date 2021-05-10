var requi = document.getElementById('soli')
var temp = document.getElementById('tempo')

document.getElementById('formulario').addEventListener('submit', (e) =>{
    e.preventDefault()
    
    const formData = {
        requi: requi.value,
        temp: temp.value
    }
    
    let options= {
        method: 'post',
        headers: formData
    }
    
    fetch('/', options).then(response => response.json()).then(text => {
        console.log(text)
    }).catch()
})