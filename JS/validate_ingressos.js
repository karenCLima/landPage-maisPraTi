document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript carregado corretamente.');

    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="ingresso"]');
    const totalValor = document.getElementById('total_valor');
    const form = document.querySelector('.form_inscricao');
    const checkboxErro = document.querySelector('.checkbox-erro');
    const sucessoMensagem = document.querySelector('.form_inscricao__sucesso');
    const cancelarBtn = document.getElementById('cancelar');
    const resetarBtn = document.getElementById('resetar');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateTotal);
    });

    form.addEventListener('submit', function(event) {
        if (!isAnyCheckboxChecked()) {
            event.preventDefault();
            checkboxErro.style.display = 'block';
        } else {
            event.preventDefault();
            checkboxErro.style.display = 'none';
            sucessoMensagem.style.display = 'block';
            resetarBtn.style.display = "block";
        }
    });

    cancelarBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    resetarBtn.addEventListener('click', function() {
        window.location.href = 'inscricao.html';
    });

    function updateTotal() {
        let total = 0;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                total += parseFloat(checkbox.value);
            }
        });
        totalValor.textContent = `Total: R$${total.toFixed(2)}`;
    }

    function isAnyCheckboxChecked() {
        return Array.from(checkboxes).some(checkbox => checkbox.checked);
    }
});
