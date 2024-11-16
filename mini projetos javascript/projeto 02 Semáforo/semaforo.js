const img = document.getElementById('img')
const buttons = document.getElementById('buttons')
let colorIndex = 0
let intervalId = null

const trafficLight = (event) => {
    stopAutomatic(); // Coloco antes porque paro o evento anterior para depois iniciar o próximo
    turnOn[event.target.id]()
}

const nextIndex = () => {

    // Usando ternário mas não da para ser colorIndex++ porque primeiro ele atribui depois adiciona +1
    colorIndex = colorIndex < 2 ? ++colorIndex : 0;

    // if (colorIndex < 2) {
    //     colorIndex++
    // } else {
    //     colorIndex = 0
    // }
    
}

const changeColor = () => {
    const colors = ['red', 'yellow', 'green']
    const color = colors[colorIndex];
    turnOn[color]()
    nextIndex();
}

const stopAutomatic = () => {
    clearInterval(intervalId)
}

const turnOn = {
    'red': () => img.src = './img/vermelho.png',
    'yellow': () => img.src = './img/amarelo.png',
    'green': () => img.src = './img/verde.png',
    'automatic': () => intervalId = setInterval(changeColor, 1000)
}

buttons.addEventListener('click', trafficLight) // Quando você escreve trafficLight(), está executando a função imediatamente ao invés de passar a referência da função para o evento. Você precisa passar a referência da função, sem os parênteses, para que ela seja executada apenas quando o evento de clique ocorrer
// trafficLight(): Com os parênteses, você está executando a função imediatamente ao carregar a página, por isso o "undefined" no console.
// trafficLight: Sem os parênteses, você passa a referência da função para o addEventListener, o que significa que a função será chamada quando o evento de clique ocorrer.