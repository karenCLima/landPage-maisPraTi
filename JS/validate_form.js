
const camposDoFormulario  = document.querySelectorAll('[required]');

camposDoFormulario.forEach((campo)=>{
    //console.log(campo)
    campo.addEventListener('blur', ()=> verificaCampo(campo));
    //campo.addEventListener('invalid', evento=> evento.preventDefault())
})

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError',
    'tooLong'
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        tooLong: "Preencha um nome válido, o nome não deve passar de 50 caracteres."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        patternMismatch: "Por favor, preencha um email válido."
    },
    assunto: {
        valueMissing: "O campo de assunto não pode estar vazio.",
        tooLong: "Preencha um assunto válido, o assunto não deve passar de 50 caracteres."
    },
    mensagem: {
        valueMissing: 'O campo de mensagem não pode estar vazio.',
        tooLong: "Preencha com uma mensagem válida, a mensagem não deve passar de 300 caracteres."
    },
    cpf: {
        valueMissing: 'O campo de cpf não pode estar vazio.',
        tooLong: "Preencha com um cpf válido, o cpf não deve passar de 11 caracteres.",
        tooShort: "Preencha com um cpf válido, o cpf não deve ser menor que 11 caracteres.",
        patternMismatch: "Por favor, preeenche o cpf no formato indicado: 123.456.789-10"
    },
    cidade:{
        valueMissing: "O campo cidade não pode estar vazio.",
        tooShort:"Prencha com um nome de cidade válida, o campo deve ter pelo menos 3 caracteres."
    },
    estado:{
        valueMissing: "O campo estado não pode estar vazio.",
        tooShort:"Prencha com um nome de estado válido, o campo deve ter pelo menos 3 caracteres."
    }
}

function verificaCampo(campo){
    let mensagem = "";
    campo.setCustomValidity('');

    if(campo.value.trim().length === 0){
        mensagem = "O campo não pode estar em branco!"
    
    }

    tiposDeErro.forEach(erro=>{
        if(campo.validity[erro]){
            mensagem = mensagens[campo.id][erro];
        }
    })

    const mensagemErro = campo.parentElement.querySelector(`.${campo.id}-erro`);
    const validadorDeInput = campo.checkValidity();

    if(!validadorDeInput || mensagem){
        mensagemErro.textContent = mensagem;
        mensagemErro.style.display = "block"
    }else {
        mensagemErro.textContent = "";
        mensagemErro.style.display = 'none'
    }
}