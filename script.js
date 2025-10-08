let currentInput = '0'; // O número que está sendo digitado ou o resultado atual
let previousInput = ''; // O primeiro operando (antes da operação)
let operation = null;    // A operação (+, -, *, /)
const display = document.getElementById('display-resultado');
const aviso = document.getElementById('aviso');

/**
 * Atualiza o display e gerencia o tamanho da fonte para números longos.
 */
function atualizarDisplay() {
    display.innerText = currentInput;
    aviso.innerText = ''; // Limpa o aviso
    
    // Diminui a fonte se o número for muito longo
    if (currentInput.length > 10) {
        display.style.fontSize = '2em';
    } else {
        display.style.fontSize = '2.5em';
    }
}

/**
 * Adiciona um número ou ponto decimal ao 'currentInput'.
 * @param {string} num - O número (0-9) ou '.'
 */
function adicionarNumero(num) {
    // Se o display for '0' e o novo caractere não for '.', substitui o '0'
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } 
    // Impede múltiplos pontos decimais
    else if (num === '.' && currentInput.includes('.')) {
        return; 
    } 
    // Limita o número de dígitos para evitar overflow
    else if (currentInput.length < 15) { 
        currentInput += num;
    }

    atualizarDisplay();
}

/**
 * Define a operação e salva o 'currentInput' como o primeiro operando.
 * @param {string} op - A operação (+, -, *, /, %)
 */
function selecionarOperacao(op) {
    if (currentInput === '' || currentInput === '.') return;
    
    // Se já houver uma operação, calcula o resultado intermediário
    if (previousInput !== '') {
        executarCalculo();
    }
    
    operation = op;
    previousInput = currentInput;
    currentInput = '0'; // Limpa o display para o próximo número
    atualizarDisplay();
}

/**
 * Executa o cálculo entre 'previousInput' e 'currentInput'.
 */
function executarCalculo() {
    let resultado;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current) || operation === null) return;

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
        case '%':
            resultado = (prev / 100) * current;
            break;
        default:
            return;
    }
    
    // Arredonda o resultado para evitar problemas de ponto flutuante, se necessário
    currentInput = parseFloat(resultado.toFixed(8)).toString();
    operation = null; // Reseta a operação
    previousInput = ''; // Reseta o operando anterior
    atualizarDisplay();
}

/**
 * Limpa o display.
 * @param {string} tipo - 'all' para limpar tudo (C), 'del' para apagar o último dígito (DEL).
 */
function limparTudo(tipo) {
    if (tipo === 'all') {
        currentInput = '0';
        previousInput = '';
        operation = null;
    } else if (tipo === 'del') {
        currentInput = currentInput.slice(0, -1); // Remove o último caractere
        if (currentInput === '' || currentInput === '-') {
            currentInput = '0';
        }
    }
    atualizarDisplay();
}

// Inicializa o display ao carregar a página
atualizarDisplay();
