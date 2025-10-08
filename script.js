let currentInput = '0';
let previousInput = '';
let operation = null;
const display = document.getElementById('display-resultado');
const aviso = document.getElementById('aviso');

function atualizarDisplay() {
    display.innerText = currentInput;
    aviso.innerText = ''; // Limpa o aviso ao atualizar
    
    // Opcional: Limita o tamanho do texto para não estourar o display
    if (currentInput.length > 10) {
        display.style.fontSize = '2em';
    } else {
        display.style.fontSize = '2.5em';
    }
}

function adicionarNumero(num) {
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else if (num === '.' && currentInput.includes('.')) {
        return; // Impede múltiplos pontos
    } else {
        currentInput += num;
    }
    atualizarDisplay();
}

function selecionarOperacao(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        executarCalculo();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
    atualizarDisplay();
}

function executarCalculo() {
    let resultado;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            resultado = prev + current;
            break;
        case '-':
            resultado = prev - current;
            break;
        case '*':
            resultado = prev * current;
            break;
        case '/':
            if (current === 0) {
                aviso.innerText = "Erro: Divisão por zero!";
                currentInput = '0';
                operation = null;
                previousInput = '';
                atualizarDisplay();
                return;
            }
            resultado = prev / current;
            break;
        default:
            return;
    }
    currentInput = resultado.toString();
    operation = null;
    previousInput = '';
    atualizarDisplay();
}

function limparTudo(tipo) {
    if (tipo === 'all') {
        currentInput = '0';
        previousInput = '';
        operation = null;
    } else if (tipo === 'del') {
        currentInput = currentInput.slice(0, -1);
        if (currentInput === '') currentInput = '0';
    }
    atualizarDisplay();
}

atualizarDisplay(); // Inicializa o display ao carregar
