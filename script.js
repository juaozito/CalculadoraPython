// A função principal que é chamada pelos botões no HTML
function calcular(operacao) {
    // 1. Pega os valores dos campos de entrada (substitui o input() do Python)
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    
    // Pega os elementos onde o resultado e o aviso serão exibidos
    const resultadoElement = document.getElementById('resultado');
    const avisoElement = document.getElementById('aviso');
    
    let resultado = 0;
    let mensagemAviso = '';

    // Verifica se a entrada é válida (caso o usuário não digite nada)
    if (isNaN(num1) || isNaN(num2)) {
        resultadoElement.textContent = "ERRO";
        avisoElement.textContent = "Por favor, insira números válidos.";
        return;
    }

    // 2. A lógica da calculadora (substitui seus blocos if/elif)
    switch (operacao) {
        case '+':
            resultado = num1 + num2;
            break;
        case '-':
            resultado = num1 - num2;
            break;
        case '*':
            resultado = num1 * num2;
            break;
        case '/':
            // Trata a divisão por zero, assim como no seu código Python
            if (num2 === 0) {
                resultadoElement.textContent = "ERRO";
                mensagemAviso = "Erro: divisão por zero!";
                avisoElement.textContent = mensagemAviso;
                return;
            }
            resultado = num1 / num2;
            break;
        default:
            // Caso uma operação inválida seja tentada
            mensagemAviso = "Operação inválida!";
            resultadoElement.textContent = "ERRO";
    }

    // 3. Exibe o resultado e limpa a mensagem de aviso (se houver)
    resultadoElement.textContent = resultado.toLocaleString('pt-BR');
    avisoElement.textContent = mensagemAviso;
}
