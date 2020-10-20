const network = new brain.NeuralNetwork(
  //   {
  //   hiddenLayers: [4, 5, 6] // default is 3
  // }
)

// network.train([{
//     input: [0, 0],
//     output: [0]
//   },
//   {
//     input: [1, 0],
//     output: [1]
//   }, {
//     input: [0, 1],
//     output: [1]
//   }, {
//     input: [1, 1],
//     output: [0]
//   }

// ])
// const diagram = document.getElementById('diagram');
// diagram.innerHTML = brain.utilities.toSVG(network);

// return false;

const trainingData = [{
  "input": {
    "r": 0,
    "g": 0,
    "b": 0 // black backgourd color
  },
  "output": [1] // text is white
}, {
  "input": {
    "r": 1,
    "g": 1,
    "b": 1 // white backgourd color
  },
  "output": [0] // text is black
}, {
  "input": {
    "r": 0.944808294257035,
    "g": 0.6674782369918966,
    "b": 0.5766399840934922
  },
  "output": [0]
}, {
  "input": {
    "r": 0.5639948440377565,
    "g": 0.7176485901155334,
    "b": 0.09089889404108642
  },
  "output": [1]
}, {
  "input": {
    "r": 0.1735805927844496,
    "g": 0.055394078147760206,
    "b": 0.5718893632998685
  },
  "output": [1]
}, {
  "input": {
    "r": 0.9981576669053267,
    "g": 0.5599753720355853,
    "b": 0.14004222444100312
  },
  "output": [0]
}, {
  "input": {
    "r": 0.19516320408209298,
    "g": 0.19675137123292608,
    "b": 0.6611291964504313
  },
  "output": [1]
}, {
  "input": {
    "r": 0.6164834530502397,
    "g": 0.8040215937551165,
    "b": 0.8850111600872357
  },
  "output": [0]
}, {
  "input": {
    "r": 0.3041418057844665,
    "g": 0.44672594827873735,
    "b": 0.2457621104163552
  },
  "output": [1]
}, {
  "input": {
    "r": 0.23520758286480792,
    "g": 0.9557008141546155,
    "b": 0.11014352211423728
  },
  "output": [0]
}]

network.train(trainingData)

const colorEl = document.getElementById('color')
const guessEl = document.getElementById('guess')
const whiteButton = document.getElementById('white-button')
const blackButton = document.getElementById('black-button')
const skipToNextColorBtn = document.getElementById('skip-to-next-button')

const printButton = document.getElementById('print-button')

// set random color when page loads
setRandomColor()
// setRandomColor() will assign an obj to color variable
// color = {
//   r: Math.random(),
//   g: Math.random(),
//   b: Math.random()
// }

whiteButton.addEventListener('click', () => {
  chooseColor(1)
})

blackButton.addEventListener('click', () => {
  chooseColor(0)
})

skipToNextColorBtn.addEventListener('click', () => {
  setRandomColor()
})

printButton.addEventListener('click', print)

function chooseColor(value) {
  trainingData.push({
    input: color,
    output: [value]
  })
  setRandomColor()
}

function print() {
  console.log(JSON.stringify(trainingData))
}

function setRandomColor() {
  color = {
    r: Math.random(),
    g: Math.random(),
    b: Math.random()
  }

  // get the guess result from network according to current input data
  const guess = network.run(color)[0] // get the calculation (percentage data from netword.run)
  guessEl.style.color = guess > .5 ? '#FFF' : '#000'

  let guestWhite = `
  <p>透過ML猜顏色: 依據現在的背景色，對比最強烈的顏色是白色 ?</p>
  <p>Machine Learning Script:</p> 
  <p>I guess the the contrary to the backgroud is: WHITE ?</p> 
`
  let guestBlack = `
  <p>透過ML猜顏色: 依據現在的背景色，對比最強烈的顏色是黑色 ?</p>  
  <p>Machine Learning Script:</p> 
  <p>I guess the the contrary to the backgroud is: BLACK ?</p>  
  `

  guessEl.innerHTML = `${guess>.5 ? guestWhite :guestBlack}`

  colorEl.style.backgroundColor =
    `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255})`
}