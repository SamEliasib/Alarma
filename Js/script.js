// Elements on display
const horas = document.querySelector('#horas')
const minutos = document.querySelector('#minutos')
const segundos = document.querySelector('#segundos')

const inputs = document.querySelector('.inputs')
const inputHora = document.querySelector('#horasInput')
const inputMin = document.querySelector('#minutosInput')
const inputSeg = document.querySelector('#segundosInput')

const empezar = document.querySelector('#empezar')
const cancelar = document.querySelector('#cancelar')

const info = document.querySelector('#info')
const title = document.querySelector('title')
const cabezera = document.querySelector('#cabezera')

// Definition of the interval and the timeout, to allow capture the process and kill it later.
let myInterval
let myTimeOut

// Reiniciar Definition
const reiniciar = document.createElement('span')
reiniciar.classList.add('botones')
reiniciar.id = 'cancelar'
reiniciar.innerText = 'reiniciar'

// Error handler.
const messageAlert = message => {
  info.textContent = `⚠️ ${message}`

  info.classList.add('error')

  clearTimeout(myTimeOut)

  myTimeOut = setTimeout(() => {
    info.textContent = ''
    info.classList.remove('error')
  }, 5000)
}

// Init the program.
const init = () => {
  // Consult if interval exists an kill it
  if (myInterval) { clearInterval(myInterval) }

  // Evaluate if the inputs are valid (exist a least one, and the minuts and seconds are in the range).
  if (!inputHora.value && !inputMin.value && !inputSeg.value) {
    messageAlert('Error: debe ingresar al menos un campo')
    return
  }

  if (inputMin.value && (parseInt(inputMin.value) > 59 || parseInt(inputMin.value) < 0)) {
    messageAlert('Error: La entrada no corresponde al formato 99:59:59')
    return
  }

  if (inputSeg.value && (parseInt(inputSeg.value) > 59 || parseInt(inputSeg.values) < 0)) {
    messageAlert('Error: La entrada no corresponde al formato 99:59:59')
    return
  }

  if (inputHora.value.length > 2 || inputMin.value.length > 2 || inputSeg.value.length > 2) {
    messageAlert('Error: La entrada no corresponde al formato 99:59:59')
    return
  }

  // If the given input it's empty it's replaced as a 00 by default.
  horas.textContent = formater(inputHora.value) || '00'
  minutos.textContent = formater(inputMin.value) || '00'
  segundos.textContent = formater(inputSeg.value) || '00'

  title.textContent = `${horas.textContent}:${minutos.textContent}:${segundos.textContent}`

  // Resets the inputs given.
  inputHora.value = ''
  inputMin.value = ''
  inputSeg.value = ''

  start()
}

/**
 * Inits the interval and manage the changes in the clock.
 */
const start = () => {
  // Interval than controls the logic of clock.
  myInterval = setInterval(() => {
    if (parseInt(segundos.textContent) === 0 && parseInt(minutos.textContent) === 0 && parseInt(horas.textContent) === 0) {
      document.querySelector('body').style.backgroundColor = '#e74c3c'

      empezar.style.visibility = 'hidden'
      cancelar.style.visibility = 'hidden'

      inputs.appendChild(reiniciar)

      title.textContent = 'Terminado!'
      cabezera.textContent = 'Terminado!'

      clearInterval(myInterval)
    } else if (parseInt(horas.textContent) >= 1 && parseInt(minutos.textContent) === 0) {
      horas.textContent = formater(horas.textContent - 1)
      minutos.textContent = '59'
      title.textContent = `${horas.textContent}:${minutos.textContent}:${segundos.textContent}`
    } else if (parseInt(minutos.textContent) >= 1 && parseInt(segundos.textContent) === 0) {
      minutos.textContent = formater(minutos.textContent - 1)
      segundos.textContent = '59'
      title.textContent = `${horas.textContent}:${minutos.textContent}:${segundos.textContent}`
    } else {
      segundos.textContent = formater(segundos.textContent - 1)
      title.textContent = `${horas.textContent}:${minutos.textContent}:${segundos.textContent}`
    }
  }, 1000)
}

/**
 * If space it's press it, stops de interval and make i'ts null
 * Else if the interval it's null calls the start function than reanudates
 * the program.
 * @param {Event} e tecla precionada
 */
const pause = (e) => {
  if (e.keyCode === 32 || e.code === 'Space') {
    if (myInterval) {
      clearInterval(myInterval)
      myInterval = null
      title.textContent = 'Pausa'
      cabezera.textContent = 'Pausa'
    } else if (myInterval === null) {
      start()
      title.textContent = 'Cuenta Atras'
      cabezera.textContent = 'Cuenta Atras'
    }
  }
}

// Self-made formater, allows to format the inputs to the clock.
const formater = num => parseInt(num) < 10 ? `0${num}` : num

// Resets the clock to an initial state.
const reset = () => {
  clearInterval(myInterval)
  myInterval = undefined

  horas.textContent = '00'
  minutos.textContent = '00'
  segundos.textContent = '00'

  document.querySelector('body').style.backgroundColor = 'white'
  title.textContent = 'Despertador'
  cabezera.textContent = 'Cuenta Atras'

  if (inputs.contains(reiniciar)) { inputs.removeChild(reiniciar) }

  empezar.style.visibility = 'visible'
  cancelar.style.visibility = 'visible'
}

// Events Handlers
empezar.addEventListener('click', init)
cancelar.addEventListener('click', reset)
reiniciar.addEventListener('click', reset)
window.addEventListener('keypress', pause)
