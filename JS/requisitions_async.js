function requisitar(url) {
    
    document.getElementById('inscricao').innerHTML = ''

    
    if (!document.getElementById('loading')) {
        
        const imgLoading = document.createElement('img')
        imgLoading.id = 'loading'
        imgLoading.src = './imagens/loading.gif' 
        imgLoading.className = 'rounded mx-auto d-block'
        document.getElementById('inscricao').appendChild(imgLoading)
    }

    
    let ajax = new XMLHttpRequest()

   
    ajax.open('GET', url)

    
    console.log(ajax.readyState)

    
    ajax.onreadystatechange = () => {
        
        if (ajax.readyState == 4 && ajax.status == 200) {
            
            document.getElementById('inscricao').innerHTML = ajax.responseText
        }

        
        if (ajax.readyState == 4 && ajax.status == 404) {
            
            document.getElementById('inscricao').innerHTML = 'Requisição finalizada, porém o recurso não foi encontrado. Erro 404.'
        }
    }

    
    setTimeout(() => {
        ajax.send()
    }, 2000)
}   