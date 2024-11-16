'use strict'; // Ativa o modo estrito, que ajuda a detectar erros e evitar práticas problemáticas.

// Seleciona o display e os botões de números e operadores na calculadora
const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]'); // Seleciona todos os elementos com "tecla" no id (botões numéricos)
const operadores = document.querySelectorAll('[id*=operador]'); // Seleciona todos os elementos com "operador" no id (botões de operação)

let novoNumero = true; // Indica se o próximo número será um novo (usado para limpeza de display)
let operador; // Armazena o operador atual
let numeroAnterior; // Armazena o número anterior para cálculo

// Verifica se há uma operação pendente, ou seja, se um operador foi definido
const operacaoPendente = () => operador !== undefined;

// Realiza o cálculo entre os números anterior e atual usando o operador selecionado
const calcular = () => {
    if (operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace('.','').replace(',', '.')); // Converte o valor do display em número (aceita vírgulas para decimais)
        novoNumero = true; // Define que o próximo número será novo (apaga o display na próxima entrada)
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`); // Calcula o resultado usando eval (combina númeroAnterior e operador com o númeroAtual)
        atualizarDisplay(resultado); // Atualiza o display com o resultado
    }
};

// Atualiza o conteúdo do display da calculadora com o valor fornecido
const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR'); // Se é um novo número, substitui o valor do display
        novoNumero = false; // Define que a próxima entrada não é um novo número (para concatenar valores)
    } else {
        display.textContent += texto.toLocaleString('BR'); // Caso contrário, concatena o texto ao display
    }
    document.querySelector('#igual').focus(); // Foca o botão de igual, para ativá-lo com Enter
};

// Insere o número no display quando um botão numérico é clicado
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent); 
numeros.forEach((numero) => numero.addEventListener('click', inserirNumero)); // Adiciona o evento de clique para cada botão numérico

// Seleciona o operador e armazena o número atual para cálculo
const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular(); // Calcula o resultado da operação anterior (se houver)
        novoNumero = true;
        operador = evento.target.textContent; // Armazena o operador clicado
        numeroAnterior = parseFloat(display.textContent.replace('.','').replace(',', '.')); // Armazena o valor do display como o número anterior
    }
};
operadores.forEach((operador) =>
    operador.addEventListener('click', selecionarOperador)
); // Adiciona o evento de clique para cada operador

// Função ativada ao clicar em "igual" para calcular o resultado e limpar o operador pendente
const ativarIgual = () => {
    calcular(); // Realiza o cálculo
    operador = undefined; // Limpa o operador pendente
};
document.getElementById('igual').addEventListener('click', ativarIgual); // Associa a função ao botão "igual"

// Limpa o conteúdo do display
const limparDisplay = () => (display.textContent = '');
document
    .getElementById('limparDisplay')
    .addEventListener('click', limparDisplay); // Adiciona evento de clique ao botão de limpar o display

// Limpa todo o cálculo e redefine variáveis
const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
};
document
    .getElementById('limparCalculo')
    .addEventListener('click', limparCalculo); // Adiciona evento de clique ao botão de limpar o cálculo

// Remove o último dígito do número no display
const removerUltimoNumero = () =>
    (display.textContent = display.textContent.slice(0, -1));
document
    .getElementById('backspace')
    .addEventListener('click', removerUltimoNumero); // Adiciona evento de clique ao botão "backspace"

// Inverte o sinal do número atual no display
const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1); // Multiplica o valor do display por -1 para inverter o sinal
};
document.getElementById('inverter').addEventListener('click', inverterSinal); // Adiciona evento de clique ao botão de inverter sinal

// Verifica se o display já contém um decimal
const existeDecimal = () => display.textContent.indexOf(',') !== -1;
// Verifica se há algum valor no display
const existeValor = () => display.textContent.length > 0;
// Insere um decimal no display
const inserirDecimal = () => {
    if (!existeDecimal()) { // Se não houver decimal no display
        if (novoNumero) {
            atualizarDisplay('0,'); // Insere "0," no display caso não haja número
        } else {
            atualizarDisplay(','); // Caso contrário, apenas adiciona a vírgula
        }
    }
};
document.getElementById('decimal').addEventListener('click', inserirDecimal); // Associa o botão de decimal

// Mapeia teclas do teclado para os botões da calculadora
const mapaTeclado = {
    0: 'tecla0',
    1: 'tecla1',
    2: 'tecla2',
    3: 'tecla3',
    4: 'tecla4',
    5: 'tecla5',
    6: 'tecla6',
    7: 'tecla7',
    8: 'tecla8',
    9: 'tecla9',
    '/': 'operadorDividir',
    '*': 'operadorMultiplicar',
    '-': 'operadorSubtrair',
    '+': 'operadorAdicionar',
    '=': 'igual',
    Enter: 'igual',
    Backspace: 'backspace',
    c: 'limparDisplay',
    Escape: 'limparCalculo',
    ',': 'decimal',
};

// Associa as teclas do teclado aos botões da calculadora
const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
};
document.addEventListener('keydown', mapearTeclado); // Adiciona o evento de tecla pressionada para acionar a função mapearTeclado
