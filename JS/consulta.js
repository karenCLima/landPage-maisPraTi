function consultarInscricao() {
    const cpf = document.getElementById('consultaCpf').value;
    const inscricao = JSON.parse(localStorage.getItem(cpf));
    const tabela = document.getElementById('resultadoConsulta').getElementsByTagName('tbody')[0];
    tabela.innerHTML = ''; 

    if (inscricao) {
        const novaLinha = tabela.insertRow();

        novaLinha.insertCell(0).innerText = inscricao.nome;
        novaLinha.insertCell(1).innerText = inscricao.cpf;
        novaLinha.insertCell(2).innerText = inscricao.email;
        novaLinha.insertCell(3).innerText = inscricao.cidade;
        novaLinha.insertCell(4).innerText = inscricao.estado;
        novaLinha.insertCell(5).innerText = inscricao.ingressos.map(ingresso => `${ingresso.label}: R$${ingresso.value}`).join(', ');
        novaLinha.insertCell(6).innerText = "Aguardando pagamento"

        const acoesCelula = novaLinha.insertCell(7);
        const editarBtn = document.createElement('button');
        editarBtn.innerText = 'Editar';
        editarBtn.className = 'edit_delete_button'
        editarBtn.onclick = () => editarNaTabela(novaLinha,cpf);

        const deletarBtn = document.createElement('button');
        deletarBtn.innerText = 'Deletar';
        deletarBtn.className = 'edit_delete_button'
        deletarBtn.onclick = () => deletarInscricao(cpf);

        acoesCelula.appendChild(editarBtn);
        acoesCelula.appendChild(deletarBtn);

        document.getElementById('resultado').classList.remove('hidden');
    } else {
        alert('Inscrição não encontrada');
        document.getElementById('resultado').classList.add('hidden');
    }
}

function editarNaTabela(linha, cpf) {
    const celulas = linha.cells;
    for (let i = 0; i < celulas.length - 1; i++) {
        celulas[i].setAttribute('contenteditable', 'true');
    }

    const salvarBtn = document.createElement('button');
    salvarBtn.innerText = 'Salvar';
    salvarBtn.className = 'edit_delete_button';
    salvarBtn.onclick = () => salvarEdicao(linha, cpf);

    const acoesCelula = celulas[7];
    acoesCelula.innerHTML = '';
    acoesCelula.appendChild(salvarBtn);
}

function salvarEdicao(linha, cpf) {
    const celulas = linha.cells;

    const nome = celulas[0].innerText;
    const email = celulas[2].innerText;
    const cidade = celulas[3].innerText;
    const estado = celulas[4].innerText;
    const ingressos = celulas[5].innerText.split(',').map(ingresso => {
        const [label, value] = ingresso.split(':').map(str => str.trim());
        return { label, value: value.replace('R$', '') };
    });
    const status = celulas[6].innerText;

    const novaInscricao = { nome, cpf, email, cidade, estado, ingressos, status };
    localStorage.setItem(cpf, JSON.stringify(novaInscricao));

    for (let i = 0; i < celulas.length - 1; i++) {
        celulas[i].setAttribute('contenteditable', 'false');
    }

    const acoesCelula = celulas[7];
    acoesCelula.innerHTML = '';

    const editarBtn = document.createElement('button');
    editarBtn.innerText = 'Editar';
    editarBtn.className = 'edit_delete_button'
    editarBtn.onclick = () => editarNaTabela(linha, cpf);

    const deletarBtn = document.createElement('button');
    deletarBtn.innerText = 'Deletar';
    deletarBtn.className = 'edit_delete_button'
    deletarBtn.onclick = () => deletarInscricao(cpf);

    acoesCelula.appendChild(editarBtn);
    acoesCelula.appendChild(deletarBtn);
}

function deletarInscricao(cpf) {
    if (confirm('Tem certeza que deseja deletar esta inscrição?')) {
        localStorage.removeItem(cpf);
        consultarInscricao();
    }
}