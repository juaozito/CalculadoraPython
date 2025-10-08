let numeroAtual = '0';
let primeiroNumero = null;
let operador = null;
let esperandoNovoNumero = false;

const display = document.getElementById('display-resultado');
const aviso = document.getElementById('aviso');

// --- Funções de Lógica ---

function atualizarDisplay() {
    display.textContent = numeroAtual;
    aviso.textContent = '';
}

function adicionarNumero(digito) {
    aviso.textContent = '';
    
    if (esperandoNovoNumero === true) {
        numeroAtual = digito;
        esperandoNovoNumero = false;
    } else {
        // Impede múltiplos pontos decimais e substitui o '0' inicial
        if (digito === '.') {
            if (numeroAtual.includes('.')) return;
        }
        
        if (numeroAtual === '0' && digito !== '.') {
            numeroAtual = digito;
        } else {
            numeroAtual += digito;
        }
    }
    atualizarDisplay();
}

function selecionarOperacao(proximoOperador) {
    const valorDeEntrada = parseFloat(numeroAtual);

    if (primeiroNumero === null) {
        primeiroNumero = valorDeEntrada;
    } else if (operador) {
        // Executa o cálculo da operação anterior (se houver)
        const resultado = executarCalculoInterno(primeiroNumero, valorDeEntrada, operador);
        primeiroNumero = resultado;
        numeroAtual = String(resultado);
    }
    
    esperandoNovoNumero = true;
    operador = proximoOperador;
    atualizarDisplay(); // Atualiza o display com o resultado intermediário ou o primeiro número
}

function executarCalculo() {
    const valorDeEntrada = parseFloat(numeroAtual);
    
    if (operador === null) {
        return; // Nada para calcular
    }

    const resultado = executarCalculoInterno(primeiroNumero, valorDeEntrada, operador);

    // Reseta o estado para começar um novo cálculo
    numeroAtual = String(resultado);
    primeiroNumero = null;
    operador = null;
    esperandoNovoNumero = false;
    atualizarDisplay();
}

// Lógica principal de cálculo (seu if/elif de Python traduzido)
function executarCalculoInterno(num1, num2, op) {
    switch (op) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 === 0) {
                aviso.textContent = "Erro: Divisão por zero!";
                return 0; 
            }
            return num1 / num2;
        default:
            return num2;
    }
}

function limparTudo(tipo) {
    if (tipo === 'all') {
        numeroAtual = '0';
        primeiroNumero = null;
        operador = null;
        esperandoNovoNumero = false;
        aviso.textContent = 'Memória Limpa';
    } else if (tipo === 'del') {
        numeroAtual = numeroAtual.slice(0, -1) || '0';
    }
    atualizarDisplay();
}

// Inicializa o display
atualizarDisplay();
